import { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { signin } from "../../services/userService.js";
import { setToken } from "../../utils/auth";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { refreshUser } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");

  const navigate = useNavigate();

  // Check for redirect path on component mount
  useEffect(() => {
    const savedPath = sessionStorage.getItem("redirectAfterLogin");
    if (savedPath) {
      setRedirectPath(savedPath);
      // Clear it after reading
      sessionStorage.removeItem("redirectAfterLogin");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setGeneralError("");
    setErrors({});

    try {
      const response = await signin(formData);
      console.log("Full login response:", response);

      if (!response || !response.token) {
        console.error("Token not found in response:", response);
        setGeneralError("Login failed. Please try again.");
        return;
      }

      // Set the token in localStorage
      setToken(response.token);

      // Use the refreshUser function from context to update user state
      refreshUser();

      // Add a small delay before redirecting to ensure the token is properly set
      setTimeout(() => {
        navigate(redirectPath);
      }, 100);
    } catch (error) {
      console.error("Login error:", error);

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

  // Handle input change
  const handleChange = (e) => {
    setErrors({ ...errors, [e.target.name]: "" });
    setGeneralError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <main className={styles.main}>
      <section className={styles.container}>
        <h1>Login</h1>
        <p>Welcome back to MusicFy</p>

        {generalError && (
          <div className={styles.errorAlert}>{generalError}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
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
              value={formData.password}
            />
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              isSubmitting || formData.email === "" || formData.password === ""
            }
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {/* "Don't have an account?" Link */}
          <p className={styles.signupLink}>
            Don&apos;t have an account? <a href="/register">Sign up</a>
          </p>
        </form>
      </section>
    </main>
  );
}
