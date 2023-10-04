import express from 'express'
import { isAdmin, requireSignin } from '../middleware/authMiddleware.js'
import { 
    braintreePaymentController, 
    braintreeTokenController, 
    createProductCotroller, 
    deleteProductController, 
    filterProductController, 
    getProductController, 
    getSingleProductController, 
    productCategoryController, 
    productCountController, 
    productListController, 
    productPhotoController, 
    relatedProductController, 
    searchProductController, 
    updateProductCotroller } from '../controllers/productController.js'
import formidable from 'express-formidable'

const productRoute = express.Router()

//routes
//add products
productRoute.post('/create-product', requireSignin, isAdmin, formidable(), createProductCotroller)

//update products
productRoute.put('/update-product/:pid', requireSignin, isAdmin, formidable(), updateProductCotroller)

//get products
productRoute.get('/get-product', getProductController);

//single product
productRoute.get('/get-product/:slug', getSingleProductController);

//get product photo
productRoute.get('/product-photo/:pid', productPhotoController)

//delete product
productRoute.delete('/delete-product/:pid', deleteProductController)

//product filter route
productRoute.post('/product-filters', filterProductController)


//product count
productRoute.get('/product-count', productCountController)

//product per page
productRoute.get('/product-list/:page', productListController)

//search product
productRoute.get('/search/:keyword', searchProductController)

//similar product
productRoute.get('/related-product/:pid/:cid', relatedProductController)

//category wise product
productRoute.get('/product-category/:slug', productCategoryController)

//payments routes
//token
productRoute.get('/braintree/token', braintreeTokenController)

// payments
productRoute.post('/braintree/payment', requireSignin, braintreePaymentController)



export default productRoute