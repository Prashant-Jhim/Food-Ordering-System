const mongoose = require("mongoose")

const connectDB = () =>{
  try{
    mongoose.connect("mongodb+srv://prashantjhim2023:jhimsaab2021@cluster0.zjm3kdr.mongodb.net/?retryWrites=true&w=majority")
    console.log("Connected To Database")
  }
  catch(error){
    console.log(error)
  }
}
export default connectDB
