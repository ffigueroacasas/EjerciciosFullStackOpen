import { useState } from "react"

const Blog = ({ blog, likeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false)

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
    </div>
  </div>  
)}

export default Blog