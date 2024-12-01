import React from 'react'
import styles from './CityList.module.css'
import CityItem from './CityItem'
import Spinner from './Spinner'
import { useCities } from '../contexts/CitiesContext'

const CityList = () => {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />

  return (
    <div className={styles.cityList}>
      {cities.map(item => <CityItem city={item} key={`${item.position?.lat}-${item.position?.lng}`} />)}
    </div>
  )
}

export default CityList
