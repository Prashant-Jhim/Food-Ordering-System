"use client"
import { useParams } from 'next/navigation'
import styles from './otp.module.css'
import { useRouter } from 'next/navigation'


const otp = () =>{
    const params  = useParams()
    const router = useRouter()
    // Function to Check Whether OTP is Correct or Not
    const CheckOTP = async () =>{
        const id = params.id 
        const otptosent = document.getElementById("OTP").value 
        const Details = {
            id:id,
            otp:otptosent
        }
        const Request = await fetch("/api/OTPVerify",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({Details})
        })
        const Response = await Request.json()
        if (Response.status == true){
            alert("OTP is Correct")
            const NewRequest = await fetch("/api/UserVerifed",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id :id})
            })
            const NewResponse = await NewRequest.json()
            if (NewResponse.status == true){
                router.push("/menu")
            }

        }

        if (Response.status == false ){
            alert("OTP is incorrect")
        }
    }
    //Function To Delete Previous OTP and Generate New One
    const Resend = async() =>{
        const id = params.id 
        
        const Details = {id :id}
        const Request = await fetch("/api/ResendOTP",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({Details})
        })
        const Response = await Request.json()
      
        const Details1 = {
            id:id,
            Name:Response.Details.Name,
            Email:Response.Details.Email
        }
        const NewReq = await fetch('/api/email',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({Details1})
        })
        const NewRes = await NewReq.json()
       
    }
    // Function To Goback to Register page
    const BackToRegister = () =>{
      
        router.push("/register")
    }
    return (

        <div id = {styles.Main}>
            <button onClick={BackToRegister} id = {styles.Back}>👈Back</button>
            <h1>Daves Tiffin's 🥗</h1>
            <input id = "OTP" type = "text" placeholder = "Enter The OTP" / >
            <button id = {styles.Check} onClick = {CheckOTP}>Check✅</button>
            <button id = {styles.Resend} onClick = {Resend}>Resend</button>
        </div>
    )

}
export default otp