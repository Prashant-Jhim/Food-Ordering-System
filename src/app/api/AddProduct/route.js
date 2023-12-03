import connectDB from "../DB/mongodb"
import model from '../DB/AddProdSchema'
const bcrypt = require("bcryptjs")
import {NextRequest, NextResponse } from "next/server"

export async function POST(request,response){
    const Req = await request.json()
    const Request = Req
    console.log(Request)
    const ConnectionToDB = await connectDB()
        const CreateDoc = await model.create({
            Name:Request.Name,
            RotiNo:Request.RotiNo,
            SabhjiNo:Request.SabhjiNo,
            SweetNo:Request.SweetNo,
            Price:Request.Price})

        return await NextResponse.json({status:true})
    }
    
     

