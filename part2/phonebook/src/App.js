import './App.css';

import React from 'react'


const Note = ({ note }) => {
  return (
    <li>{note}</li>
  )
}


const App = ({ notes }) => {

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