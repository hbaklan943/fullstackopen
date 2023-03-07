import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    setUser(user)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      console.log(user);
    } catch (error) {

      console.log('Invalid username or password');
    }

  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input type='text' name='Username' value={username} onChange={({ target }) => { setUserName(target.value) }}></input>
        </div>
        <div>
          Password:
          <input type='password' name='Password' value={password} onChange={({ target }) => { setPassword(target.value) }}></input>
        </div>
        <button type='submit'>Login</button>
      </form>
    )
  }

  const blogsComponent = () => {
    return (
      <div>
        <h2>blogs</h2>
        logged in as {username}
        <button onClick={() => {
          setUser(null)
          window.localStorage.removeItem('loggedBlogAppUser')
        }}>Log out</button>
        {
          blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )
        }
      </div>
    )
  }

  return (
    <div>
      {!user && loginForm()}
      {user && blogsComponent()}
    </div>
  )
}

export default App