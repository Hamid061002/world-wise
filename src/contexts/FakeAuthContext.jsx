import React, { createContext, useContext, useReducer } from 'react'

const AuthContext = createContext()

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const initialStates = {
  user: null,
  isAuth: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { user: action.payload, isAuth: true }
    case 'logout':
      return { user: null, isAuth: false }

    default:
  }
}

const AuthProvider = ({ children }) => {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initialStates)

  function login(email, password) {
    if (password == FAKE_USER.password && email == FAKE_USER.email && !user) {
      dispatch({ type: 'login', payload: FAKE_USER })
    } else if (user) {
      alert('you have been logged in')
    } else {
      alert('email or password is incorrect!')
    }
  }

  function logout() {
    dispatch({ type: 'logout' })
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  return useContext(AuthContext)
}

export { AuthProvider, useAuth }
