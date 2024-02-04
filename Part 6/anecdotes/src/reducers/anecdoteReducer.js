import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload.id;
      const anecdoteToVote = state.find(a => a.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    newAnecdote: (state, action) => {
      const newAnecdote = action.payload
      state.push(asObject(newAnecdote));
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  },
});

export const { vote, newAnecdote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;