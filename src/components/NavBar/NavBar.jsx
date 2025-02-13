import { NavLink, useLocation } from "react-router";
import styles from './NavBar.module.css'
import { GoHome, GoHomeFill } from "react-icons/go";
import { Avatar } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { removeToken } from "../../utils/auth";

export default function NavBar() {

    const location = useLocation()

    const { user, setUser } = useContext(UserContext)

    function logOut () {
        removeToken()
        setUser(null)
    }

    return (
        <nav className={styles.navbar}>
            <div className={styles.homebutton}>
                <NavLink to="/">{
                    location.pathname === '/' ?
                    <GoHomeFill size={30} /> :
                    <GoHome size={30} />
                }
                </NavLink>
            </div>
            {user ?
                <div className={styles.authnav}>
                    <button className={styles.authButton} onClick={logOut}>Log out</button>
                    <Avatar.Root>
                        <Avatar.Fallback name={user.username} />
                        <Avatar.Image src={user.profileImage}/>
                    </Avatar.Root>
                </div>
                :
                <div className={styles.authnav}>
                    <NavLink className={styles.authButton} to="/register">Register</NavLink>
                    <NavLink className={styles.authButton} to="/login">Login</NavLink>
                </div>

            }
        </nav>
    )
}