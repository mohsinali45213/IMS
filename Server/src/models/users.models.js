import Sequelize from "sequelize";
import sequelize from "../db/db.js";

const User = sequelize.define(
  "user",
  {
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: Sequelize.STRING(36),
      allowNull: true,
    },

    contact_number: {
      type: Sequelize.STRING(36),
      allowNull: true,
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: true,
    },

    status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    created_by: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    modified_by: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    deleted_by: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    modified_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    deleted_at: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    paranoid: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "modified_at",
    deletedAt: "deleted_at",
  }
);

export default User;
export { User };
