import React from 'react'
import Person from './Person'

const Persons = ({ persons, dPerson }) => {
  return (
      <ul>
	{persons.map(person =>
	<Person 
	  key={person.name.split('').reduce((x,y)=>x+y.charCodeAt(0),0)} 
	  person={person} 
	  dPerson={dPerson}
	/> 
	)}
      </ul>
  )
}

export default Persons
