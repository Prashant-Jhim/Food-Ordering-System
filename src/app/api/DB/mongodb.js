const mongoose = require("mongoose")

const connectDB = () =>{
  try{
    mongoose.connect(process.env.MONGODBURL)
    console.log("Connected To Database")
  }
  catch(error){
    console.log(error)
  }
}
export default connectDB
