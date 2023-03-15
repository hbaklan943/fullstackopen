import { createStore } from 'redux'
import ReactDOM from 'react-dom/client'
import counterReducer from "./reducer"

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <button onClick={e => { store.dispatch({ type: 'GOOD' }) }}>Good</button>
      <button onClick={e => store.dispatch({ type: 'OK' })}>Ok</button>
      <button onClick={e => store.dispatch({ type: 'BAD' })}>Bad</button>
      <button onClick={e => store.dispatch({ type: 'RESET' })}>Reset Stats</button>
      <div>Good: {store.getState().good}</div>
      <div>Ok:{store.getState().ok}</div>
      <div>Bad:{store.getState().bad}</div>
    </div>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)