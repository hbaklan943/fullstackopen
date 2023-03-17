import React from 'react';
import ReactDOM from 'react-dom/client';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import App from './app'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer';

import { createNote } from './reducers/noteReducer'
import { filterChange } from './reducers/filterReducer'

const reducer = combineReducers({
  notes: noteReducer,
  filters: filterReducer
})
const store = createStore(reducer)
store.subscribe(() => { console.log(store.getState()) })


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
