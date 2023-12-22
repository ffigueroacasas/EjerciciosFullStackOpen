import axios from 'axios'
const baseUrl = "/persons"

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
} 

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request.then(response => response.data)
}

const remove = personId => {
  const request = axios.delete(`http://localhost:3001/persons/${personId}`)
  return request.then(response => response.status)
}

const update = updatedPerson => {
  const request = axios.put(`http://localhost:3001/persons/${updatedPerson.id}`, updatedPerson)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  remove,
  update
}