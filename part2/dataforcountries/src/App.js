import React, { useState, useEffect } from 'react'
import axios from 'axios'

// JUST WRITE A DIFFERENT COMPONENT FOR THE 2.13 BUTTONS

const Countrie = ({ countrie }) => {
  return (
    <li>
      {countrie.name}
    </li>
  )
}

const FilteredCountrie = ({ countrie }) => {
  return (
    <>
      <h1>{countrie.name}</h1>
      <div>capital {countrie.capital}</div>
      <div>population {countrie.population}</div>
      <h2>Languages</h2>
      <ul>
        {countrie.languages.map(language => 
	<li key={language.name.split('').reduce((x,y)=>x+y.charCodeAt(0), 0)}>
	    {language.name}
	  </li>
	)}
      </ul>
      <img 
	src={countrie.flag} 
	alt={countrie.name} 
	width='100'
	heigth='100'
      />
    </>
  )
}

const Countries = ({ countries }) => {
  return (
    countries.length === 1
      ? countries.map(countrie =>
	<FilteredCountrie
	  key={countrie.name.split('').reduce((x,y)=>x+y.charCodeAt(0),0)}
	  countrie={countrie} 
	/>	
	)
      : countries.length > 10
	  ? <div>Too many mathces, specify another filter</div>
	  : <ul>
	      {countries.map(countrie =>
	      <Countrie 
		key={countries.indexOf(countrie)}
		countrie={countrie} 
		  />
	      )}
	    </ul>
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

  const countriesToShow = countries.filter(countrie => countrie.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <>
      <h1>Countries</h1>
      find countries <input 
	value={filter}
	onChange={handleFilter}
      />
      <div>
	<Countries countries={countriesToShow} />
      </div>
    </>
  )

}
export default App
