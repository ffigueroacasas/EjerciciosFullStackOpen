import { useState } from "react"

const Blog = ({ blog, likeBlog, deleteBlog}) => {
  const [detailsVisible, setDetailsVisible] = useState(true)

  const showWhenVisible = {display: detailsVisible ? '' : 'none'}

  const handleLike = () => {
    const blogToLike = {
      id: blog.id, 
      title: blog.title, 
      author: blog.author, 
      likes: blog.likes + 1, 
      url: blog.url
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
    <button onClick={() => setDetailsVisible(!detailsVisible)}>{detailsVisible ? "Hide" : "Show"}</button>
    <div style={showWhenVisible}>
      <p>{blog.url}</p>
      <p>Likes: {blog.likes}</p> <button onClick={handleLike}>Like</button>
      <p>{blog.author}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  </div>  
)}

export default Blog