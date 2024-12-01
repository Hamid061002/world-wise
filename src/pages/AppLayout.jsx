import React, { useEffect } from 'react'
import styles from './AppLayout.module.css'
import SideBar from '../components/SideBar'
import Map from '../components/Map'
import User from '../components/User'
import { useAuth } from '../contexts/FakeAuthContext'
import Spinner from '../components/Spinner'

const AppLayout = () => {
  const { isAuth } = useAuth()
  
  return isAuth ? (
    <div className={styles.app}>
      <SideBar />
      <Map />
      <User />
    </div>
  ) : <Spinner />
}

export default AppLayout
