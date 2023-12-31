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

module.exports = {
  dummy, 
  totalLikes, 
  favoriteBlog
}
