// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import ButtonBack from "./ButtonBack";
import useUrlPosition from "../hooks/useUrlPosition";
import Message from "./Message";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../contexts/CitiesContext";

const BIGDATA_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client'

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const { createCity, isLoading } = useCities()
  const [cityData, setCityData] = useState({})
  const [latValue, LngValue] = useUrlPosition()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const position = { lat: latValue, lng: LngValue }

  const navigate = useNavigate()

  const isNotPositionData = !(latValue && LngValue)

  useEffect(() => {
    async function fetchCityData() {
      try {
        const res = await fetch(`${BIGDATA_URL}?latitude=${latValue}&longitude=${LngValue}`)
        const data = await res.json()
        setCityName(data.city || data.locality || "")
        setCountry(data.countryName)
        setEmoji(data.countryCode)
      } catch (error) {
        alert(error.message);
      }
    }
    fetchCityData()
  }, [latValue, LngValue])

  function submitHandle(e) {
    e.preventDefault()
    const newCityData = {
      cityName,
      country,
      date,
      notes,
      emoji,
      position
    }

    createCity(newCityData)
    navigate('/app/cities')
  }

  if (!(LngValue && latValue)) return <Message message={'Start by clicking somewhere on the map!'} />
  if (isNotPositionData) return

  return (
    <form onSubmit={submitHandle} className={`${styles.form} ${isLoading ? styles.loading : ''}`}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={isNotPositionData ? "" : cityName || 'Loading...'}
        />
        <span className={styles.flag}>
          <img width={40} src={`https://flagsapi.com/${emoji}/flat/64.png`} />
        </span>
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker selected={date} onChange={date => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          className="text-black"
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type={'primary'}>Add</Button>
        <ButtonBack />
      </div>
    </form>
  );
}

export default Form;
