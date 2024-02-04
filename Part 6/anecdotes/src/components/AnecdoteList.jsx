import { useDispatch, useSelector } from "react-redux";
//import { voteAnecdote } from "../reducers/anecdoteReducer";
import { vote, newAnecdote } from "../reducers/anecdoteReducer.js";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter !== ''){
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
    const items = [...state.anecdotes]
    return items.sort((a, b) => b.votes - a.votes)
  })

  const voteHandler = (id) => {
    dispatch(vote({id}))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => voteHandler(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList