import connectDB from "../DB/mongodb"
import model from '../DB/module'
const bcrypt = require("bcryptjs")
import {NextRequest, NextResponse } from "next/server"

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req.Details
    console.log(Request)
    const ConnectionToDB = await connectDB()
    const findfirst = await model.find({Email:Request.Email})
    if (findfirst.length == 0){
        const CreateDoc = await model.create({Name:Request.Name,Password:Request.Password,Email:Request.Email,PhoneNo:Request.PhoneNo,Verfied:false})
    console.log(CreateDoc)
        return await NextResponse.json({status:true,id:CreateDoc._id})
    }
    if (findfirst.length != 0){
        return await NextResponse.json({status:false})
    }
    
     
}
