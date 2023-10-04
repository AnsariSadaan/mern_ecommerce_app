import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";


//create category
export const CreateCategoryController = async (req, res)=>{
    try {
        const {name} = req.body
        if(!name){
            return res.status(401).send({message: "Name is required"})
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            res.status(200).send({
                success:false,
                message: "Category Already Exists"
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save()
        res.status(201).send({
            success: true,
            message: "New category Created",
            category,
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Category",
            error
        })
    }
}

//update category
export const updateCategoryController = async (req, res)=>{
    try {
        const {name} = req.body
        const {id} = req.params
        const category = await categoryModel.findByIdAndUpdate(id, {name, slug:slugify(name)}, {new:true})
        res.status(200).send({
            success: true,
            message: "Category updated Successfully",
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while updating category"
        })
    }
}


//get all category
export const categoryController = async (req, res)=>{
    try {
        const category = await categoryModel.find({})
        res.status(200).send({
            success: true,
            message: "All Categories List",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error: error.message,
            messgae: "Error while getting all category",
        })
    }
}

//single category 

export const singlecategoryController = async (req, res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            message: "get single category successfully",
            category,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            error,
            message: "Error while getting single category"
        })
    }
}

//delete category

export const deletecategoryController = async (req, res)=>{
    try {
        const {id} = req.params
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "Category Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error while deleting category",
            error
        })
    }
}