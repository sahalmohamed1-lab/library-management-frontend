import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await register(form);
    } catch (err) {
      console.error(err);
      if (err.response?.data) {
        const errors = Object.values(err.response.data)
          .flat()
          .join(" ");
        setError(errors);
      } else {
        setError("Registration failed.");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-slate-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-96"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Register
        </h1>
        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}
        <input
          name="username"
          placeholder="Username"
          className="border w-full p-2 mb-4 rounded"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="border w-full p-2 mb-4 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="border w-full p-2 mb-4 rounded"
          value={form.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirm_password"
          placeholder="Confirm Password"
          className="border w-full p-2 mb-6 rounded"
          value={form.confirm_password}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white w-full p-2 rounded"
        >
          Register
        </button>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;