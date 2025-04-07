import { NavLink, useLocation } from "react-router-dom";
import styles from "./NavBar.module.css";
import { GoHome, GoHomeFill } from "react-icons/go";
import { FaMusic, FaSignOutAlt } from "react-icons/fa";
import { Avatar } from "@chakra-ui/react";
import { removeToken } from "../../utils/auth";
import { useAuth } from "../../hooks/useAuth";
import Logo from "../Logo/Logo";

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
        <NavLink to="/" className={styles.logo} activeClassName={styles.activeLogoLink}>
          <Logo size={24} className={styles.logoIcon} />
          <span>MusicFy</span>
          {location.pathname === "/" && <div className={styles.activeIndicator} />}
        </NavLink>
        {user && (
          <>
            <NavLink to="/songs/new" className={styles.navLink}>
              <FaMusic
                size={20}
                color={
                  location.pathname === "/songs/new"
                    ? "#1ed760"
                    : "currentColor"
                }
              />
              <span>Add Song</span>
            </NavLink>
          </>
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
