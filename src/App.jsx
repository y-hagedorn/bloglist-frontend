import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import './index.css'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [notificationType, setNotificationType] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs(blogs)
      )
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

  const addBlog = (blogObject) => {
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
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
        <Togglable buttonLabel="Add new blog">
          <BlogForm createBlog={addBlog} />
        </Togglable>
        <h2>Blogs</h2>
        <div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
      </div>
      }
    </div>
  )
}

export default App