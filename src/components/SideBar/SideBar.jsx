import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import styles from "./SideBar.module.css";
import {
  FaMusic,
  FaPlus,
  FaHeadphones,
  FaHeart,
  FaList,
  FaCompass,
} from "react-icons/fa";

export default function SideBar() {
  const { user } = useAuth();

  return (
    <div className={styles.sidebarContainer}>
      {user ? (
        <>
          <div className={styles.sidebarSection}>
            <h2 className={styles.sectionTitle}>Browse</h2>
            <ul className={styles.navList}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? styles.activeNavItem : styles.navItem
                  }
                >
                  <FaHeadphones />
                  <span>Discover</span>
                </NavLink>
              </li>
              <li>
                {/* Add these to your sidebar navigation links */}
                <Link to="/playlists" className={styles.navLink}>
                  <FaList className={styles.icon} />
                  <span>Playlists</span>
                </Link>
                <Link to="/liked-songs" className={styles.navLink}>
                  <FaHeart className={styles.icon} />
                  <span>Liked Songs</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.sidebarSection}>
            <h2 className={styles.sectionTitle}>Your Library</h2>
            <div className={styles.createSongCard}>
              <div className={styles.cardContent}>
                <FaMusic className={styles.cardIcon} />
                <h3>Create New Song</h3>
                <p>Share your music with the world</p>
                <NavLink to="/songs/new" className={styles.createButton}>
                  <FaPlus />
                  <span>Create Song</span>
                </NavLink>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.sidebarSection}>
          <div className={styles.guestCard}>
            <FaCompass className={styles.guestIcon} />
            <h2>Discover Music</h2>
            <p>
              Join MusicFy to create and share your own music with the world!
            </p>
            <div className={styles.guestButtons}>
              <NavLink to="/login" className={styles.loginButton}>
                Log In
              </NavLink>
              <NavLink to="/register" className={styles.registerButton}>
                Sign Up
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
