import React, { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import pServices from './services/phonebook'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    pServices 
      .getAll()
      .then(allPersons => {
	setPersons(allPersons)
      })
  }, [])

  const updNumber = (person, newNumber) => {
    if (window.confirm(`${person.name} is already in the phonebook, replace the old number with a new one?`)) { 
      const changedPerson = { ...person, number: newNumber }
      pServices
	.update(person.id, changedPerson).then(returnedPerson => { 
	  setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
	})
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { 
      name: newName,
      number: newNumber
    }

    persons.map(person => person.name).includes(newName)
      ? updNumber(persons.find(p => p.name === newName), newNumber) 
      : pServices
	  .create(newPerson)
	  .then(person => {
	    setPersons(persons.concat(person))
	  })
    setNotification(`Added ${newName}`)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
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
	  setErrorMessage(`Information of ${person.name} has already been removed from server`)
	  setTimeout(() => {
	    setErrorMessage(null)
	  }, 5000)
	})
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification} />
      <Error message={errorMessage} />
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
