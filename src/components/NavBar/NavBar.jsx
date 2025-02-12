import { useState, useContext } from "react";
import { NavLink } from "react-router";
import styles from "./Navbar.module.css";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from "../../utils/auth";

export default function NavBar() {
  // Context
  const { user, setUser } = useContext(UserContext);

  // State
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const signOut = () => {
    removeToken();
    setUser(null);
  };

  return (
    <>
      <button className={styles.menuButton} onClick={handleShow}>
        <div></div>
        <div></div>
        <div></div>
      </button>

      {/* Sidebar */}
      <div className={`${styles.menu} ${show ? styles.show : ""}`}>
        <button className={styles.closeButton} onClick={handleClose}>
          X
        </button>

        <div className={styles.menuContent}>
          {user && (
            <section>
              <img src={user.profileImage} alt={user.displayName} />
              <div>
                <h2>{user.displayName}</h2>
                <h3>@{user.username}</h3>
              </div>
            </section>
          )}

          {/* Navigation Links */}
          <nav>
            <NavLink to="/">Home</NavLink>
            {user ? (
              <>
                <NavLink to="/create-song">Create Song</NavLink>
                <NavLink to="/create-playlist">Create Playlist</NavLink>
                <button onClick={signOut}>Sign out</button>
              </>
            ) : (
              <>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
}
