import express from 'express';
import { registerController, loginController, testController, forgotPasswordController, updateProfilecontroller, getOrdersController, getAllOrdersController, orderStatusController } from '../controllers/authController.js'
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';
//router object
const routerAuth = express.Router()

//routing
//REGISTER || METHOD POST
routerAuth.post('/register', registerController)

//LOGIN || METHOD POST 
routerAuth.post('/login', loginController)

//Forgot password

routerAuth.post('/forgot-password', forgotPasswordController)

//test foe token verification
routerAuth.get('/test', requireSignin, isAdmin, testController)

//protected user routes
routerAuth.get('/user-auth', requireSignin , (req,res)=>{
    res.status(200).send({ok: true}); 
})

//protect admin routes

routerAuth.get('/admin-auth', requireSignin, isAdmin, (req, res)=>{
    res.status(200).send({ok: true});
})

//update user profile
routerAuth.put('/profile', requireSignin, updateProfilecontroller)

//orders 
routerAuth.get('/orders', requireSignin, getOrdersController)

//all orders 
routerAuth.get('/all-orders', requireSignin, isAdmin, getAllOrdersController)

//orders status update
routerAuth.put('/order-status/:orderId', requireSignin, isAdmin, orderStatusController) 


export default routerAuth;


