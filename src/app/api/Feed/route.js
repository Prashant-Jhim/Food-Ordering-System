import connectDB from "../DB/mongodb"
import model from '../DB/AddProdSchema'
const bcrypt = require("bcryptjs")
import {NextRequest, NextResponse } from "next/server"

export async function POST(request,response){
    const Req = await request.json()
   console.log("i m working")
    const ConnectionToDB = await connectDB()
    const Feed = await model.find()
    console.log(Feed)

    return await NextResponse.json({status:true,Feed:Feed})
    }
    
     

