import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, loggedInUser }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [blogEntry, setBlogEntry] = useState(blog)
  const [detailVisible, setDetailVisible] = useState(false)

  const showWhenVisible = { display: detailVisible ? '' : 'none' }
  const isBlogOwner = loggedInUser && blogEntry.user.name === loggedInUser

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

  const handleDelete = async () => {

    console.log(`delete blog with ${blogEntry.id}`)

    try {
      if (window.confirm(`Do you really want to delete '${blogEntry.title}' by ${blogEntry.author}?`)) {
        const returnedBlog = await blogService.deleteBlog(blogEntry.id)
        console.log(`Deleted blog: '${blogEntry.title}' by ${blogEntry.author}`)
      }
    } catch (error) {
      console.error('Delete request failed', error)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='blog'>
        {blogEntry.title} {blogEntry.author} <button
          onClick={() => setDetailVisible(!detailVisible)}>
          {detailVisible ? 'hide' : 'view'}
        </button>
      </div>

      <div style={showWhenVisible} className='blog-details'>
        {blogEntry.url} <br />
        Likes: {blogEntry.likes} <button onClick={() => handleLike(blogEntry)}>like</button><br />
        {blogEntry.user.name} <br />
        <p></p>
        {isBlogOwner && (
          <button onClick={() => handleDelete()}>delete</button>
        )}
      </div>
    </div>
  )
}

export default Blog