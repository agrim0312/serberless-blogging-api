import { Hono } from "hono"
import {userSigninPayloadCheck, userSignupPayloadCheck } from '../middlewares/payloadCheck'
import { userSignin, userSignup } from "../controllers/usersControllers"


export const userHandler = new Hono()

//user routes
userHandler.post('/signup',userSignupPayloadCheck,userSignup)

userHandler.post('/signin',userSigninPayloadCheck,userSignin)

