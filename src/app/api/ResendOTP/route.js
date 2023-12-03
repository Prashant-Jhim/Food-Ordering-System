import model from '../DB/otpmodule'
import usermodel from '../DB/module'
import { NextResponse } from 'next/server'
import connectDB from "../DB/mongodb"

const bcrypt = require("bcryptjs")
export async function POST(request,response){
    const Req = await request.json()
    const Request = Req.Details
    
    const ConnectionToDB = await connectDB()
    const FindOTPDataDeleteIT = await model.deleteMany({id:Request.id})
    

    const UserDB = await usermodel.find({_id:Request.id})
    const Userdata = UserDB[0]
    const Details = {
        Name:Userdata.Name,
        Email:Userdata.Email
    }
    return NextResponse.json({status:true,Details:Details})
}