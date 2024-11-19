import { Jwt } from "hono/utils/jwt";

export default async function authenticateUser(c:any,next:any){
    try{
        const token = c.req.header('authorization').split(" ")[1];
        await Jwt.verify(token,"radhe-radhe");
        const user = Jwt.decode(token).payload;
        c.set('user',user);
        await next();
    }catch(e){
        return c.text("Unauthorized Acessing");
    }
}