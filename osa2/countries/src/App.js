import { useState } from "react";
import axios from 'axios'

const Country = ( {country, showInfo} ) => {

  return (
    <li>
      {country.name.common}
      <button onClick={showInfo}>show</button>
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

const CountryInfo = ( {country} ) => {
  return (
    null
  )
}

const App = () => {

  const [country, setCountry] = useState('')
  const [countryList, setCountryList] = useState([])
  const [notification, setNotification] = useState(null)
  const [countryInfo, setCountryInfo] = useState(null)
  

  const handleChange = (event) => {    
    setCountry(event.target.value)

    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then(response => {
        const filtered = (response.data.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))        
        if (filtered.length > 10) {
          setCountryList([])
          setNotification('Too many matches, specify the country name')
        }
        else if (filtered.length === 1) {
          setCountryList([])
        }
        else {          
          setCountryList(filtered)
          setNotification(null) 
        }                                    
      })   
  }

  const showInfo = () => {
    
  }

  return (
    <div>
      <form>
        find countries <input country={country} onChange={handleChange} />
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
        <CountryInfo></CountryInfo>
      </div>      
    </div>
  )

}

export default App;
