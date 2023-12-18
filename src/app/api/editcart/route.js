import connectDB from "../DB/mongodb"
import model from '../DB/cartschema'
const bcrypt = require("bcryptjs")
import {NextRequest, NextResponse } from "next/server"

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req
    const ConnectionToDB = await connectDB()
    console.log(Request)
    if (Request.Type == "Edit"){
        const Update = await model.updateOne({_id:Request.id},{$set:{Quantity:Request.Quantity}})
        return await NextResponse.json({status:true})
    }
    if (Request.Type == "Delete"){
        const Delete = await model.deleteOne({_id:Request.id})
        return await NextResponse.json({status:true})
    }
    

        
    }
    
     

