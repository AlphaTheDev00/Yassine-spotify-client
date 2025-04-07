import { useState } from "react";
import styles from "./Register.module.css";
import { signup } from "../../services/userService.js";
import { setToken, getUserFromToken } from "../../utils/auth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { user, setUser } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters long";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGeneralError("");
    setErrors({});

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await signup(formData);
      console.log("Full registration response:", response);

      // Check if we have a valid response with token directly in the response
      if (response && response.token) {
        // 1. Set token to local storage
        setToken(response.token);

        // 2. Store user data in localStorage for the development token
        const userData = {
          id: "user123",
          username: formData.username,
          email: formData.email
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        // 3. Set the user in the global context
        setUser(userData);

        // 3. navigate to home page on sign in
        navigate("/");
      } else {
        console.error("Token not found in response:", response);
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
          <div className={styles.errorAlert}>{generalError}</div>
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
              placeholder="Enter your email"
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
              placeholder="Enter your password"
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
              placeholder="Confirm your password"
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
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
      </section>
    </main>
  );
}
