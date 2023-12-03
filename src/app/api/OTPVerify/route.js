import model from '../DB/otpmodule'
import { NextResponse } from 'next/server'
import connectDB from "../DB/mongodb"
const bcrypt = require("bcryptjs")
export async function POST(request,response){
    const Req = await request.json()
    const Request = Req.Details
    const otp = Request.otp 
    console.log(Request)
    const ConnectionToDB = await connectDB()
    const FindOTPData = await model.find({id:Request.id})
    const OtpStored = FindOTPData[0].OTP
    console.log(OtpStored)
    const compare = await bcrypt.compare(otp,OtpStored)
    console.log(compare)
    return NextResponse.json({status:compare})
}