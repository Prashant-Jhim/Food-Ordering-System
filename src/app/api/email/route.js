import { NextRequest,NextResponse } from "next/server"
import model from '../DB/otpmodule'
import connectDB from "../DB/mongodb"
const bcrypt = require("bcryptjs")
export async function POST(request,response){
    const req = await request.json()
    const Request = req
    console.log(Request)

    const Name = Request.Name
    // OTP Generator
    var OTP = ""
    for (let i = 0 ; i <= 5 ;i++){
        const no = Math.floor(Math.random()*10 )
        OTP += String(no)
    }
    console.log(OTP)
    console.log(Request)
    const ConnectionToDB = await connectDB()
   const HashedOTP = bcrypt.hashSync(OTP,10)

   // To Search Database for previous OTPs 
   const FindOTP = await model.find({id:Request.id})
   if (FindOTP.length == 0){
     //To Send OTP in Database
     const saveOTP = await model.create({OTP:HashedOTP,id:Request.id})
   }
   if (FindOTP.length != 0){
    const DelOTP = await model.deleteMany({id:Request.id})
    const saveOTP = await model.create({OTP:HashedOTP,id:Request.id})
   }
   
    
    const sgMail = require('@sendgrid/mail')
    sgMail.setApiKey(process.env.SENDGRIDAPI)
    const msg = {
      to: Request.Email, // Change to your recipient
      from: 'prashantjhim2023@gmail.com', // Change to your verified sender
      subject: `OTP For ${Name} is ${OTP}`,
      text: 'OTP',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:50px auto;width:70%;padding:20px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Tiffin Service</a>
        </div>
        <p style="font-size:1.1em">Hi,</p>
        <p>Thank you for choosing Tiffin Service. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes</p>
        <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
        <p style="font-size:0.9em;">Regards,<br />Tiffin Service</p>
        <hr style="border:none;border-top:1px solid #eee" />
        <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
          <p>Tiffin Service</p>
          <p>Prashant Jhim</p>
          <p>Canada</p>
        </div>
      </div>
    </div>`,
    }
   const mail = await  sgMail.send(msg)
   return await NextResponse.json({status:true,mail:mail})
   

      
}
