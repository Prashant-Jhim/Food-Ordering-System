import connectDB from "../DB/mongodb"
import model from '../DB/cartschema'
import model2 from '../DB/SessionSchema'
const bcrypt = require("bcryptjs")
import {NextRequest, NextResponse } from "next/server"

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req
    console.log(Request)
    const ConnectionToDB = await connectDB()
        const Docs = await model.deleteMany({Customer:Request.id})

        const docs2 = await model2.updateOne({Session:Request.Session},{$set:{Purchase:true}})
        return await NextResponse.json({status:true})
    }
    
     

