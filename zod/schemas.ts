import {z} from 'zod'

export const user_signup_schema = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string(),
})

export const user_signin_schema = z.object({
    email : z.string().email(),
    password : z.string(),
})

export const blog_schema = z.object({
    title : z.string(),
    body : z.string()
})