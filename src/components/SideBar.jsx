import React from 'react'
import styles from './Sidebar.module.css'
import Logo from './Logo'
import AppNav from './AppNav'
import { Link, Outlet } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Link to='/'>
        <Logo />
      </Link>
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          Copyright {new Date().getFullYear()} by WorldWise Inc.
        </p>
      </footer>
    </div>
  )
}

export default SideBar
