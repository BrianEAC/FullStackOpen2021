const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app)
const Blog = require("../models/blog")
const initialBlogs = [
    {
        title: 'book1',
        author: 'author1'
    },
    {
        title: 'book2',
        author: 'author2'
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get("/api/blogs/")
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('a blog can be added', async () => {

    const newBlog = {
        title: 'book3',
        author: 'true'
    }
    await api
        .post('/api/blogs/')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)

    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(titles).toContain('book3')


})

afterAll(() => {
    mongoose.connection.close()
})