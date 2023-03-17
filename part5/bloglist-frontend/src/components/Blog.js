import { useState } from 'react'

const Blog = ({ blog, user, increaseLikes, removeBlog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const styleBlog = {
    'padding': 8,
    'margin': 5,
    'border': 'solid ',
    'borderWidth': 1,
  }
  const styleDetails = { display: detailsVisibility ? 'block' : 'none' }
  const styleNone = { display: 'none' }


  return (
    <div className='blog' style={styleBlog}>
      <div className='minimizedBlog'>
        {blog.title} {blog.author}
        <button className='toggleVisibility' onClick={() => { setDetailsVisibility(!detailsVisibility) }}>{detailsVisibility ? 'Hide Details' : 'Show Details'}</button>
      </div>


      <div style={styleDetails} className='details'>
        <div>Url: {blog.url}</div>
        <div>Likes: {blog.likes} <button className='likeButton' onClick={() => { increaseLikes(blog) }}>Like</button></div>
        {blog.user.username}
        <div style={user.username !== blog.user.username ? styleNone : null}>
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