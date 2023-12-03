"use client"
import { useRouter } from 'next/navigation'
import {useState} from "react"
import styles from './register.module.css'
import Link from 'next/link'
import '../Main.css'
import { passwordStrength } from 'check-password-strength'
const validator = require("email-validator")
const bcrypt = require("bcryptjs")


export default function Home() {
    const [Locksign,ChangeLockSign] = useState("✅ Show Password")
    const [TypeOfInput,ChangeInputType] = useState("password")
    const [PassSt,ChangeStr] = useState("")
    const [MatchOrNot,ChangeMatchOrNot] = useState("")
    const Router = useRouter()
    const ChangePage = async(event) =>{
        console.log(event.target)
        if (event.target.name == "Login"){
            Router.push("/")
        }
    }
    //To Check Email is Valid or Not 
    const EmailValid = () =>{
        const email = document.getElementById("email").value
       if (email.length != 0){
        const validornot = validator.validate(email)
        if (validornot == true){
            document.getElementById("email").style.borderBottomColor="green"
        }
        if (validornot == false){
            document.getElementById("email").style.borderBottomColor="crimson"
        }
       }
       if (email.length == 0){
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
        const Pass1 = document.getElementById("pass1").value 
        const Pass2 = document.getElementById("pass2").value 
        if (Pass2.length != 0){
            if (Pass1 != Pass2){
                ChangeMatchOrNot("Not Matched")
                document.getElementById(styles.Labelformatch).style.color = "crimson"
                document.getElementById("pass2").style.borderBottomColor = "crimson"
            }
            if (Pass1 == Pass2){
                ChangeMatchOrNot("Matched")
                document.getElementById(styles.Labelformatch).style.color = "green"
                document.getElementById("pass2").style.borderBottomColor = "green"
            }
        }
        if (Pass2.length == 0){
            ChangeMatchOrNot("")
            document.getElementById(styles.Labelformatch).style.color = "black"
            document.getElementById("pass2").style.borderBottomColor = 'black'
        }
    }

    // Phone Number Checker
    const PhoneNoChk = (event) =>{
        if (event.target.value.length == 0){
            document.getElementById("PhoneNumberinput").style.borderBottomColor = "black"
        }
        if (event.target.value.length != 10 && event.target.value.length != 0){
            document.getElementById("PhoneNumberinput").style.borderBottomColor = "crimson"
        }
        if (event.target.value.length != 0 && event.target.value.length == 10){
            const No = parseInt(event.target.value)
        const Check =  Number.isInteger(No)
        if (Check == true){
        document.getElementById("PhoneNumberinput").style.borderBottomColor = "green"
        }
        if (Check == false){
            document.getElementById("PhoneNumberinput").style.borderBottomColor = "crimson"
        }
        }
    }

    //To Register The Details 
    const RegisterManual = ( )=>{
        const hashed = bcrypt.hashSync(document.getElementById("pass1").value,10)
        const  Details = {
            Name : document.getElementById("Name").value ,
            Email:document.getElementById("email").value ,
            PhoneNo:document.getElementById("PhoneNumberinput").value ,
            Password:hashed
        }
        console.log(Details)
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
        }
        if (passstr == "Medium"){
        document.getElementById(styles.Labelforpass).style.color="#FFA500"
        document.getElementById("pass1").style.borderBottomColor="#FFA500"
        }
        if (passstr == "Strong"){
            document.getElementById(styles.Labelforpass).style.color="green"
        document.getElementById("pass1").style.borderBottomColor="green"
        
        }

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
