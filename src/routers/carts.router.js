import {Router} from 'express'
import {getIdController, postController, postIdController} from '../controllers/carts.controller.js'


export const cartsRouter = Router()
cartsRouter.get('/:cid', getIdController)
cartsRouter.post('/',  postController)
cartsRouter.post('/:cid/product/:id',  postIdController)