import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = ({ addBlog }) => {
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')

  const handleCreation = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    addBlog(newBlog)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={handleCreation}>
      <h3>Create a new Blog!</h3>
      <div>
        <p>
          Title:
        </p>
        <input
          type="text"
          name="Title"
          id='title-input'
          value={title}
          onChange={({ target }) => setTitle(target.value)} />
      </div>
      <div>
        <p>
          Author:
        </p>
        <input
          type="text"
          name="Author"
          id='author-input'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        <p>
            Url:
        </p>
        <input
          type="text"
          name="Url"
          id='url-input'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>Create</button>
    </form>
  )
}

CreateBlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default CreateBlogForm