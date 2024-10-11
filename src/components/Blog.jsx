import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogEntry, setBlogEntry] = useState(blog)
  const [detailVisible, setDetailVisible] = useState(false)

  const hideWhenVisible = { display: detailVisible ? 'none' : '' }
  const showWhenVisible = { display: detailVisible ? '' : 'none' }

  const handleLike = async () => {
    const updatedBlog = {
      user: blogEntry.user.id,
      likes: blogEntry.likes + 1,
      author: blogEntry.author,
      title: blogEntry.title,
      url: blogEntry.url
    }

    console.log('Update blog with id:', blogEntry.id)

    try {
      const returnedBlog = await blogService.update(blogEntry.id, updatedBlog)
      console.log(`Liked blog: '${returnedBlog.title}' by ${returnedBlog.author}`)
      setBlogEntry(returnedBlog)
    } catch (error) {
      console.error('Put request failed', error)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blogEntry.title} {blogEntry.author} <button style={hideWhenVisible} onClick={() => setDetailVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible}>
        {blogEntry.url} <br />
        Likes: {blogEntry.likes} <button onClick={() => handleLike(blogEntry)}>like</button><br />
        {blogEntry.user.name} <br />
        <p></p>
        <button onClick={() => setDetailVisible(false)}>hide</button>
      </div>
    </div>
  )
}

export default Blog