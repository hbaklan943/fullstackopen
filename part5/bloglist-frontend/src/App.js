import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogFrom from './components/NewBlogFrom'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', style: null })

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      setNotification({
        message: `Successful login`,
        style: 'positive'
      })
      setTimeout(() => {
        setNotification({ message: '', style: null })
      }, 5000);
    } catch (error) {
      setNotification({
        message: `Invalid username or password`,
        style: 'negative'
      })
      setTimeout(() => {
        setNotification({ message: '', style: null })
      }, 5000);
    }
  }

  const createNewBlog = async (newBlog) => {
    try {
      const returnedBlog = await blogService.create(newBlog)
      returnedBlog.user = { username: user.username }
      setBlogs(blogs.concat(returnedBlog))
      setNotification({
        message: `A new blog ${newBlog.title} by ${newBlog.author} has been added`,
        style: 'positive'
      })
      setTimeout(() => {
        setNotification({ message: '', style: null })
      }, 5000);
    } catch (error) {
      setNotification({
        message: `Invalid blog`,
        style: 'negative'
      })
      setTimeout(() => {
        setNotification({ message: '', style: null })
      }, 5000);
    }

  }

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          Username:
          <input type='text' name='Username' value={username} onChange={({ target }) => { setUsername(target.value) }}></input>
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
        logged in as {user.username}
        <button onClick={() => {
          setUser(null)
          window.localStorage.removeItem('loggedBlogAppUser')
        }}>Log out</button>

        <h2>Blogs</h2>
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
      {notification.message !== ''
        ? <Notification notification={notification} />
        : false}

      {!user && loginForm()}
      {user && blogsComponent()}
      {user && <Togglable buttonLabel='New Note'>
        <NewBlogFrom createNewBlog={createNewBlog} />
      </Togglable>
      }
    </div>
  )
}

export default App