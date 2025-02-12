import { useState } from "react";
import styles from "./Login.module.css";
import { signin } from "../../services/userService.js";

export default function Login() {
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signin(formData);
    } catch (error) {
      setErrors(error.response.data.message);
      console.log(error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setErrors("");
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
            type="text"
            name="identifier"
            id="identifier"
            placeholder="Enter your email or username"
            required
            onChange={handleChange}
          />
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
        </div>
        {errors && <p className="error-message">{errors}</p>}
        <button
          type="submit"
          disabled={formData.identifier === "" || formData.password === ""}
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
