import React from 'react'

const Dbutton = ( { dPerson, id } ) => {
  return (
    <button onClick={() => dPerson(id)}>
      delete
    </button>
  )
}

export default Dbutton
