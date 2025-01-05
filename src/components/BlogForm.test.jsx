import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Togglable from './Togglable'
import BlogForm from './BlogForm'

test('new blog form calls the event handler it received as props with the right details when a new blog is created', async () => {

  const createBlog = vi.fn()

  const { container } = render(
    <Togglable buttonLabel="Add new blog">
      <BlogForm createBlog={createBlog} />
    </Togglable>
  )

  const user = userEvent.setup()
  const button = screen.getByText('Add new blog')
  await user.click(button)

  const titleInput = container.querySelector('#title-input')
  const authorInput = container.querySelector('#author-input')
  const urlInput = container.querySelector('#url-input')

  const sendButton = screen.getByText('add')

  await user.type(titleInput, 'Test Blog')
  await user.type(authorInput, 'Test Author')
  await user.type(urlInput, 'http://test-url.com')

  // Submit the form
  await user.click(sendButton)

  // Assert the createBlog function was called once
  expect(createBlog).toHaveBeenCalledTimes(1)

  // Assert the arguments passed to createBlog are correct
  expect(createBlog).toHaveBeenCalledWith({
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test-url.com',
  })
})
