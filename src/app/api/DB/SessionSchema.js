import mongoose ,{Schema} from "mongoose";

const SessionSchema = new Schema({
    Customer:String,
    Session:String,
    ArrofProduct:Array
})

const model = mongoose.models.Session || mongoose.model("Session",SessionSchema) 
export default model