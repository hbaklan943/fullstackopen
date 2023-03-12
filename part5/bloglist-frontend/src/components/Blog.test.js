import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('blog component', () => {
  test('should render the blog\'s title and author, but does not render its URL or number of likes', () => {
    const blog = {
      title: 'title',
      url: 'url',
      author: 'author',
      likes: 5,
      user: { username: 'user' }
    }
    const user = {
      username: 'user'
    }
    const container = render(<Blog blog={blog} user={user} />).container
    const minimizedBlogDiv = container.querySelector('.minimizedBlog')
    const detailsDiv = container.querySelector('.details')

    expect(minimizedBlogDiv).toHaveTextContent('title author')
    expect(detailsDiv).toHaveStyle({ display: 'none' })
  })
})


describe('blog\'s URL and number of likes', () => {
  test('should be shown when the button controlling the shown details has been clicked', async () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 5,
      user: { username: 'user' }
    }
    const blogsUser = {
      username: 'user'
    }
    const container = render(<Blog blog={blog} user={blogsUser} />).container
    const detailsDiv = container.querySelector('.details')
    const user = userEvent.setup()
    const button = container.querySelector('.toggleVisibility')
    await user.click(button)


    expect(detailsDiv).toHaveStyle({ display: 'block' })

  })
})


describe('like handler function', () => {
  test('should be called twice when the like button clicked twice', async () => {
    const blog = {
      title: 'title',
      author: 'author',
      url: 'url',
      likes: 5,
      user: { username: 'user' }
    }
    const blogsUser = {
      username: 'user'
    }
    const mockHandler = jest.fn()
    const container = render(<Blog blog={blog} user={blogsUser} increaseLikes={mockHandler} />).container
    const user = userEvent.setup()
    const likeButton = container.querySelector('.likeButton')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)


  })
})
