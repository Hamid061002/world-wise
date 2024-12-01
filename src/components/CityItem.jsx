import React from 'react'
import styles from './CityItem.module.css'
import { Link } from 'react-router-dom';
import { useCities } from '../contexts/CitiesContext';

const CityItem = ({ city }) => {
  const { cityName, emoji, date, position } = city
  const { currentCity, deleteCity } = useCities()
  const isActive = currentCity.position?.lat === city.position?.lat && currentCity.position?.lng === city.position?.lng
  
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  function handleDeleteClick(e) {
    e.preventDefault()
    deleteCity(city.id)
  }

  return (
    <Link
      to={`${city.id}?lat=${position.lat}&lng=${position.lng}`}
      className={`${styles.cityItem} ${isActive ? styles['cityItem--active'] : ''}`}
    >
      {isActive ? 'isActive' : 'notActive'}
      <span className={styles.emoji}>
        <img width={24} src={`https://flagsapi.com/${emoji}/flat/64.png`} />
      </span>
      <h3 className={styles.name}>{cityName}</h3>
      <time className={styles.date}>({formatDate(date)})</time>
      <button onClick={handleDeleteClick} className={styles.deleteBtn}>&times;</button>
    </Link>
  )
}

export default CityItem
