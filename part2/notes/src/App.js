import './App.css';
import React from 'react'
import Note from './components/Note';
import axios from 'axios'
import { useState, useEffect } from 'react'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('a new note... ')
  const [showAll, setShowAll] = useState(true)

  const hook = () => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        setNotes(response.data)
      })
  }

  useEffect(hook, [])



  const addNote = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target);

    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random < 0.5
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  }

  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important)

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
          <Note key={note.id} note={note.content} />
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