import mongoose ,{Schema} from "mongoose";

const CartSchema = new Schema({
    Customer:String,
    Quantity:Number,
    Price:Number ,
    Name:String,
    RotiNo:Number,
    SabhjiNo:Number,
    SweetNo:Number
})

const model = mongoose.models.Cart || mongoose.model("Cart",CartSchema) 
export default model