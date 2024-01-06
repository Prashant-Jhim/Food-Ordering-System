"use client"
import '../global.css'
import Styles from './page.module.css'
import {useState,useEffect} from 'react'
import { useRouter } from 'next/navigation'
const AboutUs = () =>{
    const router = useRouter()
    const imgsrc = "https://res.cloudinary.com/prashant-jhim/image/upload/f_auto,q_auto/bwngyudz8uroooc62zdd"
    const [CartNo,ChangeCartNo] = useState(0)
    const [Enable,ChangeEnable] = useState(0)
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
    // Function to Check is there any User Logined or Not 
const CheckLogin = async() =>{
    const id = window.localStorage.getItem("ID")
    console.log(id)
   if (id != null){
    const Request = await fetch("api/idcheck",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({id})
    })
    const Response = await Request.json()
    if (Response.status == true){
      
    }
   }
   if (id == null){
    router.push('/')
   }
  }

  useEffect(()=>{
    CheckLogin()
  },[])

      // Function to go to cart 
    const GoToCart = () =>{
        router.push("/cart")
    }

    // Function to go to profile page 
    const gotoprofile = () =>{
        router.push('/profile')
    }
    const gotoMenu = () =>{
        router.push("/menu")
    }


   
    // Function To Logout User 
    const Logout = () =>{
        window.localStorage.removeItem("ID")
        router.push("/")
    }
    return (
        <div id = {Styles.MainDiv}>
             <div id = {Styles.MenuDiv}>
            <h1>Daves Tiffin's 🥗</h1>
                <button onClick={closeoropen} id = {Styles.Options}>Options</button>
               <div id = {Styles.Buttons}>
               <button onClick={gotoMenu} >Menu📋</button>
               <button id = {Styles.AboutBtn}>About Us🏪</button>
               <button onClick={gotoprofile}>Profile</button>
                <button onClick={GoToCart} >Cart[{CartNo}]🛒 </button>
                <button onClick = {Logout}>Logout</button>
               </div>
            </div>

            <div id = {Styles.Datadiv}>
                <img src = {imgsrc} />
                <div id = {Styles.DetailsDiv}>
                    <h1>Prashant Jhim👨🏻‍💻</h1>
                    <p>I am fullstack self-taught developer based in toronto canada</p>
                    <p>I started learning coding journey in pandemic year 2020 in which learn HTML CSS javascript React and expressjs nextjs and i fall in love with it</p>
                    <p>Then i moved to canada for further studies and i opted computer system technican diploma at Humber College</p>
                    <p>To learn more about networking side of development </p>
                    <a href = "https://www.instagram.com/prashant_jhim/?hl=en">Link To Instagram</a>
                    <a href = "https://github.com/Prashant-Jhim?tab=repositories">Link To GitHub</a>
                </div>
            </div>
        </div>
    )
}
export default AboutUs