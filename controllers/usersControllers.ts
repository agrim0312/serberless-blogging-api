import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { Jwt } from "hono/utils/jwt";


const prisma = new PrismaClient().$extends(withAccelerate())

export async function userSignup (c:any) {
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
}

export async function userSignin(c:any) {
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
}

