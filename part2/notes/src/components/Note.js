

const Note = ({ note, toggleImportance }) => {



  return (
    <li className="note">
      <span>{note.content}</span>

      <button onClick={toggleImportance}>Make {note.important ? 'not important' : 'important'}</button>
    </li>
  )
}

export default Note