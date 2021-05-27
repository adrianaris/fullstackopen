import React, { useState } from 'react'

const Person = ({ person }) => {
  return (
    <li>{person.name}</li>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ])
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { name: newName }
    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onsubmit={addPerson}>
	<div>
	  name: <input
	    value
	  />
	</div>
	<div>
	  <button type="submit">add</button>
	</div>
      </form>
      <h2>Numbers</h2>
      <ul>
	{persons.map(person =>
	  <Person key={persons.length + 1} person={person} /> 
	)}
      </ul>
      <div>debug: {newName}</div>   

    </div>
  )
}

export default App
