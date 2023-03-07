import React from 'react'

export default function Notification({ notification }) {

  const negativeStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const positiveStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }


  return (
    <div style={notification.style === 'positive' ? positiveStyle : negativeStyle}>
      {notification.message}
    </div>
  )
}
