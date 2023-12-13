const mongoose = require("mongoose");

const employeeSchema = mongoose.Schema({
    firstName: {type: String, required:true},
    lastName: {type: String, required:true},
    email: {type:String, required:true},
    department: {type:String, required:true},
    salary : {type:String, required:true},
    userId: {type:String,required:true}
})

const employeeModel = mongoose.model("employee",employeeSchema);

module.exports = {employeeModel}