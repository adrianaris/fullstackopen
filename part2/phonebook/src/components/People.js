import React from 'react'
import Person from './Person'

const People = ({ people, dPerson }) => {
  return (
      <ul>
	{people.map(person =>
	<Person 
	  key={person.name.split('').reduce((x,y)=>x+y.charCodeAt(0),0)} 
	  person={person} 
	  dPerson={dPerson}
	/> 
	)}
      </ul>
  )
}

export default People
