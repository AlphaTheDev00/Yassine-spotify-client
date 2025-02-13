import { useState, useContext } from "react";
import styles from "./Register.module.css";
import { signup } from "../../services/userService.js";
import { setToken, getUserFromToken } from "../../utils/auth";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router";

export default function Register() {
  const { user, setUser } = useContext(UserContext);
  console.log(user);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    isArtist: false,
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(formData);
      // 1. Part of the response data above is "token". This needs to be set to local storage
      setToken(data.token);
      // 2. Decode the token, setting the user inside to the global user state (context)
      setUser(getUserFromToken());
      // 3. navigate to home page on sign in
      navigate("/");
    } catch (error) {
      setErrors(error.response.data.errors);
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
            />
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={
              formData.password === "" ||
              formData.password !== formData.confirmPassword
            }
          >
            Register
          </button>
        </form>
      </section>
    </main>
  );
}
