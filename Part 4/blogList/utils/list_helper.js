const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) =>  sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  let favorite = null
  blogs.forEach(blog => {
    if (favorite){
      if (blog.likes > favorite.likes){
        favorite = {
        title: blog.title, 
        author: blog.author,
        likes: blog.likes
      }
      }
    }
    else{
      favorite = {
        title: blog.title, 
        author: blog.author,
        likes: blog.likes
      }
    }
  })
  return favorite
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  const authorBlogCountMap = new Map()
  authors.forEach(author => {
    if(!authorBlogCountMap.has(author)){
      authorBlogCountMap.set(author,1)
    }
    else{
      authorBlogCountMap.set(author, authorBlogCountMap.get(author) + 1)
    }
  })
  const result = [...authorBlogCountMap.entries()].reduce((previous, current ) => previous[1] > current[1] ? previous : current)
  return {
    author: result[0],
    blogs: result[1]
  }
}

const mostLikes = (blogs) => {
  const likesByAuthor = new Map()
  blogs.forEach(blog => {
    if (!likesByAuthor.has(blog.author)){
      likesByAuthor.set(blog.author, blog.likes)
    }
    else {
      likesByAuthor.set(blog.author, likesByAuthor.get(blog.author) + blog.likes)
    }
  })
  const result = [...likesByAuthor.entries()].reduce((previous, current) => previous[1] > current[1] ? previous : current)
  return {
    author: result[0],
    likes: result[1]
  }
}

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog, 
  mostBlogs,
  mostLikes
}