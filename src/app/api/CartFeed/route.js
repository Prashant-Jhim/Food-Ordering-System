import connectDB from "../DB/mongodb"
import model from '../DB/cartschema'
const bcrypt = require("bcryptjs")
import {NextRequest, NextResponse } from "next/server"

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req
    console.log(Request)
    const ConnectionToDB = await connectDB()
        const Docs = await model.find({Customer:Request.id})

        return await NextResponse.json({status:true,Arr:Docs})
    }
    
     

