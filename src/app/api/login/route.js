import connectDB from "../DB/mongodb"
import model from '../DB/module'
import {NextRequest, NextResponse } from "next/server"
const bcrypt = require("bcryptjs")

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req
    console.log(Request)
    const ConnectionToDB = await connectDB()
    const CreateDoc = await model.find({Email:Request.Email})
    if (CreateDoc.length != 0){
    const data = CreateDoc[0]
    const Password = data.Password 
    const id = data._id
    const Compare = await bcrypt.compare(Request.Password, Password)
    return await NextResponse.json({status:Compare,id:id})
    }
    if (CreateDoc.length == 0){
        return await NextResponse.json({status:false})
    }     
}