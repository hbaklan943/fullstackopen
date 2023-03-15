import React from 'react';
import ReactDOM from 'react-dom/client';

import { createStore } from 'redux'

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case 'Increment':
      return state + 1
    case 'Decrement':
      return state - 1
    case 'Zero':
      return 0
    default:
      return state
  }
}

const store = createStore(counterReducer)

const App = () => {
  return (
    <div>
      <div>
        {store.getState()}
      </div>
      <button onClick={e => { store.dispatch({ type: 'Increment' }) }}>plus</button>
      <button onClick={e => { store.dispatch({ type: 'Decrement' }) }}>minus</button>
      <button onClick={e => { store.dispatch({ type: 'Zero' }) }}>zero</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)