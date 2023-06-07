import { useState } from 'react'

import { FaSistrix } from 'react-icons/fa'
import styles from './WeatherApp.module.css'
import axios from 'axios'
export default function WeatherApp() {

  const [data, setData] = useState({
    celcius: 0,
    name: 'Loading...',
    humidity: 0,
    speed: 0,
    image: '/images/clouds.png'
  })
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const changeHandler = (e) => {
    setName(e.target.value);
  }
  const handleClick = (e) => {
    e.preventDefault();
    if (name !== '') {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=cf20293f61b6a0f965d23f1e2a5a629d&units=metric`
      ).then(res => {
        let imagePath = '';
        if (res.data.weather[0].main == 'Clouds') {
          imagePath = '/images/clouds.png'
        } else if (res.data.weather[0].main == 'Clear') {
          imagePath = '/images/clear.png'
        } else if (res.data.weather[0].main == 'Rain') {
          imagePath = '/images/rain.png'
        } else if (res.data.weather[0].main == 'Drizzle') {
          imagePath = '/images/drizzle.png'
        } else if (res.data.weather[0].main == 'Mist') {
          imagePath = '/images/mist.png'
        } else {
          imagePath = '/images/clouds.png'
        }
        console.log(res.data)
        setData({
          ...data,
          celcius: res.data.main.temp,
          name: res.data.name,
          humidity: res.data.main.humidity,
          speed: res.data.wind.speed,
          image: imagePath
        })
        setError('')
      }).catch(err => {
        if (err.response.status == 404) {
          setError('City does not exist')
        } else {
          setError('');
        }

      })
    }
  }



  return (
    <div className={styles.weather}>
      <form className={styles.form}>
        <input type='text' placeholder='Enter City Name' onChange={changeHandler} />
        <button onClick={handleClick} ><FaSistrix /></button>
      </form>
      <div className={styles.error}>
        <p>{error}</p>
      </div>
      <div className={styles.main}>
        <img src={data.image} />
        <h1>{Math.round(data.celcius)}°c</h1>
        <h2>{data.name}</h2>
      </div>

      <div className={styles.details}>
        <div className={styles.humidity}>
          <img src='/images/humidity.png' />
          <div className={styles.ps}>
            <p>{Math.round(data.humidity)}deg</p>
            <p>Humidity</p>
          </div>
        </div>


        <div className={styles.wind}>
          <img src='/images/humidity2.png' />
          <div className={styles.ps}>
            <p>{Math.round(data.speed)}km/h</p>
            <p>Wind</p>
          </div>
        </div>
      </div>
    </div>


  )
}


