import { useState } from "react"

const CreateBlogForm = ({addBlog}) => {
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
            value={title}
            onChange={({target}) => setTitle(target.value)} />
        </div>
        <div>
          <p>
            Author:
          </p>
          <input 
          type="text"
          name="Author"
          value={author}
          onChange={({target}) => setAuthor(target.value)}
          />
        </div>
        <div>
          <p>
            Url: 
          </p>
          <input
            type="text"
            name="Url"
            value={url}
            onChange={({target}) => setUrl(target.value)}
          />
        </div>
        <button type='submit'>Create</button>
      </form>
  )
}

export default CreateBlogForm