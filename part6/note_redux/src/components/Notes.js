import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'


const Note = ({ note, handleClick }) => {
  return (
    <li key={note.id}>
      {note.content} <strong> {note.important ? 'Important' : ''}</strong>
      <button onClick={handleClick}>Toggle Importance</button>
    </li >
  )
}

const Notes = () => {
  const dispatch = useDispatch()
  const notes = useSelector(state => state)

  return (
    <ul>
      {
        notes.map(note =>
          <Note
            key={note.id}
            note={note}
            handleClick={() => { dispatch(toggleImportanceOf(note.id)) }}
          />
        )
      }
    </ul>
  )
}

export default Notes