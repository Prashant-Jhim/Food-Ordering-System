"use client"
import { useRouter } from 'next/navigation'
import {useState} from "react"
import styles from './register.module.css'
import Link from 'next/link'

import { passwordStrength } from 'check-password-strength'

const validator = require("email-validator")
const bcrypt = require("bcryptjs")


export default function Home() {
    const [Locksign,ChangeLockSign] = useState("✅ Show Password")
    const [allClear,ChangeAllClear] = useState({Email:false,Password:false,Matched:false,Phone:false})
   // ALl The Prechecks to check before register
   const [PhoneNoCheck,ChangePhoneNoCheck] = useState(false)
   const [EmailChecker,ChangeEmailChecker] = useState(false)
   const [MatchChecker,ChangeMatchChecker] = useState(false)
   const [StrengthChecker,ChangeStrengthChecker] = useState(false)
   
   
    const [TypeOfInput,ChangeInputType] = useState("password")
    const [PassSt,ChangeStr] = useState("")
    const [MatchOrNot,ChangeMatchOrNot] = useState("")
    const Router = useRouter()
    const ChangePage = async(event) =>{
       
        if (event.target.name == "Login"){
            Router.push("/")
        }
    }
    //To Check Email is Valid or Not 
    const EmailValid = async() =>{
        const EmailObj = allClear
        const email = document.getElementById("email").value
       if (email.length != 0){
        const validornot = validator.validate(email)
        if (validornot == true){
            ChangeEmailChecker(true)
            document.getElementById("email").style.borderBottomColor="green"

            const Request = await fetch("/api/find",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({Email:email})
               })
               const Response = await Request.json()
               if (Response.status == true){
                document.getElementById("email").style.borderBottomColor = "green"
               }
               if (Response.status == false){
                document.getElementById("email").style.borderBottomColor="crimson"
               }
        }
        if (validornot == false){
            ChangeEmailChecker(false)
            document.getElementById("email").style.borderBottomColor="crimson"
        }
       }
       if (email.length == 0){
        ChangeEmailChecker(false)
        document.getElementById("email").style.borderBottomColor="black"
       }
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
    //To Compare The Password is Matching or not 
    const MatchPassword = () =>{
        const PassObj = allClear
        const Pass1 = document.getElementById("pass1").value 
        const Pass2 = document.getElementById("pass2").value 
        if (Pass2.length != 0){
            if (Pass1 != Pass2){
                ChangeMatchChecker(false)
                ChangeMatchOrNot("Not Matched")
                document.getElementById(styles.Labelformatch).style.color = "crimson"
                document.getElementById("pass2").style.borderBottomColor = "crimson"
            }
            if (Pass1 == Pass2){
                ChangeMatchChecker(true)
                ChangeMatchOrNot("Matched")
                document.getElementById(styles.Labelformatch).style.color = "green"
                document.getElementById("pass2").style.borderBottomColor = "green"
            }
        }
        if (Pass2.length == 0){
            ChangeMatchOrNot("")
            ChangeMatchChecker(false)
            document.getElementById(styles.Labelformatch).style.color = "black"
            document.getElementById("pass2").style.borderBottomColor = 'black'
        }
    }

    // Phone Number Checker
    const PhoneNoChk = () =>{ 
        const PhoneObj = allClear
        const ifval = document.getElementById("PhoneNumberinput").value 
        if (ifval.length == 0 ){
            PhoneObj.Phone = true 
            ChangeAllClear()
            ChangePhoneNoCheck(false)
            document.getElementById("PhoneNumberinput").style.borderBottomColor = "black"
        }
        if (ifval.length != 10 && ifval.length != 0){
            ChangePhoneNoCheck(false)
            document.getElementById("PhoneNumberinput").style.borderBottomColor = "crimson"
        }
        if (ifval.length != 0 && ifval.length == 10){
            const No = parseInt(ifval)
        const Check =  Number.isInteger(No)
        if (Check == true){
           ChangePhoneNoCheck(true)
        document.getElementById("PhoneNumberinput").style.borderBottomColor = "green"
        }
        if (Check == false){
           ChangePhoneNoCheck(false)
            document.getElementById("PhoneNumberinput").style.borderBottomColor = "crimson"
        }
        }
    }

    //To Register The Details 
    const RegisterManual = async ( )=>{
        const hashed = bcrypt.hashSync(document.getElementById("pass1").value,10)
        const  Details = {
            Name : document.getElementById("Name").value ,
            Email:document.getElementById("email").value ,
            PhoneNo:document.getElementById("PhoneNumberinput").value ,
            Password:hashed
        }
        PhoneNoChk()
        EmailValid()
        MatchPassword()
        
        

        if (StrengthChecker == true && MatchChecker == true && PhoneNoCheck == true && EmailChecker == true){
            const Request = await fetch("/api/register", {method:"POST",
        headers:{
            "Content-Type":"application/json"
        }
        ,body:JSON.stringify({
            Details
        })
        })
        const Response = await Request.json()
       
        if (Response.status == true){
           
            const Email = document.getElementById("email").value
            const password = hashed
            const Details1 = {
                Email:Email,
                Name:Details.Name,
                id:Response.id
            }
            const Request = await fetch("/api/email",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({Details1})
            })
            const Response2 = await Request.json()
           
            Router.push("/otp/"+Response.id)
            
            
        }
        if (Response.status == false){
            alert("Something Went Wrong")
        }
        }
        else{
            alert("Something Went Wrong")
        }
        
        
    }
    // To Check Password Strength
    const PasswordStrength = ()=>{
        const value = document.getElementById("pass1").value
        if (value.length != 0){
            const passstr = passwordStrength(value).value
        ChangeStr(passstr)
        if (passstr == "Too weak" || passstr == "Weak"){
            document.getElementById(styles.Labelforpass).style.color="crimson"
            document.getElementById("pass1").style.borderBottomColor="crimson"
            ChangeStrengthChecker(false)
        }
        if (passstr == "Medium"){
            ChangeStrengthChecker(true)
        document.getElementById(styles.Labelforpass).style.color="#FFA500"
        document.getElementById("pass1").style.borderBottomColor="#FFA500"
        }
        if (passstr == "Strong"){
           ChangeStrengthChecker(true)
            document.getElementById(styles.Labelforpass).style.color="green"
        document.getElementById("pass1").style.borderBottomColor="green"
        
        }
        MatchPassword()

    }
        
        if (value.length == 0){
            ChangeStr("")
            
            document.getElementById("pass1").style.borderBottomColor= "black"
        }
    }
  return (
    <div id = {styles.MainContainer}>
      <title>Daves Tiffin's🥗</title>
      <div id = {styles.SecondContainer}>
        <div id = {styles.InputContainer}>
        <h1>Daves Tiffin's 🥗</h1>
        <input  id = "Name" type="text" placeHolder="Enter The Name" />
          <input onChange={EmailValid} id = "email" type="text" placeHolder="Enter The Email Address" />
          <input id = "PhoneNumberinput" onChange = {PhoneNoChk} type = "text" placeHolder="Enter The Phone Number"/>
          <input onChange={PasswordStrength} id = "pass1" type={TypeOfInput} placeHolder = "Enter The Password" />
          <label id = {styles.Labelforpass}>{PassSt}</label>
          <input onChange={MatchPassword} id = "pass2" type = {TypeOfInput} placeHolder="Confirm The Password"/>
          <label id = {styles.Labelformatch}>{MatchOrNot}</label>
          <button onClick={ShowPassword} id = {styles.ShowPass} >{Locksign}</button>
          <button id = {styles.Loginbtn} onClick={RegisterManual}>Register </button>
          <button name = "Login" onClick = {ChangePage} id = {styles.CrtAct}>Login</button>
          </div>
          
      </div>
      
    </div>
      
  )
}
