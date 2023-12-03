"use client"
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react';

import styles from './Login.module.css'
import Link from 'next/link'
import './main.css'
export default function Home() {
   const Router = useRouter()

   const handlegoogle = () =>{
    signIn("google")
   }
   const ChangePage = async(event) =>{
    console.log(event.target)
    if (event.target.name == "register"){
        Router.push("/register")
    }

    


}
const Login = async() =>{
  const Email = document.getElementById("Email").value 
  const Password = document.getElementById("Password").value
  console.log(Email,Password)
  const Request = await fetch("/api/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({Email:Email,Password:Password})
  })
  const Response = await Request.json()
  console.log(Response)
}
  return (
    <div id = {styles.MainContainer}>
      <title>Daves Tiffin's🥗</title>
      <div id = {styles.SecondContainer}>
        <div id = {styles.InputContainer}>
        <h1>Daves Tiffin's 🥗</h1>
          <input id = "Email" type="text" placeHolder="Enter The Email Address" />
          <input id = "Password" type="password" placeHolder = "Enter The Password" />
          <button id = {styles.Loginbtn} onClick = {Login}>Login </button>
          <button name = "register" onClick={ChangePage} id = {styles.CrtAct}>Create Account</button>
          </div>
          
      </div>
      
    </div>
      
  )
}
