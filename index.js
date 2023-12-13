const express = require("express");
const { connection } = require("./config/db");
const { userController } = require("./routes/user.route");
const { authentication } = require("./middlewares/authentication");
const { employeeController } = require("./routes/employee.route");
const app=express();

app.use(express.json());

app.get("/", (req,res)=>{
    res.json({message:"api working"})
})


app.use("/user", userController);
app.use(authentication)
app.use("/dashboard", employeeController)

app.listen(8000, async()=>{
    try{
        await connection;
        console.log("connected to mongodb")
    }
    catch(err){
        console.log("error while connecting")
        console.log(err)
    }
    console.log(`listening on port 8000`)
})