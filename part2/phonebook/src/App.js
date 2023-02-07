
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import personService from './services/numbers'
import axios from 'axios'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '', id: 0 })
  const [searchInput, setSearchInput] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response)
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((person) => (person.name === newPerson.name))) {
      if (window.confirm(`${newPerson.name} Already in list, would you like to replace the number `)) {

        const person = persons.find(p => p.name === newPerson.name)

        personService
          .replace(person.id, newPerson)
          .then(response => {
            setPersons(persons.map(p => p.name === newPerson.name ? newPerson : p))
          })
      }
    }

    else if (newPerson.name === '' || newPerson.number === '') alert("Empty entry")

    else {
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
        })
    }
    setNewPerson({ name: '', number: '' });
  }

  const handleNameChange = (event) => {
    setNewPerson(
      { ...newPerson, name: event.target.value, id: persons.length + 1 }
    )
  }

  const handleNumberChange = (event) => {
    setNewPerson(
      { ...newPerson, number: event.target.value, id: persons.length + 1 }
    )
  }

  const handleSearch = (event) => {
    setSearchInput(event.target.value)
  }

  const deleteNumber = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      personService.deleteData(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Filter value={searchInput} onChange={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm onSubmit={handleSubmit} newPersonName={newPerson.name} newPersonNumber={newPerson.number} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />

      <h2>Numbers:</h2>
      <Numbers searchInput={searchInput} persons={persons} deleteNumber={deleteNumber} />

    </div>
  )
}

export default App;