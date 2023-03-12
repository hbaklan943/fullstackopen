import React from 'react'
import { useState } from 'react'

export default function NewBlogFrom({ createNewBlog }) {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title,
      author,
      url
    }
    setAuthor('')
    setTitle('')
    setUrl('')
    createNewBlog(newBlog)
  }



  return (
    <form onSubmit={handleNewBlog}>
      <h2>Add New Blog</h2>
      <div>Title:
        <input type='text' name='Title' value={title} onChange={({ target }) => { setTitle(target.value) }}></input>
      </div>
      <div>Author:
        <input type='text' name='Author' value={author} onChange={({ target }) => { setAuthor(target.value) }}></input>
      </div>
      <div>Url:
        <input type='text' name='Url' value={url} onChange={({ target }) => { setUrl(target.value) }}></input>
      </div>
      <button className='submitButton' type='submit'>Create</button>
    </form>
  )
}
