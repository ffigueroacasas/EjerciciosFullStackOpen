import { useDispatch, useSelector } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { newNotification } from '../reducers/notificationReducer'
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter !== ''){
      return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
    const items = [...state.anecdotes]
    return items.sort((a, b) => b.votes - a.votes)
  })

  const voteHandler = (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    const votedAnecdote = anecdotes.find(notification => notification.id === anecdote.id)
    dispatch(createNotification(`you voted '${votedAnecdote.content}'`, 1))
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
            <button onClick={() => voteHandler(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList