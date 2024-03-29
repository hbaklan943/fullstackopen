const mongoose = require('mongoose')
const { describe } = require('node:test')
const listHelper = require('../utils/list_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('delete requests', () => {
  test('should respond with 204 no content', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log(blogToDelete);

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnVuIiwiaWQiOiI2NDAwZDkwMWRlNTNmZDE4ZmU0NWU0NjUiLCJpYXQiOjE2Nzc3NzcxODAsImV4cCI6MTY3Nzc4MDc4MH0.vxdUnCQ_KKyrScU7uurZueRxlN0b33GtvKAxGZThzzI')
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1)

    const ids = blogsAtEnd.map(blog => blog.id)
    expect(ids).not.toContain(blogToDelete.id)

  })
})

describe('posting blog with missing title or url properties', () => {
  test('should respond with 400 bad request', async () => {
    const blogWithMissingTitle = {
      author: "new author",
      url: "www.example.com",
    }
    await api
      .post('/api/blogs')
      .send(blogWithMissingTitle)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('should respond with 400 bad request', async () => {
    const blogWithMissingUrl = {
      title: 'new title',
      author: "new author",
    }
    await api
      .post('/api/blogs')
      .send(blogWithMissingUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('posting blog without likes count', () => {
  test('should have like count of 0', async () => {
    const blogWithoutLikes = {
      title: "new blog",
      author: "new author",
      url: "www.example.com",
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnVuIiwiaWQiOiI2NDAwZDkwMWRlNTNmZDE4ZmU0NWU0NjUiLCJpYXQiOjE2Nzc3NzcxODAsImV4cCI6MTY3Nzc4MDc4MH0.vxdUnCQ_KKyrScU7uurZueRxlN0b33GtvKAxGZThzzI')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
  })
})

describe('successfull post request', () => {
  test('successfull post request', async () => {
    const blogToPost = {
      title: "new blog",
      author: "new author",
      url: "www.example.com",
      likes: 92
    }
    await api
      .post('/api/blogs')
      .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnVuIiwiaWQiOiI2NDAwZDkwMWRlNTNmZDE4ZmU0NWU0NjUiLCJpYXQiOjE2Nzc3NzcxODAsImV4cCI6MTY3Nzc4MDc4MH0.vxdUnCQ_KKyrScU7uurZueRxlN0b33GtvKAxGZThzzI')
      .send(blogToPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(await helper.blogsInDb()).toHaveLength(helper.initialBlogs.length + 1)

  })
})

describe('posting a new blog with missing token', () => {
  test('should be responded with 401 Unauthorized', async () => {
    const blogToPost = {
      title: "new blog",
      author: "new author",
      url: "www.example.com",
      likes: 92
    }
    await api
      .post('/api/blogs')
      .set('Authorization', '')
      .send(blogToPost)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(await helper.blogsInDb()).toHaveLength(helper.initialBlogs.length)

  })
})

describe('unique identifier property of the blog posts is named id', () => {
  test('if id property is defined', async () => {
    const blogs = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)


    blogs.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })

  })
})

describe('supertest get request', () => {
  test('supertest get req test', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})
describe('dummy', () => {
  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
  })
})


describe('total', () => {
  test('should return total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
    const result = listHelper.sumLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})


describe('favorite', () => {
  test('should return favorite blog', () => {
    const listWithBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      }
    ]
    const result = listHelper.favoriteBlog(listWithBlogs)

    expect(result).toEqual({
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12
    })
  })
})


describe('most blogs', () => {
  test('should return author with most blogs', () => {
    const listWithBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      },
      {
        title: "My title",
        author: "Me",
        likes: 32
      },
      {
        title: "My title1",
        author: "Me",
        likes: 3
      },
      {
        title: "My title2",
        author: "Me",
        likes: 12
      },
      {
        title: "My title3",
        author: "Me",
        likes: 2
      }
    ]


    const result = listHelper.mostBlogs(listWithBlogs)
    expect(result).toEqual({ author: "Me", numberOfBlogs: 4 })
  })
})


describe('most blogs', () => {
  test('should return the athor with the most likes', () => {
    const listWithBlogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      },
      {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        likes: 12
      },
      {
        title: "My title",
        author: "Me",
        likes: 32
      },
      {
        title: "My title1",
        author: "Me",
        likes: 3
      },
      {
        title: "My title2",
        author: "Me",
        likes: 12
      },
      {
        title: "My title3",
        author: "Me",
        likes: 2
      }
    ]
    const result = listHelper.mostLikes(listWithBlogs)
    expect(result).toEqual({ author: "Me", likes: 49 })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})