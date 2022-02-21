const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user")

blogsRouter.get("/", async(request, response, next) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
    const blog = await Blog.findById(request.params.id)
    response.json(blog)
})

blogsRouter.post("/", async(request, response, next) => {
  const body = request.body

  const user = await User.findById(body.userId)

  const blog = new Blog({...body, user: user._id});
  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
});

blogsRouter.delete('/:id', async (request, response) => {
    const deletedBlog = await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async(request, response) => {

    const body = request.body

    const blog = {
        ...body
    }

    const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedNote)
})


module.exports = blogsRouter;
