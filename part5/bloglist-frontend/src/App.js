import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import NewBlogFrom from './components/NewBlogFrom'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({ message: '', style: null })

  const sort = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => {
      return b.likes - a.likes
    })
    setBlogs(sortedBlogs)
  }

  useEffect(() => {
    blogService.getAll().then(blogs => {
      sort(blogs)
      console.log(blogs);
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
      returnedBlog.user = { username: user.username, id: user.id }
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
            <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} sort={sort} />
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

      {!user && <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />}
      {user && blogsComponent()}
      {user && <Togglable buttonLabel='New Note'>
        <NewBlogFrom createNewBlog={createNewBlog} />
      </Togglable>
      }
    </div>
  )
}

export default App