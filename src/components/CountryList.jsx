import styles from './CountryList.module.css'
import CountryItem from './CountryItem'
import Spinner from './Spinner'
import { useCities } from '../contexts/CitiesContext'

const CountryList = () => {
  const { cities, isLoading } = useCities()

  if (isLoading) return <Spinner />

  const countries = cities.reduce((arr, city) => arr.map(el => el.country).includes(city.country) ? arr : [...arr, city], [])

  return (
    <div className={styles.countryList}>
      {countries.map(item => <CountryItem country={item} key={item.id} />)}
    </div>
  )
}

export default CountryList
