"use client"
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react';
import './global.css'
import styles from './Login.module.css'
import Link from 'next/link'
import './main.css'
import { useEffect,useState } from 'react';
const jwt = require("jsonwebtoken")
export default function Home() {
  const [type,ChangeInputType] = useState("password")
  const [property,changeproperty] = useState(false)
  const [logintext,changelogintxt] = useState("")
  const [Locksign,ChangeLockSign] = useState("✅ Show Password")
   const Router = useRouter()

   const handlegoogle = () =>{
    signIn("google")
   }
   const ChangePage = async(event) =>{
    console.log(event.target)
    if (event.target.name == "register"){
        Router.push("/register")
    }}

// Function to Check is there any User Logined or Not 
const CheckLogin = async() =>{
  const id = window.localStorage.getItem("ID")
  
 if (id != null && id != "nothing"){
  const Request = await fetch("api/idcheck",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({id})
  })
  const Response = await Request.json()
  if (Response.status == true){
    Router.push("/menu")
  }
 }
}
useEffect(()=>{
  CheckLogin()
},[])
const Login = async() =>{
  const Email = document.getElementById("Email").value 
  const Password = document.getElementById("Password").value
  console.log(Email,Password)
  
  const data = {
    Email:Email,
    Password:Password
  }
  let secret = 'qwerty';


  const Request = await fetch("/api/login",{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({Email:Email,Password:Password})
  })
  const Response = await Request.json()
  console.log(Response)
 if (Response.status == true){
  changelogintxt("Login Successfull ✅")
  changeproperty(true)
  document.getElementById(styles.Loginbtn).innerHTML = "Loading"
  window.localStorage.setItem("ID",Response.id)
  setTimeout(()=>{
    Router.push("/menu")
  },1000)
 }
 if (Response.status == false){
  changelogintxt("Login Failed ❌")
  document.getElementById("Email").style.borderBottomColor = "crimson"
  document.getElementById("Password").style.borderBottomColor="crimson"
 }
 setTimeout(() => {
  changelogintxt("")
},6000);
}

    //To Show Password
    const ShowPassword = () =>{
      const prev = Locksign
      
      if (prev == "✅ Show Password" ){
          ChangeLockSign("❌ Hide Password")
          ChangeInputType("text")
          
      }
      if (prev == "❌ Hide Password"){
          ChangeLockSign("✅ Show Password")
          ChangeInputType("password")
      }
  }



  return (
    <div id = {styles.MainContainer}>
      <title>Daves Tiffin's🥗</title>
      <div id = {styles.SecondContainer}>
        <div id = {styles.InputContainer}>
        <h1>Daves Tiffin's 🥗</h1>
          <input onKeyPress={Login} id = "Email" type="text" placeHolder="Enter The Email Address" />
          <input onKeyPress={Login} id = "Password" type={type} placeHolder = "Enter The Password" />
          <button onClick={ShowPassword} id = {styles.ShowPass}>{Locksign}</button>
          <button id = {styles.Loginbtn} disabled={property} onClick = {Login}>Login </button>
          <h2 id = {styles.loginsuccess }>{logintext}</h2>
          </div>
          
      </div>
      <button name = "register" onClick={ChangePage} id = {styles.CrtAct}>Create Account</button>
    </div>
      
  )
}
