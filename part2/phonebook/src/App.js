import './App.css';
import Note from './components/Note';
import React from 'react'


const App = ({ notes }) => {
  console.log(notes);

  return (
    <div>
      <h1>notes</h1>
      <ul>
        {notes.map(note => <Note key={note.id} note={note.content} />)}
      </ul>
    </div>
  )
}
export default App;