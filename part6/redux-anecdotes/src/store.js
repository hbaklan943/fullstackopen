import { configureStore } from '@reduxjs/toolkit'


import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteReducer,
      filters: filterReducer
    }
})

  
store.subscribe(() => { console.log(store.getState()) })

export default store