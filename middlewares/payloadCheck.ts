import {z} from 'zod'

async function userSignupPayloadCheck(c:any,next:any){
    const body = await c.req.json();
    const user_signup_schema = z.object({
        username : z.string(),
        email : z.string().email(),
        password : z.string(),
    })
    if(user_signup_schema.safeParse(body).success){
        await next();
    }
    return c.text("Please pass valid information!!");
}

async function userSigninPayloadCheck(c:any,next:any){
    const body = await c.req.json();
    const user_signup_schema = z.object({
        email : z.string().email(),
        password : z.string(),
    })
    if(user_signup_schema.safeParse(body).success){
        await next();
    }
    return c.text("Please pass valid information!!");
}

async function blogPayloadCheck(c:any,next:any){
    const body = await c.req.json();
    const blog_schema = z.object({
        title : z.string(),
        body : z.string()
    })
    if(blog_schema.safeParse(body).success){
        console.log("If body Entered")
        await next();
    }
    return c.text("Please pass valid information!!");
}


export default { userSignupPayloadCheck, userSigninPayloadCheck, blogPayloadCheck };