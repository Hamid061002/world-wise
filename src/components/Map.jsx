import React, { useEffect, useState } from 'react'
import styles from "./Map.module.css";
import { useNavigate } from 'react-router-dom'
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useCities } from '../contexts/CitiesContext';
import City from './City';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import useUrlPosition from '../hooks/useUrlPosition';

const BASE_LAT_LND = [51.509865, -0.118092]

const Map = () => {
  const { cities } = useCities()
  const [position, setPosition] = useState(BASE_LAT_LND)
  const { isLoadingPosition, geoLocationPosition, getPosition } = useGeolocation()
  const [latValue, lngValue] = useUrlPosition()
  const navigate = useNavigate()

  
  useEffect(() => {
    if (geoLocationPosition) {
      navigate(-1)
      setPosition([geoLocationPosition.lat, geoLocationPosition.lng])
    }
  }, [geoLocationPosition])
  
  useEffect(() => {
    if (latValue && lngValue) setPosition([latValue, lngValue])
  }, [latValue, lngValue])

  return (
    <div className={styles.mapContainer}>
      { <Button type='position' onclick={getPosition}>{isLoadingPosition ? 'Loading...' : 'Use your position'}</Button>}
      <MapContainer className="h-full" center={position} zoom={10} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}"
          ext='jpg'
        />
        {
          cities.map(city =>
            <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          )
        }
        <ChangeCenter position={position} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  useMap().setView(position, 10)
}

function DetectClick() {
  const navigate = useNavigate()

  useMapEvents({
    click: e => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    }
  })
}

export default Map
