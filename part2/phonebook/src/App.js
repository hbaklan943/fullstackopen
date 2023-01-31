import React from 'react'
import { useState } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'

const App = () => {

  const [persons, setPersons] = useState([
    { name: 'Harun', number: '5383758727' },
    { name: 'Fevzi', number: '8714671871' },
    { name: 'Keko', number: '7835698352' },
    { name: 'hakan', number: '198468196' },
    { name: 'Kıro', number: '1092747325' }
  ])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchInput, setSearchInput] = useState('')
  console.log(persons.filter((person) => person.name === searchInput));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.filter((person) => (person.name === newPerson.name || person.number === newPerson.number)).length) {
      alert(`${newPerson.name} Already in list`);
    }
    else if (newPerson.name === '' || newPerson.number === '') alert("Empty entry")
    else {
      setPersons(persons.concat(newPerson)
      )
    }
    setNewPerson({ name: '', number: '' });
  }

  const handleNameChange = (event) => {
    setNewPerson(
      { ...newPerson, name: event.target.value }
    )

  }
  const handleNumberChange = (event) => {
    setNewPerson(
      { ...newPerson, number: event.target.value }
    )
  }
  const handleSearch = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={searchInput} onChange={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm onSubmit={handleSubmit} newPersonName={newPerson.name} newPersonNumber={newPerson.number} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />

      <h2>Numbers:</h2>
      <Numbers searchInput={searchInput} persons={persons} />

    </div>
  )
}

export default App;