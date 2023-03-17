const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const api = supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
})

test('identifier is "id", not "_id"', async () => {
  const response = await api.get('/api/blogs')  
  expect(response.body[0].id).toBeDefined()
})

test('a blog can be added to bloglist', async () => {
  
  const newBlog = {
    title: 'Skissimirri',
    author: 'Michael Scott',
    url: 'urliii',
    likes: 59,
    id: '6409f85b3908b51d1932g6df'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')  
  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('Skissimirri')
})

test('if likes is not defined it will be 0', async () => {
  const newBlog = {
    title: 'jepulis',
    author: 'Seppo Markkanen',
    url: 'urliii22'    
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)    
  
  const response = await api.get('/api/blogs')    
  const addedBlog = response.body.find(b => b.title === "jepulis")  
  expect(addedBlog.likes).toBe(0)
})

test('title or url is not defined, response status is 400', async () => {
  const newBlog = {    
    title: "Jade Smith",
    author: 'Chris Rock',    
    likes: 11    
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400) 
})

test('blog deletion is possible', async () => {
  const blogsAtStart = await helper.blogsInDb()  
  const blogToDelete = blogsAtStart[0]  

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(202)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
})

test('blog gets one more like', async () => {

  const blogsAtStart = await helper.blogsInDb() 
  const updatedBlog = {...blogsAtStart[0], likes: blogsAtStart[0].likes + 1}
  console.log(blogsAtStart[0])
  console.log(updatedBlog)  
  
  await api
    .put(`/api/blogs/${blogsAtStart[0].id}`)
    .send(updatedBlog)
    .expect(200)
    
  const blogsAtEnd = await helper.blogsInDb()  

  expect(blogsAtEnd[0].likes).toBe(helper.initialBlogs[0].likes + 1)  
})

afterAll(async () => {
  await mongoose.connection.close()
})