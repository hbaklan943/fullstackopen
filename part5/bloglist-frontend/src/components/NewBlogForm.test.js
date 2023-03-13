import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import userEvent from '@testing-library/user-event'
import NewBlogFrom from './NewBlogFrom'

describe('form', () => {
  test('should call the event handler it received as prop with the right details', async () => {
    const mockHandler = jest.fn()
    const container = render(<NewBlogFrom createNewBlog={mockHandler} />).container
    const user = userEvent.setup()
    const button = container.querySelector('.submitButton')
    await user.click(button)
    screen.debug()

    expect(mockHandler.mock.calls).toHaveLength(1)
  })
})