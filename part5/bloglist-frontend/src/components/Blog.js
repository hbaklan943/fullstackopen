import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs, sort, user }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const styleBlog = {
    "padding": 8,
    "margin": 5,
    "border": "solid ",
    "borderWidth": 1,
  }
  const styleDetails = { display: detailsVisibility ? '' : 'none' }
  const styleNone = { display: 'none' }

  const increaseLikes = async (blog) => {
    console.log(blog);
    const blogObject = {
      _id: blog.id,
      user: {
        _id: blog.user.id,
        username: blog.user.username,
      },
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    setBlogs(blogs.map((b) => {
      if (b.id === blog.id) {
        blog.likes++
        return blog
      }
      else return b
    }))

    try {
      await blogService.update(blog.id, blogObject)
      sort(blogs)
    } catch (error) {
      console.log(error);
    }
  }

  const removeBlog = async (blog) => {
    try {
      await blogService.remove(blog.id)
      const newBlogs = [...blogs]
      newBlogs.splice(blogs.indexOf(blog), 1)
      setBlogs(newBlogs)
    } catch (error) {
      console.log(error);
    }

  }



  return (
    <div style={styleBlog}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => { setDetailsVisibility(!detailsVisibility) }}>{detailsVisibility ? 'Hide Details' : 'Show Details'}</button>
      </div>
      <div style={styleDetails}>
        <div>Url: {blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={() => { increaseLikes(blog) }}>like</button></div>
        {blog.user.username}
        <div style={user.id !== blog.user.id ? styleNone : null}>
          <button onClick={() => {
            window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)
              ? removeBlog(blog)
              : console.log('not confirmed')
          }}>remove</button>
        </div>
      </div>


    </div >
  )

}

export default Blog