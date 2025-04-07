import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import "./sidebar.css";
import { FaHome, FaSearch, FaHeart, FaPlus, FaList } from "react-icons/fa";

const SideBar = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

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
        <Link
          to="/search"
          className={`nav-link ${
            location.pathname === "/search" ? "active" : ""
          }`}
        >
          <FaSearch />
          <span>Search</span>
        </Link>
        {isAuthenticated && (
          <>
            <Link
              to="/library"
              className={`nav-link ${
                location.pathname === "/library" ? "active" : ""
              }`}
            >
              <FaList />
              <span>Your Library</span>
            </Link>
            <Link
              to="/create-playlist"
              className={`nav-link ${
                location.pathname === "/create-playlist" ? "active" : ""
              }`}
            >
              <FaPlus />
              <span>Create Playlist</span>
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
          </>
        )}
      </nav>
      {isAuthenticated && (
        <div className="playlists">
          <h3>PLAYLISTS</h3>
          <Link to="/playlist/1" className="playlist-link">
            My Playlist #1
          </Link>
          <Link to="/playlist/2" className="playlist-link">
            My Playlist #2
          </Link>
        </div>
      )}
    </div>
  );
};

export default SideBar;
