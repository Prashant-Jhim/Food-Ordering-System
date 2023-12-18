import connectDB from "../DB/mongodb"
import model from '../DB/module'
const bcrypt = require("bcryptjs")
import {NextRequest, NextResponse } from "next/server"

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req
    console.log(Request)
    const ConnectionToDB = await connectDB()
    if (Request.type == "edit"){
        const update = await model.updateOne({_id:Request.id},{$set:{Name:Request.Name,Email:Request.Email,PhoneNo:Request.PhoneNo,Password:Request.Password}})
        return NextResponse.json({status:true})
    }
    if (Request.type == "delete"){
        const del = await model.deleteOne({_id:Request.id})
        return NextResponse.json({status:true})
    }
    
     
}
