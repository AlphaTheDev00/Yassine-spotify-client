import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaMusic, FaSignOutAlt, FaHeart } from "react-icons/fa";
import { Avatar } from "@chakra-ui/react";
import { removeToken } from "../../utils/auth";
import { useAuth } from "../../hooks/useAuth";

export default function NavBar() {
  const location = useLocation();
  const { user, setUser } = useAuth();

  function logOut() {
    removeToken();
    setUser(null);
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLeft}>
        <div className={styles.logo}>
          <FaMusic size={24} />
          <span>MusicFy</span>
        </div>
        <NavLink to="/" className={styles.navLink}>
          {location.pathname === "/" ? (
            <GoHomeFill size={22} />
          ) : (
            <GoHome size={22} />
          )}
          <span>Home</span>
        </NavLink>
        {user && (
          <NavLink to="/liked-songs" className={styles.navLink}>
            <FaHeart size={20} color={location.pathname === "/liked-songs" ? "#1ed760" : "currentColor"} />
            <span>Liked Songs</span>
          </NavLink>
        )}
      </div>
      
      {user ? (
        <div className={styles.navRight}>
          <div className={styles.userInfo}>
            <span>Hello, {user.username}</span>
          </div>
          <button className={styles.logoutButton} onClick={logOut}>
            <FaSignOutAlt size={16} />
            <span>Log out</span>
          </button>
          <div className={styles.avatar}>
            <Avatar name={user.username} src={user.profileImage} />
          </div>
        </div>
      ) : (
        <div className={styles.navRight}>
          <NavLink to="/login" className={styles.navLink}>
            Log in
          </NavLink>
          <NavLink to="/register" className={styles.navLink}>
            Sign up
          </NavLink>
        </div>
      )}
    </nav>
  );
}
