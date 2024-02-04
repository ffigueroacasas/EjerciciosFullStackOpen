import { useDispatch, useSelector } from "react-redux";
import { appendAnecdote, newAnecdote } from "../reducers/anecdoteReducer";
import { newNotification } from "../reducers/notificationReducer.js"
import anecdoteService from "../services/anecdoteService";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreation = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = anecdoteService.createNew(content)
    dispatch(newAnecdote(newAnecdote))
    dispatch(newNotification(`Anecdote '${content}' created`))
    setTimeout(() => dispatch(newNotification('')), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleCreation}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm