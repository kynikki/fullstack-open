const Blog = require('../models/blog')

const initialBlogs = [
  {
    "title": "jee kissi",
    "author": "Herra Hakkarainen",
    "url": "url",
    "likes": 13,
    "id": "6409f85b3908b51d1932b5d6"
  },
  {
    "title": "Punainen Paloauto",
    "author": "Jerry Cotton",
    "url": "url2",
    "likes": 57,
    "id": "6409f8b03908b51d1932b5d8"
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})   
  return blogs.map(blog => blog.toJSON()) 
}
  
module.exports = { initialBlogs, blogsInDb }