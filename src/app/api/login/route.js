import connectDB from "../DB/mongodb"
import model from '../DB/module'
import {NextRequest, NextResponse } from "next/server"

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req
    console.log(Request)
    const ConnectionToDB = await connectDB()
    const CreateDoc = await model.find({Email:Request.Email})
    const Response =  NextResponse.next()
    Response.cookies.set("jwt","Prashant")
    Response.json({status:true})
    return await Response
     
}
