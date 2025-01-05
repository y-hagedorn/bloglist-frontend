import { useState } from 'react'

const BlogForm = ({ createBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  return (
    <div>
      <h2>Add new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            value={newTitle}
            id='title-input'
            onChange={event => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          Author:
          <input
            value={newAuthor}
            id='author-input'
            onChange={event => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          Url:
          <input
            value={newUrl}
            id='url-input'
            onChange={event => setNewUrl(event.target.value)}
          />
        </div>
        <p></p>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm