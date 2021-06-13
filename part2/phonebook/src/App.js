import React, { useState, useEffect } from 'react'
import People from './components/People'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import pServices from './services/phonebook'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [ people, setPeople ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ notification, setNotification] = useState(null)
  const [ errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    pServices 
      .getAll()
      .then(allPeople => {
	setPeople(allPeople)
      })
  }, [])

  const updNumber = (person, newNumber) => {
    if (window.confirm(`${person.name} is already in the phonebook, replace the old number with a new one?`)) { 
      const changedPerson = { ...person, number: newNumber }
      pServices
	.update(person.id, changedPerson).then(returnedPerson => { 
	  setPeople(people.map(p => p.id !== person.id ? p : returnedPerson))
	})
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = { 
      name: newName,
      number: newNumber
    }

    people.map(person => person.name).includes(newName)
      ? updNumber(people.find(p => p.name === newName), newNumber) 
      : pServices
	  .create(newPerson)
	  .then(person => {
	    setPeople(people.concat(person))
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
    ? people
    : people.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const dPerson = id => {
    const person = people.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) { 
      pServices
	.deleteP(id, person).then(deletedP => {
	  setPeople(people.filter(p => p.id !== id)) 
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
      <People 
	people={peopleToShow} 
	dPerson={dPerson}
      />
    </div>
  )
}

export default App
