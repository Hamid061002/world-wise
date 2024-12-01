import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  const { cityName, emoji, date } = country

  return (
    <li className={styles.countryItem}>
      <span className={styles.emoji}>
        <img width={32} src={`https://flagsapi.com/${emoji}/flat/64.png`} />
      </span>
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
