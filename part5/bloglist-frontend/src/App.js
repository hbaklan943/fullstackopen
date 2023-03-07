import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
    setUser(user)
    blogService.setToken(user.token)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log('user token is', user.token);
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      console.log(user);
    } catch (error) {
      console.log('Invalid username or password');
    }
  }

  const handleNewForm = async (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url,
    }
    try {
      const returnedBlog = await blogService.create(newBlog)
      setBlogs(blogs.concat(returnedBlog))
    } catch (error) {
      console.log(error)
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

  const newBlogForm = () => {
    return (
      <form onSubmit={handleNewForm}>
        <h2>Add New Blog</h2>
        <div>Title:
          <input type='text' name='Title' value={title} onChange={({ target }) => { setTitle(target.value) }}></input>
        </div>
        <div>Author:
          <input type='text' name='Author' value={author} onChange={({ target }) => { setAuthor(target.value) }}></input>
        </div>
        <div>Url:
          <input type='text' name='Url' value={url} onChange={({ target }) => { setUrl(target.value) }}></input>
        </div>
        <button type='submit'>Create</button>
      </form>
    )
  }

  return (
    <div>
      {!user && loginForm()}
      {user && blogsComponent()}
      {user && newBlogForm()}
    </div>
  )
}

export default App