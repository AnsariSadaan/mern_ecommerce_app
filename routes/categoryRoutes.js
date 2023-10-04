import express from 'express'
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js';
import { CreateCategoryController, categoryController, deletecategoryController, singlecategoryController, updateCategoryController } from '../controllers/categoryController.js';

const catRoute = express.Router();

//create category
catRoute.post('/create-category', requireSignin, isAdmin, CreateCategoryController)

// update category
catRoute.put('/update-category/:id', requireSignin, isAdmin, updateCategoryController)

// get all category
catRoute.get('/get-category', categoryController)

//single category
catRoute.get('/single-category/:slug', singlecategoryController)

//delete category

catRoute.delete('/delete-category/:id', requireSignin, isAdmin, deletecategoryController)

export default catRoute



// {
//     "success": true,
//         "message": "Login Successfully",
//             "user": {
//         "_id": "65116a899797160df1cd5607",
//             "name": "admin",
//                 "email": "admin@gmail.com",
//                     "phone": "0987654321",
//                         "address": "mumbai",
//                             "role": 1
//     },
//     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTExNmE4OTk3OTcxNjBkZjFjZDU2MDciLCJpYXQiOjE2OTU2NTc5MjgsImV4cCI6MTY5NjI2MjcyOH0.QB9B7Rl0t_DXZJvk_qyaDDmmRZ9wPvBCfbIH2_lJREg"
// }