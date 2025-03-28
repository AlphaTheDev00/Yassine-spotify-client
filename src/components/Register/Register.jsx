import { useState } from "react";
import styles from "./Register.module.css";
import { signup } from "../../services/userService.js";
import { setToken, getUserFromToken } from "../../utils/auth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { user, setUser } = useAuth();
  console.log(user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isArtist: false,
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGeneralError("");
    
    try {
      const data = await signup(formData);
      
      if (data && data.token) {
        // 1. Set token to local storage
        setToken(data.token);
        
        // 2. Decode the token, setting the user inside to the global user state (context)
        const userFromToken = getUserFromToken();
        setUser(userFromToken);
        
        // 3. navigate to home page on sign in
        navigate("/");
      } else {
        setGeneralError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          setErrors(error.response.data.errors);
        }
        if (error.response.data.message) {
          setGeneralError(error.response.data.message);
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <h1>Register</h1>
        <p>Create an account on MusicFy</p>

        {generalError && (
          <div className={styles.errorAlert}>
            {generalError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter a username"
              required
              onChange={handleChange}
              value={formData.username}
            />
            {errors.username && (
              <p className="error-message">{errors.username}</p>
            )}
          </div>

          <div className="input-control">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
              required
              onChange={handleChange}
              value={formData.email}
            />
            {errors.email && <p className="error-message">{errors.email}</p>}
          </div>

          <div className="input-control">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter a password"
              required
              onChange={handleChange}
              value={formData.password}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="input-control">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Re-type your password"
              required
              onChange={handleChange}
              value={formData.confirmPassword}
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              isSubmitting ||
              formData.password === "" ||
              formData.password !== formData.confirmPassword
            }
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </section>
    </main>
  );
}
