import { Hono } from 'hono'
import { userHandler } from '../routers/usersRoutes'
import { postHandler } from '../routers/postsRoutes'


const app = new Hono()

app.get('/', (c) => {
  return c.json({
    "POST /users/signup - ":"User registration",
    "POST /users/signin - ":"User login",
    "GET /posts": "Retrieve all blog posts.",
    "POST /posts": "Create a new blog post.",
    "GET /posts/:id": "Retrieve a single blog post by ID",
    "PUT /posts/:id": "Update a blog post by ID",
    "DELETE /posts/:id":"Delete a blog post by ID"
  })
})

//user routes
app.route('/users', userHandler)

//posts routes
app.route('/posts',postHandler)

export default app
