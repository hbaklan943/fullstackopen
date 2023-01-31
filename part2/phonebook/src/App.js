import React from 'react'
import { useState } from 'react'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Harun' },
    { name: 'Fevzi' }
  ])
  const [newName, setNewName] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    if (persons.filter((person) => person.name === newName)[0]) {
      alert(`${newName} Already in list`);
    }
    else {
      setPersons(persons.concat(
        { name: newName }
      ))
    }
    setNewName('');

  }
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  return (
    <div>
      <div>debug: {newName}</div>
      <h1>Phonebook</h1>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers:</h2>
      {persons.map((person) => <li key={person.name}>{person.name}</li>)}
    </div>
  )
}

export default App;