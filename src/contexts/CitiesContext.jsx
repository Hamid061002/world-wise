import React, { act, createContext, useContext, useEffect, useReducer, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const BASE_URL = 'http://localhost:9000'
const CitiesProvider = createContext()

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload }
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload }
    case 'city/created':
      return { ...state, isLoading: false, cities: [...state.cities, action.payload], currentCity: action.payload }
    case 'city/deleted':
      return { ...state, isLoading: false, cities: state.cities.filter(city => city.id !== action.payload) }
    case 'rejected':
      return { ...state, error: action.payload }
    default: throw new Error('unkown action type')
  }
}

const initialState = {
  cities: [],
  currentCity: {},
  isLoading: false
}

const CitiesContext = ({ children }) => {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchCities() {
      try {
        dispatch({ type: 'loading' })
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch (error) {
        alert(error.message)
      }
    }
    fetchCities()
  }, [cities.length])

  async function getCity(id) {
    if (Number(id) == currentCity.id) return
    
    try {
      dispatch({ type: 'loading' })
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      dispatch({ type: 'city/loaded', payload: data })
    } catch {
      dispatch({ type: 'rejected', payload: 'error getcity function' })
    }
  }

  async function createCity(newCityData) {
    try {
      dispatch({ type: 'loading' })
      await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCityData)
      })
      dispatch({ type: 'city/created', payload: newCityData })
    } catch {
      dispatch({ type: 'rejected', payload: 'error createCity function' })
    }
  }

  async function deleteCity(cityID) {
    try {
      dispatch({ type: 'loading' })
      await fetch(`${BASE_URL}/cities/${cityID}`, {
        method: 'DELETE',
      })
      dispatch({ type: 'city/deleted', payload: cityID })
    } catch {
      dispatch({ type: 'rejected', payload: 'error deleteCity function' })
    }
  }

  return <CitiesProvider.Provider value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}>
    {children}
  </CitiesProvider.Provider>
}

function useCities() {
  const context = useContext(CitiesProvider)
  if (context == undefined) throw new Error('Use CitiesProvider out of CitiesContext')
  return context
}

export { CitiesContext, useCities } 
