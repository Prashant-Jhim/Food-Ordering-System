import connectDB from "../DB/mongodb"
import model from '../DB/SessionSchema'
const bcrypt = require("bcryptjs")
import {NextRequest, NextResponse } from "next/server"

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req
    const docs = await model.find({Customer:Request.id})
   
    const Arr = docs
    
   
  
    if (Arr.length == 0){
        return NextResponse.json({status:false})
    }
    if (Arr.length != 0){
        return NextResponse.json({status:true,ArrofProduct:docs})
    }
}
    
     

