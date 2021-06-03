import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ country, setFilter }) => {
  return (
    <li>
      {country.name} <Button country={country} setFilter={setFilter} />
    </li>
  )
}

const Weather = ({country, weather}) => {
  if (weather.current === undefined) {
    return null
  } else {
    return (
      <>
      <h2>Weather in {country.capital}</h2>
	<div>temperature: {weather.current.temperature}</div>
	<img
	  src={weather.current.weather_icons}
	  alt={weather.current.weather_description}
	  width='50'
	  heigth='50'
	/>
	<div>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</div>
      </>
    ) 
  }
}

const FilteredCountry = ({ country }) => {
  const [weather, setWeather] = useState({})

  useEffect(() => {
  const api_key = process.env.REACT_APP_API_KEY
  const capital = country.capital
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
      .then(response => setWeather(response.data))
  }, [country])


  return (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => 
	<li key={language.name.split('').reduce((x,y)=>x+y.charCodeAt(0), 0)}>
	    {language.name}
	  </li>
	)}
      </ul>
      <img 
	src={country.flag} 
	alt={country.name} 
	width='100'
	heigth='100'
      />
      <Weather country={country} weather={weather} />
    </>
  )
}

const Countries = ({ countries, setFilter }) => {
  return (
    countries.length === 1
      ? countries.map(country =>
	<FilteredCountry
	  key={country.name.split('').reduce((x,y)=>x+y.charCodeAt(0),0)}
	  country={country} 
	/>	
	)
      : countries.length > 10
	  ? <div>Too many mathces, specify another filter</div>
	  : <ul>
	      {countries.map(country =>
	      <Country 
		key={countries.indexOf(country)}
		country={country} 
		setFilter={setFilter}
		  />
	      )}
	    </ul>
  )
}

const Button = ({ country, setFilter }) => {
  return (
    <button onClick={() => setFilter(country.name)} > 
      show
    </button>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('http://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data) )
  }, [])

  const handleFilter = (event) => setFilter(event.target.value)

  const countriesToShow = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <h1>Countries</h1>
      find countries <input 
	value={filter}
	onChange={handleFilter}
      />
      <div>
	<Countries countries={countriesToShow} setFilter={setFilter} />
      </div>
    </>
  )

}
export default App
