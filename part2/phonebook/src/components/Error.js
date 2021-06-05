import React from 'react'

const Error = ({ message }) => {
  const notificationStyle = {
    color: 'red',
    fontSize: 20,
    background: 'lightgrey',
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

   return (
     <div style={notificationStyle}>
       {message}
     </div>
   )
}

export default Error
