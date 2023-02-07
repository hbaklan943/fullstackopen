import './App.css';
import React from 'react'
import Note from './components/Note';
import { useState, useEffect } from 'react'
import noteService from './services/notes'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note... ')
  const [showAll, setShowAll] = useState(true)

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
        alert(`the note ${note.content} was already deleted from the server`)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>notes</h1>
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
    </div>
  )
}
export default App;