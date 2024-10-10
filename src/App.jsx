import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationType('unsuccessful')
      setNotification('Wrong username or password')
      setTimeout(() => {
        setNotificationType(null)
        setNotification(null)
      }, 5000)
    }

    console.log('logging in with', username, password)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNotificationType('successful')
        setNotification(
          `Added new blog: '${returnedBlog.title}' by ${returnedBlog.author}`
        )
        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 5000)
      })
      .catch(error => {
        console.log('Post request failed', error)
        setNotificationType('unsuccessful')
        setNotification(
          `Could not add '${blogObject.title}' by ${blogObject.author}`
        )
        setTimeout(() => {
          setNotification(null)
          setNotificationType(null)
        }, 5000)
      })
  }

  const handleTitleInput = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorInput = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlInput = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogForm = () => (
    <>
      <h2>Add new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            value={newTitle}
            onChange={handleTitleInput}
          />
        </div>
        <div>
          Author:
          <input
            value={newAuthor}
            onChange={handleAuthorInput}
          />
        </div>
        <div>
          Url:
          <input
            value={newUrl}
            onChange={handleUrlInput}
          />
        </div>
        <p></p>
        <button type="submit">add</button>
      </form>
      <h2>Blogs</h2>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </>
  )

  return (
    <div>
      <Notification
        message={notification}
        type={notificationType}
      />
      {!user && loginForm()}
      {user && <div>
        <p>{user.name} logged in</p>
        <button
          onClick={() => {
            window.localStorage.clear()
            setUser(null)
          }
          }>
          logout
        </button>
        <p></p>
        {blogForm()}
      </div>
      }
    </div>
  )
}

export default App