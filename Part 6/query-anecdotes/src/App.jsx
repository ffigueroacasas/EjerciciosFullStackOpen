import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
   const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
   })
  const result = useQuery('anecdotes', getAnecdotes)
  const [notification, dispatch] = useContext(NotificationContext)

  if (result.isLoading) return <div>loading data...</div>

  if (result.error) return <div>anecdote service not available due to problems in server</div>

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    dispatch({type: 'SHOW_NOTIFICATION', payload: `you voted ${anecdote.content}`})
    setTimeout(() => dispatch({type: 'CLEAR'}), 5000)
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
