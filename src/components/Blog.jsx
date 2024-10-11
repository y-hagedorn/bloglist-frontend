import { useState } from 'react'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [detailVisible, setDetailVisible] = useState(false)

  const hideWhenVisible = { display: detailVisible ? 'none' : '' }
  const showWhenVisible = { display: detailVisible ? '' : 'none' }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} <button style={hideWhenVisible} onClick={() => setDetailVisible(true)}>view</button>
      </div>

      <div style={showWhenVisible}>
        {blog.url} <br />
        Likes: {blog.likes} <button onClick={() => { }}>like</button><br />
        {blog.user.name} <br />
        <p></p>
        <button onClick={() => setDetailVisible(false)}>hide</button>
      </div>
    </div>
  )
}

export default Blog