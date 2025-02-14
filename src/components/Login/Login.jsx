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
      console.log("Login response:", data); // Check if token exists in response

      if (!data.token) {
        console.error("No token received from API!");
        return;
      }

      setToken(data.token);
      console.log(
        "Token saved in localStorage:",
        localStorage.getItem("spotify_clone_token")
      ); // Check if it's stored

      setUser(getUserFromToken());
      console.log("User after login:", getUserFromToken()); // Verify the user context

      navigate("/");
    } catch (error) {
      setErrors(error.response?.data?.message || "An error occurred");
      console.error("Login error:", error);
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
