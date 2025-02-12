import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import { login } from "../../services/userService";
import { setToken } from "../../utils/auth";
import { getUserFromToken } from "../../utils/auth";
import { UserContext } from "../../contexts/UserContext";
import styles from "./Login.module.css";

export default function Login() {
  const { setUser } = useContext(UserContext);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await Login(formData);

      setToken(data.token);
      setUser(getUserFromToken());

      // Redirect user to homepage
      navigate("/");
    } catch (error) {
      setErrors(
        error.response?.data?.errors || { general: "Invalid email or password" }
      );
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className={styles.container}>
      <h1>Login</h1>
      <p>Welcome back to MusicFy</p>

      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div className="input-control">
          <label htmlFor="identifier">Email or Username</label>
          <input
            type="identifier"
            name="identifier"
            id="identifier"
            placeholder="Enter your email or username"
            required
            onChange={handleChange}
          />
          {errors.identifier && (
            <p className="error-message">{errors.identifier}</p>
          )}
        </div>

        {/* Password */}
        <div className="input-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
            onChange={handleChange}
          />
          {errors.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>

        {errors.general && <p className="error-message">{errors.general}</p>}

        <button
          type="submit"
          disabled={formData.email === "" || formData.password === ""}
        >
          Login
        </button>

        {/* "Don't have an account?" Link */}
        <p className={styles.signupLink}>
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </form>
    </section>
  );
}
