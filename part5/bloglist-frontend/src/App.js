import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from "./components/blogForm";

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log('wrong credentials', exception.message)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const titleChange = (event) => {
    setTitle(event.target.value)
  }

  const authorChange = (event) => {
    setAuthor(event.target.value)
  }

  const urlChange = (event) => {
    setUrl(event.target.value)
  }

  const createBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      await blogService.create(blogObject)
      setTitle('')
      setAuthor('')
      setUrl('')
      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
  } catch (e) {
    console.log(e.message)}
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)

      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })
  }, [])


  const loginForm = () => (
      <form onSubmit={handleLogin}>
        <h2>login</h2>
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
  )


  return (
    <div>

      {user === null
          ?
          loginForm()
          :
          <div>
            <h2>blogs</h2>
            <p>logged in as {user.username}</p><button type='submit' onClick={handleLogout}>log out</button>
            {blogs.map(blog =>
                <Blog key={blog.id} blog={blog} />
            )}

        <BlogForm title={title}
        author={author}
        url={url} titleChange={titleChange}
        authorChange={authorChange}
        urlChange={urlChange}
        submit={createBlog} />
          </div>}


    </div>
  )
}

export default App