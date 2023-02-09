
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/numbers'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState({ name: '', number: '', id: null })
  const [searchInput, setSearchInput] = useState('')
  const [notification, setNotification] = useState({ message: '', style: null })

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const addedStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }
  const editedStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response)
        console.log(response);
      })
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    if (persons.find((person) => (person.name === newPerson.name))) {
      if (window.confirm(`${newPerson.name} Already in list, would you like to replace the number `)) {

        const person = persons.find(p => p.name === newPerson.name)
        person.number = newPerson.number;
        console.log(person);

        personService
          .replace(person.id, person)
          .then(response => {
            setPersons(persons.map(p => p.name === newPerson.name ? person : p))
            setNotification({ message: 'Number is succesfully changed', style: editedStyle })
            setTimeout(() => setNotification({ message: '', style: null }), 3000)

          })
      }
    }

    else if (newPerson.name === '' || newPerson.number === '') alert("Empty entry")

    else {
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNotification({ message: 'Number is added', style: addedStyle })
          setTimeout(() => setNotification({ message: '', style: null }), 3000)
        })
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

  const deleteNumber = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      personService.deleteData(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
    }
  }

  return (
    <div>
      <Notification notification={notification} />

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


