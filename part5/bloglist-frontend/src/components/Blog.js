import { useState } from "react"

const Blog = ({ blog }) => {
  const [detailsVisibility, setDetailsVisibility] = useState(false)
  const styleBlog = {
    "padding": 8,
    "margin": 5,
    "border": "solid ",
    "borderWidth": 1,
  }
  const styleDetails = { display: detailsVisibility ? 'none' : '' }


  return (
    <div style={styleBlog}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => { setDetailsVisibility(!detailsVisibility) }}>{detailsVisibility ? 'Show Details' : 'Hide Details'}</button>
      </div>
      <div style={styleDetails}>
        <div>Url: {blog.url}</div>
        <div>Likes: {blog.likes}</div>
        {blog.user.username}
      </div>

    </div >
  )

}

export default Blog