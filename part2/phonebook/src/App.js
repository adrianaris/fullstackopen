import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import pServices from './services/phonebook'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    pServices 
      .getAll()
      .then(allPersons => {
	setPersons(allPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { 
      name: newName,
      number: newNumber
    }

    persons.map(person => person.name).includes(newName)
      ? window.alert(`${newName} is already in the phonebook`) 
      : pServices
	  .create(newPerson)
	  .then(person => {
	    setPersons(persons.concat(person))
	  })
    setNewName('')
  }

  const handleNewName = (event) => setNewName(event.target.value)
  const handleNewNumber = (event) => setNewNumber(event.target.value)

  const handleFilter = (event) => setFilter(event.target.value)

  const peopleToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const dPerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) { 
      pServices
	.deleteP(id, person).then(deletedP => {
	  setPersons(persons.filter(p => p.id !== id)) 
	})
	.catch(error => {
	  alert(
	    `${person.name} was already deleted from the phonebook`
	  )
	  setPersons(persons.filter(p => p.id !== id))
	})
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilter={handleFilter} /> 
      <h3>Add a new</h3>
      <PersonForm 
	addPerson={addPerson} 
	newName={newName} 
	handleNewName={handleNewName} 
	newNumber={newNumber} 
	handleNewNumber={handleNewNumber}
      /> 
      <h3>Numbers</h3>
      <Persons 
	persons={peopleToShow} 
	dPerson={dPerson}
      />
    </div>
  )
}

export default App
