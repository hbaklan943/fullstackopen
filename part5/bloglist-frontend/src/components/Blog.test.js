import { render } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

// eslint-disable-next-line quotes
test("blog should render the blog's title and author, but does not render its URL or number of likes", () => {

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