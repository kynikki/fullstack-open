import { useState, useEffect } from "react";
import axios from 'axios'

const Country = ( {country, showInfo} ) => {

  return (
    <li>
      {country.name.common}
      <button onClick={() =>showInfo(country)}>show</button>
    </li>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return(null)
  }
  return (
    <div>
      {message}        
    </div>    
  )
}

const InfoCountry = ( {country} ) => { 
  
  if (country == null) {  
    return (
      null
    )
  }
  const languages = Object.values(country.languages) 

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        capital: {country.capital}
        <br></br>  
        area: {country.area}
      </p>
      <h2>Languages</h2>
      <ul>
        {languages.map(language =>
          <li key={language}>{language}</li>
        )}        
      </ul>
      <img src={country.flags.png} width="250" height="200" />      
    </div>  
  )
}

const Weather = ( {weather, country} ) => { 

  if (country == null || weather == null) {
    return (null)
  } 
  console.log(weather.weather[0].icon) 
  const imageUrl = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`  
  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature {weather.main.temp} Celcius</p>
      <img src={imageUrl} />       
      <p>Wind {weather.wind.speed} m/s</p>     
    </div>  
  )     
}

const App = () => {

  const [countryField, setCountryField] = useState('')
  const [countryList, setCountryList] = useState([])
  const [notification, setNotification] = useState(null)
  const [infoCountry, setInfoCountry] = useState(null)  
  const [capitalWeather, setCapitalWeather] = useState(null)

  const api_key = process.env.REACT_APP_API_KEY  

  useEffect(() => {    

    if (countryField === '') {
      setCountryList([])
      setNotification(null)
    }
    else {
      axios
        .get(`https://restcountries.com/v3.1/all`)
        .then(response => {          
          const filtered = response.data.filter(country => country.name.common.toLowerCase().includes(countryField.toLowerCase()))          
          if (filtered.length > 10) {
            setInfoCountry(null)
            setCountryList([])
            setNotification("Too many matches, please specify the filter")
          }
          else if (filtered.length === 1) {
            setCountryList([])
            setInfoCountry(filtered[0])

            const capital = filtered[0].capital
            
            axios
              .get(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${api_key}`)
              .then(response => {
                setCapitalWeather(response.data)
              })
          }          
          else {
            setInfoCountry(null)
            setNotification(null)
            console.log(filtered.length)
            setCountryList(filtered)
          }  
        })
    }
    
  }, [countryField])  
 

  const showInfo = (country) => {
    setInfoCountry(country)
    
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
      .then(response => {
        setCapitalWeather(response.data)
      })
    console.log(capitalWeather)
  }

  const handleChange = (event) => {       
    event.preventDefault()
    setCountryField(event.target.value)
  }

  return (
    <div>
      <form>
        find countries <input onChange={handleChange} />
      </form>
      <Notification message={notification} />
      <ul>
        {countryList.map(country =>
          <Country
            country={country}
            key={country.name.common}
            showInfo={showInfo}
          />  
        )}
      </ul>
      <div>
        <InfoCountry country={infoCountry} />
        <Weather weather={capitalWeather} country={infoCountry} />
      </div>      
    </div>
  )

}
export default App
