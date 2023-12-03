import mongoose ,{Schema} from "mongoose";

const OTPSchema = new Schema({
    OTP:String,
    id:String
})

const model = mongoose.models.OTP || mongoose.model("OTP",OTPSchema) 
export default model