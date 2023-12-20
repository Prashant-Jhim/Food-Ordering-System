"use client"
import '../global.css'
import Styles from './profile.module.css'
import {useState,useEffect} from "react"
import { useRouter } from 'next/navigation'
import { passwordStrength } from 'check-password-strength'
const bcrypt = require("bcryptjs")
const validate = require("email-validator")
const Profile = () =>{
    const router = useRouter()
    const [CartNo,ChangeCartNo] = useState(0)
    const [Enable,ChangeEnable] = useState(0)
    const [Details,ChangeDetails] = useState({
        Name:"",
        Email:"",
        PhoneNO:"",
        Password:"**********"
    })

    // Function to Check User is Valid
     // To Check User is Logined or Not 
     const CheckLogin = async() =>{
        const id = window.localStorage.getItem("ID")
       if (id != null && id != "nothing"){
        const Request = await fetch("api/idcheck",{
          method:"POST",
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify({id})
        })
        const Response = await Request.json()

       
        if (Response.status == false){
          router.push("/")
        }
        if (Response.status == true){
             // To Get All User Details
        const Req = await fetch("/api/FullDetails",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:id})
        })
        const Res = await Req.json()
        const Arr = Res.Arr[0]
        const NewDetails = {
            Name:Arr.Name,
            Email:Arr.Email,
            Password:Arr.Password,
            PhoneNo:Arr.PhoneNo
        }
        ChangeDetails(NewDetails)
            CartFeed()
        }
       }
       if (id == null){
        router.push("/")
       }
       if (id == "nothing"){
        router.push("/")
       }
      }

    // Function To Fetch CartDetails of User 
    const CartFeed = async()=>{
        const id = window.localStorage.getItem("ID")
        const Request = await fetch("/api/CartFeed",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:id})
        })
        const Response = await Request.json()
        ChangeCartNo(Response.Arr.length)
       

    }
    // Function to Find Particular Email is in Use 
    const EmailCheck = async() =>{
        const email = document.getElementById("Email").value
        if (email.length != 0){
         const validornot = validate.validate(email)
         if (validornot == true){
             
             document.getElementById("Email").style.borderBottomColor="green"
 
             const Request = await fetch("/api/find",{
                 method:"POST",
                 headers:{
                     "Content-Type":"application/json"
                 },
                 body:JSON.stringify({Email:email})
                })
                const Response = await Request.json()
                if (Response.status == true){
                 document.getElementById("Email").style.borderBottomColor = "green"
                 return true
                }
                if (Response.status == false){
                 document.getElementById("Email").style.borderBottomColor="crimson"
                 return false
                }
         }
         if (validornot == false){
             
             document.getElementById("Email").style.borderBottomColor="crimson"
             return false
         }
        }
        if (email.length == 0){
         
         document.getElementById("Email").style.borderBottomColor="black"
        }
    }
    // Function to Check phone no is valid 
    const PhoneCheck = () =>{
        const value = document.getElementById("PhoneNo").value
        const Number = isNaN(value)
        console.log(Number)
        if (Number == false){
            if (value.length != 0 && value.length == 10){
                document.getElementById("PhoneNo").style.borderBottomColor="green"
                return true
            }
            if (value.length != 0 ) {
                if (value.length >= 10){
                    document.getElementById("PhoneNo").style.borderBottomColor="crimson"
                    return false
                }
                if (value.length <= 10){
                    document.getElementById("PhoneNo").style.borderBottomColor="crimson"
                    return false
                }
            }
            if (value.length == 0){
                document.getElementById("PhoneNo").style.borderBottomColor="crimson" 
                  
            }
        }
        if (Number == true){
            document.getElementById("PhoneNo").style.borderBottomColor="crimson"
            return false
        }
    }
     // To Check Password Strength
     const PasswordStrength = ()=>{
        const value = document.getElementById("Password").value
        if (value.length != 0){
            const passstr = passwordStrength(value).value
            console.log(passstr)
      
        if (passstr == "Too weak" || passstr == "Weak"){
           document.getElementById("Password").style.borderBottomColor="crimson"
            return false
        }
        if (passstr == "Medium"){
            
        document.getElementById("Password").style.borderBottomColor="#FFA500"
        return true
        }
        if (passstr == "Strong"){
          document.getElementById("Password").style.borderBottomColor="green"
          return true
        }
        

    }
}
    // Function to Edit or Delete Account 
    const EditOrDel = async(event) =>{
        const id = window.localStorage.getItem("ID")
        const PassValue = document.getElementById("Password").value
        const hashed = bcrypt.hashSync(document.getElementById("Password").value,10)
        const Details2 = {
            id :id,
            Name:document.getElementById("Name").value,
            Email:document.getElementById("Email").value ,
            PhoneNo:document.getElementById("PhoneNo").value,
            Password:hashed
        }


        const type = event.target.name 
        console.log(type)
        console.log(Details)
        console.log(Details2)
        if (type == "edit"){
            window.localStorage.setItem("type","edit")
            const PhoneNoCheck = PhoneCheck()
            const EmailIDCheck = await EmailCheck()
            const PasswordStr = PasswordStrength()
            console.log(PhoneNoCheck)
                if (Details2.Name == ""){
                    window.localStorage.setItem("Name",Details.Name)
                }
                if (Details2.Name != ""){
                    window.localStorage.setItem("Name",Details2.Name)
                }
                if (Details2.Email == ""){
                    window.localStorage.setItem("Email",Details.Email)
                }
                if (Details2.Email != ""){
                    console.log(EmailIDCheck)
                    if (EmailIDCheck != false){
                        window.localStorage.setItem("Email",Details2.Email)
                    }
                    if (EmailIDCheck == false){
                        window.localStorage.setItem("Email",Details.Email)
                    }
                }
                
                if (Details2.PhoneNo != ""){
                    if (PhoneNoCheck != false){
                        window.localStorage.setItem("PhoneNo",Details2.PhoneNo)
                    }
                    if (PhoneNoCheck == false){
                        window.localStorage.setItem("PhoneNo",Details.PhoneNo)
                    }
                    
                }
                if (Details2.PhoneNo == ""){
                    window.localStorage.setItem("PhoneNo",Details.PhoneNo)
                }
                if (PhoneNoCheck == false){
                    window.localStorage.setItem("PhoneNo",Details.PhoneNo)
                }

                if (PassValue != ""){
                   if (PasswordStr != false){
                    window.localStorage.setItem("Password",Details2.Password)
                   }
                   if (PasswordStr == false){
                    window.localStorage.setItem("Password",Details.Password)
                   }
                }
                if (PassValue == ""){
                    window.localStorage.setItem("Password",Details.Password)
                }
                const DetailsToSend = {
                    id : window.localStorage.getItem("ID"),
                    Name:window.localStorage.getItem("Name"),
                    Email:window.localStorage.getItem("Email"),
                    Password:window.localStorage.getItem("Password")
                }
                console.log(DetailsToSend)
                const Request = await fetch("/api/email",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(DetailsToSend)
                })
                const Response = await Request.json()
                if (Response.status == true){
                    router.push("/otp/" + id)
                }
                
        }
        if (type == "delete"){
            
                window.localStorage.setItem("type","delete")
                window.localStorage.setItem("ID",id)
                const DetailsToSend = {
                    id : window.localStorage.getItem("ID"),
                    Name:window.localStorage.getItem("Name"),
                    Email:window.localStorage.getItem("Email")
                }
                console.log(DetailsToSend)
                const Request = await fetch("/api/email",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify(DetailsToSend)
                })
                const Response = await Request.json()
                if (Response.status == true){
                    router.push("/otp/" + id)
                }
            
        }
    }
    useEffect(()=>{
        CheckLogin()
    })
     // Function to Open or Close menu Options Parts
     const closeoropen = () =>{
        const value = document.getElementById(Styles.Options).innerHTML
        if (value == "Options" && Enable == 0){
         document.getElementById(Styles.Options).innerHTML = "Close"
         document.getElementById(Styles.Buttons).style.display = "flex"
         ChangeEnable(1)
        }
        if (value == "Close" && Enable == 0){
         document.getElementById(Styles.Options).innerHTML = "Options"
         document.getElementById(Styles.Buttons).style.display = "none"
         ChangeEnable(1)
        }
        console.log("ok i m working")
        ChangeEnable(0)
     }
      // Function To Logout User 
    const Logout = () =>{
        window.localStorage.setItem("ID","nothing")
        router.push("/")
    }
      // Function to go to cart 
    const GoToCart = () =>{
        router.push("/cart")
    }

    // Function to go to profile page 
    const gotomenu = () =>{
        router.push('/menu')
    }
     // Function to go to AboutUs 
     const BackToAbout = () =>{
        router.push("/AboutUs")
    }
    return (
        <div id = {Styles.Maindiv}>
            <div id = {Styles.MenuDiv}>
            <h1>Daves Tiffin's 🥗</h1>
                <button onClick={closeoropen} id = {Styles.Options}>Options</button>
               <div id = {Styles.Buttons}>
               <button onClick={gotomenu} >Menu📋</button>
               <button onClick = {BackToAbout}>About Us🏪</button>
               <button id = {Styles.ProfBtn}>Profile</button>
                <button onClick={GoToCart} >Cart[{CartNo}]🛒 </button>
                <button onClick = {Logout}>Logout</button>
               </div>
            </div>


            <div id = {Styles.DetailsDiv}>
                <h1>📋 Details</h1>
                <label>Name</label>
                <input id = "Name" type="text" placeholder={Details.Name} />
                <label>Email</label>
                <input onChange={EmailCheck} id = "Email" type="text" placeholder={Details.Email} />
                <label>Phone Number</label>
                <input onChange = {PhoneCheck} id = "PhoneNo" type="text" placeholder={Details.PhoneNo}/>
                <label>Password</label>
                <input onChange={PasswordStrength} id = "Password" type="text" placeholder="**********" />
                <div id = {Styles.SaveOrDel}>
                    <button onClick={EditOrDel} name = "edit" id = {Styles.SaveBtn}>Save</button>
                    <button onClick={EditOrDel} name = "delete" id = {Styles.DelBtn}>Delete Account</button>
                </div>
            </div>
        </div>
    )
}
export default Profile