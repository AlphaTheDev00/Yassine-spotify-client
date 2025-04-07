import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import styles from "./SideBar.module.css";
import { FaHome, FaSearch, FaHeart, FaPlus, FaList } from "react-icons/fa";

const SideBar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  return (
    <nav className={styles.sidebar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src="/logo.png" alt="Spotify Clone" />
        </Link>
      </div>

      <ul className={styles.navLinks}>
        <li className={styles.navItem}>
          <Link
            to="/"
            className={`${styles.navLink} ${
              location.pathname === "/" ? styles.active : ""
            }`}
          >
            <FaHome className={styles.icon} />
            <span>Home</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/search"
            className={`${styles.navLink} ${
              location.pathname === "/search" ? styles.active : ""
            }`}
          >
            <FaSearch className={styles.icon} />
            <span>Search</span>
          </Link>
        </li>
        {isAuthenticated && (
          <>
            <li className={styles.navItem}>
              <Link
                to="/liked-songs"
                className={`${styles.navLink} ${
                  location.pathname === "/liked-songs" ? styles.active : ""
                }`}
              >
                <FaHeart className={styles.icon} />
                <span>Liked Songs</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/songs/new"
                className={`${styles.navLink} ${
                  location.pathname === "/songs/new" ? styles.active : ""
                }`}
              >
                <FaPlus className={styles.icon} />
                <span>Add Song</span>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link
                to="/playlists"
                className={`${styles.navLink} ${
                  location.pathname === "/playlists" ? styles.active : ""
                }`}
              >
                <FaList className={styles.icon} />
                <span>Your Playlists</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default SideBar;
