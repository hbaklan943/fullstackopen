const dummy = (blogs) => {
  return 1
}

const sumLikes = (blogs) => {
  return blogs.reduce((accumulator, blog) => {
    return accumulator = accumulator + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  return blogs.reduce((accumulator, currentBlog) => {
    return accumulator = currentBlog.likes >= accumulator.likes
      ? currentBlog
      : accumulator
  }, { likes: 0 })
}

const favoriteAuthor = (blogs) => {
  if (blogs.length === 0) {
    return {}
  }
  const favoriteBlog = blogs.reduce((accumulator, currentBlog) => {
    return accumulator = currentBlog.likes >= accumulator.likes
      ? currentBlog
      : accumulator
  }, { likes: 0 })

  return { author: favoriteBlog.author, likes: favoriteBlog.likes }
}


module.exports = {
  dummy,
  sumLikes,
  favoriteBlog,
  favoriteAuthor
}