
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '' })
  const [searchInput, setSearchInput] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

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
      <h2>Search</h2>
      <Filter value={searchInput} onChange={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm onSubmit={handleSubmit} newPersonName={newPerson.name} newPersonNumber={newPerson.number} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />

      <h2>Numbers:</h2>
      <Numbers searchInput={searchInput} persons={persons} />

    </div>
  )
}

export default App;