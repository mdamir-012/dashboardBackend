const {Router} = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { employeeModel } = require("../models/employee.model");
require("dotenv").config()




const employeeController = Router();

// read using get 
employeeController.get("/read", async(req,res)=>{
    const employeesData= await employeeModel.find({userId: req.body.userId});
    res.send(employeesData)
})


// add data using post
employeeController.post("/create", async(req,res)=>{
    const {firstName,lastName,email,department,salary,userId} =req.body;

    const employeesData= new employeeModel({
        firstName,
        lastName,
        email,
        department,
        salary,
        userId
    });
    try{
        await employeesData.save();
        res.json({msg:"employee added"})
    }
    catch(err){
        console.log(err)
        res.json({msg:"something went wrong"})
    }
})

// delete data using delete method
employeeController.delete("/delete/:id", async(req,res)=>{
    const {id}= req.params;
    const employeeDataDelete = await employeeModel.findByIdAndDelete({_id:id})
    res.send("deleted successfully")
})


// edit using patch method
employeeController.patch("/edit/:id", async(req,res)=>{
    const {id}= req.params;
    const updateData = await employeeModel.findByIdAndUpdate({_id:id,userId:req.body.userId}, {...req.body})
    if(updateData){
        res.send("edit successfully")
    }else{
        res.send("not update")
    }
    
})


// here are all functionalities implemented on this route "/"
employeeController.get("/", async (req, res) => {
    let {  sortBy, order, pageSize, limit, q } =
      req.query;
  
    // getting data by search
    const search = q;
    if (search) {
      const regex = new RegExp(search, "i");
  
      const employeeData = await employeeModel.find({
        $or: [
          { firstName: regex }
        ],
      });
  
      res.status(200).json({ status: "All searched data", data: employeeData });
      console.log(employeeData);
    }
  
    // Pagination funcionality
    const skipDatas = (pageSize - 1) * limit;
  
    if (pageSize && limit && order && sortBy) {
      const product = await productModel
        .find()
        .skip(skipDatas)
        .limit(limit)
        .sort({ [sortBy]: order === "asc" ? 1 : -1 });
  
      res.json({ status: "here is limited products on page", data: product });
    } else if (pageSize && limit) {
      //   pagination with limit
      const products = await productModel.find().skip(skipDatas).limit(limit);
      res.json({ status: "success", data: products });
    } 
});



module.exports = {employeeController}