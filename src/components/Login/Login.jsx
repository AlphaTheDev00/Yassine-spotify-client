import { useState, useContext } from "react";
import styles from "./Login.module.css";
import { signin } from "../../services/userService.js";
import { setToken, getUserFromToken } from "../../utils/auth";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

export default function Login() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signin(formData);
      // 1. setToken to storage when we receive it in the response
      setToken(data.token);
      // 2. Set the global user context to the user inside the token
      setUser(getUserFromToken());
      // 3. Navigate to the home page
      navigate("/");
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
    <main className={styles.main}>
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
    </main>
  );
}
