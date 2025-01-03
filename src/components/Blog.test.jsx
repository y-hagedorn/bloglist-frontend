import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders only the title and author by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'test_url',
    likes: '42',
    user: { name: 'Test User' }
  }

  const { container } = render(<Blog blog={blog} loggedInUser="Test User" />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent('Component testing is done with react-testing-library')
  expect(div).toHaveTextContent('Test Author')

  const details = container.querySelector('.blog-details')
  expect(details).not.toBeVisible() // Ensures the details section is hidden by default
})