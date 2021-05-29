import React, { useState } from 'react'

const PersonForm = () => {
  
}

const Person = ({ person }) => {
  return (
    <li>{person.name} {person.number}</li>
  )
}

const Persons = ({ persons }) => {
  return (
      <ul>
	{persons.map(person =>
	<Person key={person.name.split('').reduce((x,y)=>x+y.charCodeAt(0),0)} person={person} /> 
	)}
      </ul>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { 
      name: newName,
      number: newNumber
    }

    persons.map(person => person.name).includes(newName)
      ? window.alert(`${newName} is already in the phonebook`) 
      : setPersons(persons.concat(newPerson))
    setNewName('')
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => setFilter(event.target.value)

  const peopleToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div> 
	filter shown with <input
	  value={filter}
	  onChange={handleFilter} 
	/>
      </div>
      <h3>Add a new</h3>
      <form onSubmit={addPerson}>
	<div>
	  name: <input
	    value={newName}
	    onChange={handleNewName}
	  />
	</div>
	<div>
	  number: <input
	    value={newNumber}
	    onChange={handleNewNumber}
	  />
	</div>
	<div>
	  <button type="submit">add</button>
	</div>
      </form>
      <h3>Numbers</h3>
      <Persons persons={peopleToShow} />
    </div>
  )
}

export default App
