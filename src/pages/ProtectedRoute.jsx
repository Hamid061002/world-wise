import React, { useEffect } from 'react'
import { useAuth } from '../contexts/FakeAuthContext'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const {isAuth} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) navigate('/login') 
  }, [isAuth,navigate])

  return children
}

export default ProtectedRoute
