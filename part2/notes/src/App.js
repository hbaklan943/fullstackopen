import './index.css';
import React from 'react'
import Note from './components/Note';
import Notification from './components/Notification'
import { useState, useEffect } from 'react'
import noteService from './services/notes'
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note... ')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successfulMessage, setSuccessfulMessage] = useState(null)

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random < 0.5
    }

    noteService
      .create(noteObject)
      .then((returnedNote) => {
        console.log(returnedNote);
        setNotes(notes.concat(returnedNote))
        setSuccessfulMessage(`added ${returnedNote.content}`)
        setTimeout(() => {
          setSuccessfulMessage(null)
        }, 3000)
        setNewNote('')
      })
  }


  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important)

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>notes</h1>
      <Notification errorMessage={errorMessage} successfulMessage={successfulMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          Show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map(note =>
          <Note
            key={note.id}
            note={note.content}
            toggleImportance={() => { toggleImportanceOf(note.id) }}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type='submit'>save</button>
      </form>
      <Footer />
    </div>
  )
}
export default App;