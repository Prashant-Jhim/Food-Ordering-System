import mongoose ,{Schema} from "mongoose";

const ProductSchema = new Schema({
    Name:String,
    RotiNo:Number,
    SabhjiNo:Number,
    SweetNo:Number,
    Price:Number
})

const model = mongoose.models.Products || mongoose.model("Products",ProductSchema) 
export default model