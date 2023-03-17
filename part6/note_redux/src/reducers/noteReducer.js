const initialState = [
  {
    content: 'reducer defines how redux store works',
    important: true,
    id: 1,
  },
  {
    content: 'state of store can contain any data',
    important: false,
    id: 2,
  }
]

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEW_NOTE': {
      return [...state, action.payload]
    }
    case 'TOGGLE_IMPORTANCE': {
      const id = action.payload.id
      const noteToChange = state.find(note => note.id === id)
      return state.map(note => note.id !== id ? note : { ...note, important: !noteToChange.important })
    }
    default: return state
  }
}


const generateId = () => {
  return Math.floor(Math.random() * 10000000)
}
export const createNote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      important: false,
      id: generateId()
    }
  }
}
export const toggleImportanceOf = (id) => {
  return {
    type: 'TOGGLE_IMPORTANCE',
    payload: { id }
  }
}

export default noteReducer