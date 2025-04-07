import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "./sidebar.css";
import { FaHome, FaHeart, FaPlus, FaBookmark, FaUser, FaUserPlus, FaMusic } from "react-icons/fa";

const SideBar = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/spotify-logo.png" alt="Spotify" />
      </div>
      <nav className="nav-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          <FaHome />
          <span>Home</span>
        </Link>
        {user && (
          <>
            <Link
              to="/songs/new"
              className={`nav-link ${
                location.pathname === "/songs/new" ? "active" : ""
              }`}
            >
              <FaPlus />
              <span>Add Song</span>
            </Link>
            <Link
              to="/liked-songs"
              className={`nav-link ${
                location.pathname === "/liked-songs" ? "active" : ""
              }`}
            >
              <FaHeart />
              <span>Liked Songs</span>
            </Link>
            <Link
              to="/playlists"
              className={`nav-link ${
                location.pathname === "/playlists" || location.pathname.startsWith("/playlists/") ? "active" : ""
              }`}
            >
              <FaBookmark />
              <span>My Playlists</span>
            </Link>
          </>
        )}
      </nav>
      {user ? (
        <div className="playlists">
          <h3>QUICK LINKS</h3>
          <Link to="/" className="playlist-link">
            All Songs
          </Link>
          <Link to="/liked-songs" className="playlist-link">
            Liked Songs
          </Link>
        </div>
      ) : (
        <div className="auth-card">
          <h3>ENJOY MUSIC</h3>
          <p>Sign in to create playlists and like songs</p>
          <div className="auth-buttons">
            <Link to="/login" className="auth-button login-button">
              <FaUser className="auth-icon" />
              <span>Sign In</span>
            </Link>
            <Link to="/register" className="auth-button register-button">
              <FaUserPlus className="auth-icon" />
              <span>Sign Up</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
