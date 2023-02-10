import { useState } from 'react'
import axios from 'axios'

function Countrylist({ countries, setCountries }) {
  return (
    <ul>
      {countries.map(country =>
        <li key={country.name.common}>
          {country.name.common}
          <button onClick={() => setCountries([country])}>show</button>
        </li>
      )}
    </ul>
  )
}

function Singlecountry({ countries }) {
  const [temperature, setTemperature] = useState(null)
  const [wind, setWind] = useState(null)
  const [weatherIconLink, setWeatherIconLink] = useState('')

  axios
    .get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_API_KEY}&q=${countries[0].capital[0]}`)
    .then(response => {
      setTemperature(response.data.current.temp_c)
      setWind(response.data.current.wind_kph)
      setWeatherIconLink(`http:${response.data.current.condition.icon}`)
    })

  //TODO condition not required
  return countries.length === 1
    ? (
      <ul>
        <h2>{countries[0].name.common}</h2>
        <h3>Capital: {countries[0].capital[0]}</h3>
        <h3>Area: {countries[0].area}</h3>
        <h3>Flag: </h3>
        <img src={countries[0].flags.png} />
        <h3>Languages:</h3>
        <ul>
          {Object.entries(countries[0].languages).map(entry => <li key={entry[1]}>{entry[1]}</li>)}
        </ul>
        <h3>Weather in {countries[0].capital[0]}: </h3>
        <ul>
          <li>temperature: {temperature}°C</li>
          <img src={weatherIconLink} />
          <li>wind: {wind} kph</li>
        </ul>

      </ul>
    )
    : null
}



function App() {
  const [input, setinput] = useState('')
  const [countries, setCountries] = useState([])

  const search = (event) => {
    setinput(event.target.value)
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        const searchresult = response.data.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()));


        setCountries(
          searchresult.length < 10
            ? searchresult
            : []
        )
        console.log(searchresult);

      })
      .catch(error => console.log(error))
  }


  return (
    <div >
      <input onChange={search} value={input} />
      {countries.length === 1
        ? <Singlecountry countries={countries} />
        : <Countrylist countries={countries} setCountries={setCountries} />
      }
    </div>
  );
}

export default App;
