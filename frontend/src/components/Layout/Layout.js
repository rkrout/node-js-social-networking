import { Outlet } from 'react-router-dom'
import NavBar from '../Navbar/Navbar'
import styles from './layout.module.css'

export default function Layout() {
    return (
        <div>
            <NavBar />
            <div className={styles.pageContent}>
                <Outlet />
            </div>
        </div>
    )
}