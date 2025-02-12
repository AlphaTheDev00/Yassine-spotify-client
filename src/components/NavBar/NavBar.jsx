import { NavLink, useLocation } from "react-router";
import styles from "./NavBar.module.css";
import { GoHome, GoHomeFill } from "react-icons/go";
import { Avatar, Button } from "@chakra-ui/react";

export default function NavBar() {
  const location = useLocation();

  const user = null;
  // {
  //     username: "aaron1",
  //     email: "aaron1@email.com",
  //     // profileImage: "https://bit.ly/sage-adebayo",
  //     isArtist: true
  // }

  function logOut() {
    alert("logging out");
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.homebutton}>
        <NavLink to="/">
          {location.pathname === "/" ? (
            <GoHomeFill size={30} />
          ) : (
            <GoHome size={30} />
          )}
        </NavLink>
      </div>
      {user ? (
        <div className={styles.authnav}>
          <Button rounded="full" onClick={logOut}>
            Log out
          </Button>
          <Avatar.Root>
            <Avatar.Fallback name={user.username} />
            <Avatar.Image src={user.profileImage} />
          </Avatar.Root>
        </div>
      ) : (
        <div className={styles.authnav}>
          <NavLink to="/register">Register</NavLink>
          <NavLink to="/login">Login</NavLink>
        </div>
      )}
    </nav>
  );
}
