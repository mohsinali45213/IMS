import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({ name: "", contact_number: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const res = await fetch("http://localhost:5000/api/v1/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Registration successful! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(data.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FE9F43]/10 via-[#0E9384]/10 to-[#155EEF]/10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#092C4C]">Register</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {success && <div className="mb-4 text-green-600">{success}</div>}
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <input
          type="text"
          name="contact_number"
          placeholder="Contact Number"
          value={form.contact_number}
          onChange={handleChange}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 mb-6 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#0E9384] text-white py-2 rounded hover:bg-[#155EEF]"
        >
          Register
        </button>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-[#0E9384] hover:underline">
            Already have an account? Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;