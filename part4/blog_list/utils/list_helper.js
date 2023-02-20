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

const mostBlogs = (blogs) => {

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
    return accumulator
  }, [{ author: '', numberOfBlogs: 0 }])


  let authorWithMostBlogs = authors[0]
  for (let i = 1; i < authors.length; i++) {
    authorWithMostBlogs = authorWithMostBlogs.numberOfBlogs > authors[i].numberOfBlogs ? authorWithMostBlogs : authors[i]
  }
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {

  let authors = []
  if (blogs.length === 0) {
    return {}
  }
  authors = blogs.reduce((accumulator, currentBlog) => {

    for (let i = 0; i < accumulator.length; i++) {
      if (currentBlog.author === accumulator[i].author) {
        accumulator[i].likes = accumulator[i].likes + currentBlog.likes
        return accumulator
      }
    }
    accumulator.push({ author: currentBlog.author, likes: currentBlog.likes })

    return accumulator
  }, [{ author: '', likes: 0 }])


  let authorWithMostLikes = authors[0]
  console.log(authors);
  for (let i = 1; i < authors.length; i++) {
    authorWithMostLikes = authorWithMostLikes.likes > authors[i].likes ? authorWithMostLikes : authors[i]
  }
  return authorWithMostLikes
}


module.exports = {
  dummy,
  sumLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}