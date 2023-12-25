import connectDB from "../DB/mongodb"
import model from '../DB/module'
import {NextRequest, NextResponse } from "next/server"
const bcrypt = require("bcryptjs")

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req
    console.log(Request)
    const ConnectionToDB = await connectDB()
    const CreateDoc = await model.find({_id:Request.id})
   
    if (CreateDoc.length != 0){
        const Data = CreateDoc[0].Verfied
        if (Data == true){
            return await NextResponse.json({status:true})
        }
        if (Data == false){
            return await NextResponse.json({status:false})
        }
    }
    if (CreateDoc.length == 0){
        return await NextResponse.json({status:false})
    }     
}
