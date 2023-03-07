import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  console.log('token value is:', token);
}

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('config is: ', config);
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create }