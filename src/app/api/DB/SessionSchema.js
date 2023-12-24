import mongoose ,{Schema} from "mongoose";

const SessionSchema = new Schema({
    Customer:String,
    Session:String,
    Purchase:Boolean,
    ArrofProduct:Array,
    Date:String,
    Time:String
})

const model = mongoose.models.Session || mongoose.model("Session",SessionSchema) 
export default model