
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, id: 1 })
  response.json(blogs)
})


blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  console.log('posting blog with body of:', request.body);
  const body = request.body
  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })

  if (!blog.title || !blog.url) {
    return response.status(400).end()
  }
  if (!blog.likes) {
    blog.likes = 0
    console.log('like count is undefined so added 0');
  }
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})


blogsRouter.put('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body
  const user = request.user
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  }

  await Blog.findByIdAndUpdate(request.params.id, newBlog)
  response.status(200).end()
})


blogsRouter.delete('/:id', middleware.tokenExtractor, async (request, response) => {
  console.log(request.params.id);
  const blogToDelete = await Blog.findById(request.params.id)
  const user = request.user
  console.log(blogToDelete.user._id.toString(), user._id.toString())

  if (blogToDelete.user._id.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
  else {
    response.status(401).json({ error: 'unauthorized deletion' })
  }
})
module.exports = blogsRouter
