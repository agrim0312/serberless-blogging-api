import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

const prisma = new PrismaClient().$extends(withAccelerate())

export async function getAllPosts (c:any) {
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
}

export async function createPost(c:any) {
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
}

export async function getPostwithId (c:any) {
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
}

export async function updatePostswithId(c:any) {
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
}

export async function deletePostwithId (c:any) {
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
}