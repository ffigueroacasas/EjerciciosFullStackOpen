import { useDispatch } from "react-redux";
import { newNotification } from "../reducers/notificationReducer"
import { createAnecdote } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const handleCreation = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createNotification(`Anecdote '${content} created`, 3))
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