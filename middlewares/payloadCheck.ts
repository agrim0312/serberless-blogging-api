import { blog_schema, user_signin_schema, user_signup_schema } from "../zod/schemas";


export async function userSignupPayloadCheck(c:any,next:any){
    const body = await c.req.json();
    if(user_signup_schema.safeParse(body).success){
        await next();
    }
    return c.text("Please pass valid information!!");
}

export async function userSigninPayloadCheck(c:any,next:any){
    const body = await c.req.json();
    if(user_signin_schema.safeParse(body).success){
        await next();
    }
    return c.text("Please pass valid information!!");
}

export async function blogPayloadCheck(c:any,next:any){
    const body = await c.req.json();
    if(blog_schema.safeParse(body).success){
        console.log("If body Entered")
        await next();
    }
    return c.text("Please pass valid information!!");
}