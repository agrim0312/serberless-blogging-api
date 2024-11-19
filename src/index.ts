import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Jwt } from 'hono/utils/jwt'
import authenticateUser from '../middlewares/authentication'
import payloadChecks from "../middlewares/payloadCheck";

const {userSigninPayloadCheck,userSignupPayloadCheck,blogPayloadCheck} = payloadChecks


const app = new Hono()

const prisma = new PrismaClient().$extends(withAccelerate())

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

app.post('/users/signup',userSignupPayloadCheck,async (c) => {
  const body = await c.req.json();
  const username = body["username"];
  const password = body["password"];
  const email = body["email"];
  const user = await prisma.user.create({
    data:{
      username,
      email,
      password
    }
  })
  return c.json({
    "user":user,
  });
})

app.post('/users/signin',userSigninPayloadCheck,async (c) => {
  const body = await c.req.json();
  const username = body["username"];
  const password = body["password"];
  const user = await prisma.user.findFirst({
    where:{
      username,
      password
    }
  });
  if(user){
    const token = await Jwt.sign({username : username},"radhe-radhe")
    return c.json({
      "token":token
    });
  }
  return c.text("OOPSIE Better Luck Next Time");
})

app.get('/posts',authenticateUser,async (c) => {
  const user = c.get("user");
  const posts = await prisma.blog.findMany({
    where:{
      user:user
    }
  });
  if(posts){
    return c.json({
      "posts":posts
    })
  }
  return c.text("Posts for user is not available");
})

app.post('/posts',blogPayloadCheck,authenticateUser,async (c)=>{
  const user = c.get("user");
  const body = await c.req.json();
  const title = body['title'];
  const description = body['body'];
  try{
    const dbUser = await prisma.user.findFirst({
      where:{
        username:user["username"]
      }
    })
    const re = await prisma.blog.create({
      data:{
        title:title,
        description:description,
        userId:dbUser?.id,
      },
      select:{
        title:true,
        description:true,
        id:true
      },
    })
    return c.json({
      "title":re.title,
      "description":re.description,
      "id":re.id
    })
  }catch(e){
    console.error("Post endpoint on posting",e);
    return c.text("Something Went Wrong!!");
  }
})

app.get('/posts/:id',authenticateUser,async (c)=>{
  const postId = c.req.param('id');
  try{
    const post = await prisma.blog.findMany({
      where:{
        id:parseInt(postId),
      }
    })
    return c.json({
      post
    })
  }catch(e){
    return c.text("Something Went Wrong!!");
  }
})

app.put('/posts/:id',blogPayloadCheck,authenticateUser,async(c)=>{
  const postId = c.req.param('id');
  const body = await c.req.json();
  const title = body['title'];
  const description = body['body'];
  try{
    await prisma.blog.update({
      where:{
        id:parseInt(postId)
      },
      data:{
        title,
        description,
      }
    })
    return c.text("Blog Updated Successfully!!");
  }catch(e){
    return c.text("Something Went Wrong");
  }
})

app.delete('/posts/:id',async (c)=>{
  const postId = c.req.param('id');
  try{
    await prisma.blog.delete({
      where:{
        id:parseInt(postId)
      }
    })
    return c.text(`Post with ${postId} deleted Successfully!!`)
  }catch(e){
    return c.text("Something Went Wrong!!");
  }
})

export default app
