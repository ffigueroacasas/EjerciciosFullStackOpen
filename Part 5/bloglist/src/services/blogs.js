import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blogToLike) => {
  const response = await axios.put(baseUrl + '/' + blogToLike.id, blogToLike)
  return response.data
}

const remove = async (blogToDelete) => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.delete(baseUrl + '/' + blogToDelete.id, config)
  return response.data
}

export default { getAll, create, setToken, update, remove }