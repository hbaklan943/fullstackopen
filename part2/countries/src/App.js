import { useState } from 'react'
import axios from 'axios'

function Countrylist({ countries }) {
  return (
    <ul>
      {countries.map(country =>
        <li key={country.name.common}>
          {country.name.common}
        </li>
      )}
    </ul>
  )
}

function Singlecountry({ countries }) {

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
          {Object.entries(countries[0].languages).map(entry => <li>{entry[1]}</li>)}
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
      <Countrylist countries={countries} />
      <Singlecountry countries={countries} />
    </div>
  );
}

export default App;
