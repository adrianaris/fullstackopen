import React from 'react'
import Dbutton from './dButton'

const Person = ({ person, dPerson }) => {
  return (
    <li>
      {person.name} {person.number}
      <Dbutton 
	id={person.id} 
	dPerson={dPerson}
      />
    </li>
  )
}

export default Person
