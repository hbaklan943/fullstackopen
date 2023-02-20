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

const authorWithMostBlogs = (blogs) => {

  let authors = []
  if (blogs.length === 0) {
    return {}
  }
  authors = blogs.reduce((accumulator, currentBlog) => {

    for (let i = 0; i < accumulator.length; i++) {
      if (currentBlog.author === accumulator[i].author) {
        accumulator[i].numberOfBlogs++
        return accumulator
      }
    }
    accumulator.push({ author: currentBlog.author, numberOfBlogs: 1 })
    console.log(accumulator);
    return accumulator
  }, [{ author: '', numberOfBlogs: 0 }])


  let authorWithMostBlogs = authors[0]
  for (let i = 1; i < authors.length; i++) {
    authorWithMostBlogs = authorWithMostBlogs.numberOfBlogs > authors[i].numberOfBlogs ? authorWithMostBlogs : authors[i]
  }
  return authorWithMostBlogs
}


module.exports = {
  dummy,
  sumLikes,
  favoriteBlog,
  authorWithMostBlogs
}