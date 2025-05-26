
import {User} from "../models/users.models.js"
import message from "../error/error.messages.js";
import successMessage from "../error/success.messages.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { Op } from "sequelize";

export const createUser = async (req, res) => {
  try {
    const { name, contact_number, password } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ name: name }, { contact_number: contact_number }],
      },
    });
    if (existingUser) {
      return res
        .status()
        .json({ message: successMessage.USER_ALREADY_EXISTS });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      id: uuidv4(),
      name,
      contact_number,
      password: hashedPassword,
    });

    await user.save();
    res.status(201).json({ message: successMessage.REGISTRATION_SUCCESSFULLY });
  } catch (error) {
    res.status(500).json({ error: message.INTERNAL_SERVER_ERROR });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { contact_number, password } = req.body;
    
    const user = await User.findOne({
      where: {
        contact_number: contact_number,
        status: true, // Ensure the user is active
      },
    });    
    if (!user) {
      return res.status(404).json({ message: successMessage.USER_NOT_FOUND });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: successMessage.INVALID_CREDENTIALS });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: successMessage.LOGIN_SUCCESSFULLY,
      token,
      user: {
        id: user.id,
        name: user.name,
        contact_number: user.contact_number,
      },
    });
  } catch (error) {
    res.status(500).json({ error: message.INTERNAL_SERVER_ERROR });
  }
};

export const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: { status: true }, // Only active users
      attributes: ["id", "name", "contact_number", "created_at"],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: message.INTERNAL_SERVER_ERROR });
  }
};

export const findUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: { id, status: true },
      attributes: ["id", "name", "contact_number", "created_at"],
    });
    if (!user) {
      return res.status(404).json({ message: successMessage.USER_NOT_FOUND });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: message.INTERNAL_SERVER_ERROR });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, contact_number, password } = req.body;

    const user = await User.findOne({ where: { id, status: true } });
    if (!user) {
      return res.status(404).json({ message: successMessage.USER_NOT_FOUND });
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10);
    }
    user.name = name || user.name;
    user.contact_number = contact_number || user.contact_number;

    await user.save();
    res.status(200).json({ message: successMessage.PROFILE_UPDATED_SUCCESSFULLY });
  } catch (error) {
    res.status(500).json({ error: message.INTERNAL_SERVER_ERROR });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOne({ where: { id, status: true } });
    if (!user) {
      return res.status(404).json({ message: successMessage.USER_NOT_FOUND });
    }
    user.status = false; // Soft delete
    await user.save();
    res.status(200).json({ message: successMessage.USER_DELETED_SUCCESSFULLY });
  } catch (error) {
    res.status(500).json({ error: successMessage.INTERNAL_SERVER_ERROR });
  }
};
export default {
  createUser,
  loginUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
};
