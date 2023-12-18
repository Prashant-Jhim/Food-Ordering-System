
import {NextRequest, NextResponse } from "next/server"
import model from '../DB/SessionSchema'
const stripe = require("stripe")(process.env.STRIPEAPISERVER)
export async function POST(request,response){
    const Req = await request.json()
    const ArrofProducts = Req.Cartfeed
     const lineItems = ArrofProducts.map((Product)=>({
        price_data:{
            currency:"cad",
            product_data:{
                name:Product.Name
            },
            unit_amount:Product.Price * 100,
        },
        quantity:Product.Quantity
     }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/SuccessPayment",
        cancel_url:"http://localhost:3000/cart"
    })
    

    const docs = await model.create({
        Customer:Req.id ,
        Session:session.id ,
        ArrofProduct:ArrofProducts
    })

    return NextResponse.json({status:true,id:session.id})
}
