const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response) => {
  
  if (request.body.title === undefined | request.body.url === undefined) {
    response.status(400).json()    
  }
  else {
  
    let blog = new Blog(request.body)
    
    if (request.body.likes === undefined) {    
      blog.likes = 0
    }  

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
    }
})

blogsRouter.delete('/:id', async (request, response) => {  
  await Blog.findByIdAndDelete(request.params.id)
  response.status(202).end()
})

blogsRouter.put('/:id', async (request, response) => {  
  
  console.log(request.body)
  console.log(request.params.id)

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,    
    likes: request.body.likes
  }

  console.log(blog.likes)

  console.log(await Blog.find({}))
  await Blog.findByIdAndUpdate(request.params.id, blog)
  console.log(await Blog.find({}))
  response.json(blog)  
})

module.exports = blogsRouter