import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { newNotification } from '../reducers/notificationReducer'

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
    const votedAnecdote = anecdotes.find(notification => notification.id === id)
    dispatch(newNotification(`you voted '${votedAnecdote.content}'`))
    setTimeout(() => dispatch(newNotification('')), 5000)
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