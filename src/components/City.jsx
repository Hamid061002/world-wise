import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import ButtonBack from "./ButtonBack";
import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams()
  const { currentCity, getCity, isLoading } = useCities()
  
  useEffect(() => {
    getCity(id)
  }, [id])

  const { cityName, emoji, date, notes } = currentCity

  return isLoading ? <Spinner /> : (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>{cityName}</h6>
        <h3>
          <span className={styles.emoji}>
            <img width={40} src={`https://flagsapi.com/${emoji}/flat/64.png`} />
          </span>
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <ButtonBack />
      </div>
    </div>
  );
}

export default City;
