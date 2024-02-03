import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    filterAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { filterAnecdotes } = anecdoteSlice.actions 
export default anecdoteSlice.reducer

// export const filterAnecdotes = (filterText) =>  {
//   return {
//     type: 'FILTER', 
//     payload: {
//       filterText
//     }
//   }
// }

// const filterReducer = (state = initialState, action) => {
//   switch(action.type){
//     case 'FILTER': {
//       return action.payload.filterText
//     }
//     default: {
//       return state
//     }
//   }
// }

// export default filterReducer