
import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/numbers'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
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
        console.log('get all', response);
      })
  }, [])

  const handleSubmit = (event) => {
    console.log('on submit', persons);
    event.preventDefault();
    if (persons.find((person) => (person.name === newName))) {
      console.log(persons);
      if (window.confirm(`${newName} Already in list, would you like to replace the number `)) {
        console.log(persons);
        const personToBeChanged = persons.find(p => p.name === newName)
        console.log(personToBeChanged);

        const newPerson = {
          name: newName,
          number: newNumber
        }
        console.log(newPerson);

        personService
          .replace(personToBeChanged.id, newPerson)
          .then(response => {
            console.log('inside then');
            setPersons(persons.map(p => p.name !== newPerson.name ? p : response))
            setNotification({ message: 'Number is succesfully changed', style: editedStyle })
            setTimeout(() => setNotification({ message: '', style: null }), 4000)
          })
          .catch(error => {
            console.log('catched error');
            console.log(persons);
            setNotification({ message: 'Number format is not valid', style: errorStyle })
            setTimeout(() => setNotification({ message: '', style: null }), 4000)
          })
      }
    }

    else if (newName === '' || newNumber === '') alert("Empty entry")

    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }

      console.log('in else');
      personService
        .create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          setNotification({ message: 'Number is added', style: addedStyle })
          setTimeout(() => setNotification({ message: '', style: null }), 4000)
        })
        .catch(error => {
          setNotification({ message: 'Name must be at least 3 characters', style: errorStyle })
          setTimeout(() => setNotification({ message: '', style: null }), 4000)
        })
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearch = (event) => {
    setSearchInput(event.target.value)
  }

  const deleteNumber = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      personService.deleteData(id)
        .then(() => setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          setNotification({ message: 'Number is already deleted', style: errorStyle })
          setTimeout(() => setNotification({ message: '', style: null }), 4000)
        })
    }
  }

  return (
    <div>
      <Notification notification={notification} />

      <h1>Phonebook</h1>
      <h2>Search</h2>
      <Filter value={searchInput} onChange={handleSearch} />

      <h2>Add a new</h2>
      <PersonForm onSubmit={handleSubmit} newPersonName={newName} newPersonNumber={newNumber} onNameChange={handleNameChange} onNumberChange={handleNumberChange} />

      <h2>Numbers:</h2>
      <Numbers searchInput={searchInput} persons={persons} deleteNumber={deleteNumber} />

    </div>
  )
}

export default App;


