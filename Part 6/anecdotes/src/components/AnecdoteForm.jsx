import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer.js"
import { createAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreation = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
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