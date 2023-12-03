import connectDB from "../DB/mongodb"
import model from '../DB/module'
import {NextRequest, NextResponse } from "next/server"

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req
    console.log(Request)
    const ConnectionToDB = await connectDB()
    const CreateDoc = await model.find({Email:Request.Email})
    if (CreateDoc.length == 0){
     return await NextResponse.json({status:true})
    }
    if (CreateDoc.length != 0){
        return await NextResponse.json({status:false})
    }
     
}
