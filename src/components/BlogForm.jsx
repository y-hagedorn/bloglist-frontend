const BlogForm = ({
  handleSubmit,
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  title,
  author,
  url

}) => {
  return (
    <div>
      <h2>Add new Blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title:
          <input
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author:
          <input
            value={author}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url:
          <input
            value={url}
            onChange={handleUrlChange}
          />
        </div>
        <p></p>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm