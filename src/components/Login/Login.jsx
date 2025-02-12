import { useState } from "react";
import styles from "./Login.module.css";

export default function Login() {

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  // Handle input change
  const handleChange = (e) => {
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

        {errors.message && <p className="error-message">{errors.message}</p>}

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
