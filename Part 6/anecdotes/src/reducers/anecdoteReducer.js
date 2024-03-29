import { createSlice } from '@reduxjs/toolkit';
import anecdoteService from '../services/anecdoteService';

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
      state.push(action.payload)
    },
    appendAnecdote: (state, action) => {
      state.push(action.payload)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    }
  },
});

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.update({
      ...anecdote, 
      votes: anecdote.votes + 1
    })
    dispatch(vote(anecdote))
  }
}

export const { vote,  appendAnecdote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;