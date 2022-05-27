import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { profileImages } from '../../utils/faker'
import styles from './navbar.module.css'

export default function Navbar() {
    const location = useLocation()
    const [openMenu, setOpenMenu] = useState(false)

    const getClassName = ({ isActive }) => {
        if (isActive) 
        {
            return ['material-icons', styles.iconBtn, styles.activeIconBtn].join(' ')
        } 
        else 
        {
            return ['material-icons', styles.iconBtn].join(' ')
        }
    }

    const getDropDownItemClass = ({ isActive }) => {
        if (isActive) 
        {
            return [styles.dropDownItem, styles.activeDropDownItem].join(' ')
        }
        else 
        {
            return styles.dropDownItem
        }
    }

    window.onclick = (event) => {
        if (event.target.tagName !== 'IMG') 
        {
            setOpenMenu(false)
        }
    }

    const getDropDownClass = () => {
        if (location.pathname.startsWith('/account')) 
        {
            return [styles.dropDownBtn, styles.activeIconBtn].join(' ')
        } 
        else 
        {
            return [styles.dropDownBtn].join(' ')
        }
    }

    return (
        <div className={styles.container}>
            <Link to="/" className={styles.brandName}>Facelook</Link>
            <div className={styles.btnContainer}>
                <div>
                    <NavLink className={getClassName} to="/search">search</NavLink>
                </div>

                <div className={getDropDownClass()}>
                    <img src={profileImages[4]} onClick={() => { setOpenMenu(true) }} className={styles.profileImg}/>
                    {openMenu && (
                        <div className={styles.dropDownContainer}>
                            <NavLink to="/profile" className={getDropDownItemClass}>
                                <span className='material-icons'>person</span>
                                Profile
                            </NavLink>

                            <NavLink to="/change-password" className={getDropDownItemClass}>
                                <span className='material-icons'>lock</span>
                                Change Password
                            </NavLink>

                            <NavLink to="/change-email" className={getDropDownItemClass}>
                                <span className='material-icons'>email</span>
                                Change Email
                            </NavLink>

                            <NavLink to="/add-post" className={getDropDownItemClass}>
                                <span className='material-icons'>add_circle</span>
                                Add Post
                            </NavLink>

                            <div className={styles.dropDownItem}>
                                <span className='material-icons'>logout</span>
                                Logout
                            </div>

                            <NavLink to="/followers" className={getDropDownItemClass}>
                                <span className='material-icons'>people_alt</span>
                                Followers
                            </NavLink>

                            <NavLink to="/followings" className={getDropDownItemClass}>
                                <span className='material-icons'>group_add</span>
                                Followings
                            </NavLink>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )

}