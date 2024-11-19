import { Hono } from "hono";
import {blogPayloadCheck} from '../middlewares/payloadCheck'
import authenticateUser from "../middlewares/authentication";
import { createPost, deletePostwithId, getAllPosts, getPostwithId, updatePostswithId } from "../controllers/postControllers";

export const postHandler = new Hono()

postHandler.get('/',authenticateUser,getAllPosts)

postHandler.post('/',blogPayloadCheck,authenticateUser,createPost)

postHandler.get('/:id',authenticateUser,getPostwithId)

postHandler.put('/:id',blogPayloadCheck,authenticateUser,updatePostswithId)

postHandler.delete('/:id',authenticateUser,deletePostwithId)