import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeBlog, deleteBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

  const showWhenVisible = { display: detailsVisible ? '' : 'none' }

  const handleLike = () => {
    const blogToLike = {
      ...blog,
      likes: blog.likes + 1
    }
    likeBlog(blogToLike)
  }

  const handleDelete = () => {
    if (window.confirm(`Do you really want to delete "${blog.title}" by ${blog.author}?`)){
      deleteBlog(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      {blog.author}
      <button onClick={() => setDetailsVisible(!detailsVisible)} className='show-hide' id='show-button'>{detailsVisible ? 'Hide' : 'Show'}</button>
      <div style={showWhenVisible}>
        <p>{blog.url}</p>
        <p>Likes: {blog.likes}</p> <button onClick={handleLike} className='like-button' id='like-button' >Like</button>
        <p>{blog.author}</p>
        <button onClick={handleDelete} id='delete-button'>Delete</button>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog