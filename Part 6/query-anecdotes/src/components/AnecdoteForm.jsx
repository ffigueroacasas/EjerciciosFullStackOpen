import { createAnecdote } from "../requests"
import { useQuery, useMutation, useQueryClient } from "react-query"
import { useContext } from "react"
import NotificationContext from "../NotificationContext"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError:() => {
      dispatch({type: 'SHOW_NOTIFICATION', payload: 'too short anecdote, must have length of 5 at least'})
      setTimeout(() => {
        dispatch({type: 'CLEAR'})
      }, 5000)
    }
  })
  const [notification, dispatch] = useContext(NotificationContext) 

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
    dispatch({type: 'SHOW_NOTIFICATION', payload: `'${content}' created`})
    setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
