const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  
  let sum = 0
  blogs.map(blog => {
    sum = sum + blog.likes
  })
  return sum  
}

const favoriteBlog = (blogs) => {
  
  let favoriteBlog = blogs[0]

  blogs.map(blog => {
    if (blog.likes > favoriteBlog.likes) {
      favoriteBlog = blog
    }
  })  
  return favoriteBlog  
}

const mostBlogs = (blogs) => {
  // Create an array for all the bloggers
  let bloggers = []

  blogs.map(blog => {
    // Check if the bloggers is already added to the blogger array and
    // add if it doesn't exists yet
    if (!bloggers.find(bloggers => blog.author === bloggers.author)) {
      bloggers.push( {author: blog.author, blogs: 1} )
    }
    // If the blogger is already added to the array, update the number of blogs
    else {
      updated_author = bloggers.findIndex((blogger => blogger.author === blog.author))      
      bloggers[updated_author].blogs = bloggers[updated_author].blogs + 1
    }
  })
  
  const busyAuthor = bloggers.reduce(
    (prev, current) => {
      return prev.blogs > current.blogs ? prev : current
    }
  )  
  return busyAuthor
}

const mostLikes = (blogs) => {

  const mostLiked = blogs.reduce(({sums,most}, {likes, author}) => {
    sums[author] = likes = (sums[author] || 0) + likes;
    if (likes > most.likes) most = {author,likes};
      return {sums,most};
  }, {sums: {}, most: {likes:0} })
  .most;

  return mostLiked
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes  
}