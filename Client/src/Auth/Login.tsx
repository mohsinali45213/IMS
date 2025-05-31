import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [contact_number, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await fetch("http://localhost:5000/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contact_number, password }),
    });
    const data = await res.json();
    if (res.ok && data.token) {
      // localStorage.setItem("token", data.token);
      navigate("/products");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FE9F43]/10 via-[#0E9384]/10 to-[#155EEF]/10">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-[#092C4C]">Login</h2>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        <input
          type="text"
          placeholder="Contact Number"
          value={contact_number}
          onChange={e => setContactNumber(e.target.value)}
          className="w-full border p-2 mb-4 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full border p-2 mb-6 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-[#FE9F43] text-white py-2 rounded hover:bg-[#155EEF]"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <Link to="/register" className="text-[#0E9384] hover:underline">
            Create an account
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;