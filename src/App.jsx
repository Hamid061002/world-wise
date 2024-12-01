import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import CityList from './components/CityList'
import { Suspense, lazy } from 'react'
import CountryList from './components/CountryList'
import City from './components/City'
import Form from './components/Form'
import { CitiesContext } from './contexts/CitiesContext'
import { AuthProvider } from './contexts/FakeAuthContext'
import ProtectedRoute from './pages/ProtectedRoute'
import SpinnerFullPage from './components/SpinnerFullPage'

const HomePage = lazy(() => import('./pages/HomePage'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Product = lazy(() => import('./pages/Product'))
const PageNotFound = lazy(() => import('./pages/PageNotFound'))
const AppLayout = lazy(() => import('./pages/AppLayout'))
const Login = lazy(() => import('./pages/Login'))

function App() {

  return (
    <CitiesContext>
      <AuthProvider>
        <BrowserRouter>
          <Suspense fallback={SpinnerFullPage}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path='pricing' element={<Pricing />} />
              <Route path='product' element={<Product />} />
              <Route path='app' element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
                <Route index element={<Navigate replace to='cities' />} />
                <Route path='cities' element={<CityList />} />
                <Route path='cities/:id' element={<City />} />
                <Route path='countries' element={<CountryList />} />
                <Route path='form' element={<Form />} />
              </Route>
              <Route path='login' element={<Login />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </CitiesContext>
  )
}

export default App
