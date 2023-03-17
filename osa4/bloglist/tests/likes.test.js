const totalLikes = require('../utils/list_helper').totalLikes

  const blogs = [
    {
      title: "Punainen Paloauto",
      author: "Jerry Cotton",
      url: "url2",
      likes: 57
    },
    {
      title: "Keltainen Paloauto",
      author: "Kalle Kukkonen",
      url: "url3",
      likes: 13
    },
    {
      title: "Sininen Paloauto",
      author: "The Rock",
      url: "url4",
      likes: 30
    }
  ] 

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

describe('total', () => {
  test('sum of the likes of blogs is', () => {
    expect(totalLikes(blogs)).toBe(100)
  })
  
  test('when list has only one blog equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
})