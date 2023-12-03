import mongoose ,{Schema} from "mongoose";

const RegisterSchema = new Schema({
    Name:String,
    Email:String,
    PhoneNo:String,
    Password:String,
    Verfied:Boolean
})

const model = mongoose.models.User || mongoose.model("User",RegisterSchema) 
export default model