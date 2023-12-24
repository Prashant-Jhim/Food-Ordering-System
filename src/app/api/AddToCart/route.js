import connectDB from "../DB/mongodb"
import model from '../DB/cartschema'
const bcrypt = require("bcryptjs")
import {NextRequest, NextResponse } from "next/server"

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req
    const date = new Date().toDateString()
    console.log(Request)
    console.log(date)
    const ConnectionToDB = await connectDB()
        const CreateDoc = await model.create({
            Customer:Request.Customer,
            Quantity:Request.Quantity,
            Name:Request.Name,
            RotiNo:Request.RotiNo,
            SabhjiNo:Request.SabhjiNo,
            SweetNo:Request.SweetNo,
            Price:Request.Price,
            Date:date
        })

        return await NextResponse.json({status:true})
    }
    
     

