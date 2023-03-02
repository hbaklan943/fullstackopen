const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: 'first blog',
    author: 'somebody',
    url: 'www.example.com',
    user: "6400d901de53fd18fe45e465",
    likes: 12,
  },
  {
    title: 'second blog',
    author: 'some aouthor',
    url: 'www.example.com',
    user: "6400d901de53fd18fe45e465",
    likes: 8
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}


module.exports = {
  blogsInDb, initialBlogs
}