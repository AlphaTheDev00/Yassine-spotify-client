import { NavLink } from "react-router"
import { UserContext } from "../../contexts/UserContext"
import { useContext } from "react"
import styles from './Sidebar.module.css'

export default function SideBar() {

    const { user } = useContext(UserContext)

    return (
        <>
            {user ?
                <>
                    <p className={styles.libaryTitle}>Your Libary</p>
                    <div className={styles.promtCard}>
                        <p className={styles.promtTitle}>Time to make some music!</p>
                        <p className={styles.promtBody}>Start a new song and let your creativity shine.</p>
                        <div className={styles.authButtons}>
                            <NavLink className={styles.sidebarBtn} to='/songs/new' >Create a song</NavLink>
                        </div>
                    </div>
                </>
                :
                <div className={styles.promtCard}>
                    <p className={styles.promtTitle}>Ready to create your next hit?</p>
                    <p className={styles.promtBody}>Log in or register to start sharing your music with the world!</p>
                    <div className={styles.authButtons}>
                        <NavLink className={styles.sidebarBtn} to='/login' >Login</NavLink>
                        <NavLink className={styles.sidebarBtn} to='/register' >Register</NavLink>
                    </div>
                </div>
            }
        </>

    )
}