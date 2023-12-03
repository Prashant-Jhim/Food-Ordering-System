const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://prashantjhim2023:Jhimsaab@2023@cluster0.zjm3kdr.mongodb.net/?retryWrites=true&w=majority").then(()=>{
    console.log("Connection To Database is Successfull")
}).catch((error)=>{
    console.log("Something is Wrong ")
    console.log("Following is Error : ")
    console.log(error)
})