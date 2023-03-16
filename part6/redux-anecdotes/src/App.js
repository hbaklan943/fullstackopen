import { useSelector, useDispatch } from 'react-redux'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({ type: 'VOTE', payload: { id } })
  }
  const newAnectode = (event) => {
    event.preventDefault()
    dispatch({ type: 'ADD_ANECTODE', payload: { content: event.target.anectode.value } })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={newAnectode}>
        <div><input type='text' name='anectode' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default App