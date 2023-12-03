"use client"

import { useState,useEffect } from 'react'
import Styles from './menu.module.css'
import styles from './card.module.css'
import { useRouter } from 'next/navigation'
const menu = () =>{
    const router = useRouter()
    const [CartNo,ChangeCartNo] = useState(0)
    const [Enable,ChangeEnable] = useState(0)

    // Function To Fetch The Feed of Tiffin Products 
    const Feed = async() =>{
        const Request = await fetch("/api/Feed",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({})
        })
        const Response = await Request.json()
        console.log(Response)
        ChangeArrofProduct(Response.Feed)
    }

    useEffect(()=>{
        Feed()
    },[])
    // Arr of Products Card 
    const [ArrOfProduct,ChangeArrofProduct] = useState([])
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

    

    // Card Component 
    const Card = (props) =>{
        const img = "https://www.theglobeandmail.com/resizer/W68FdYu7lxsGsmzFYaagk9K3TG0=/arc-anglerfish-tgam-prod-tgam/public/ZHFLWK75OZB4TJM45XR627PU5I"

        
        // Function to Add in Cart 
    const AddToCart = () =>{
        const Details = props
    }
    // To Change Cart No
    const CartNoChange = () =>{
        const value = document.getElementById("Number").value 
        if (value == ""){
            const no = CartNo + 1
            ChangeCartNo(no)
        }
        if (value != ""){
            const No = parseInt(value) + CartNo
            console.log(No)
        ChangeCartNo(No)
        }
    }
    return (
        <div id = {styles.MainDiv}>
            <img id = {styles.Img} src={img} / >
                <div id = {styles.SecondContainer}>
                    <h1>{props.Name}🍱</h1>
                    <h3>Details :</h3>
                    <p> 🫓 {props.RotiNo} Roti</p>
                    <p>🍲 {props.SabhjiNo} sabhji</p>
                    <p>🍨 {props.SweetNo} sweet per week</p>
                    <h2>💵 ${props.Price} / month</h2>
                    <div id = {styles.QuantityTag}>
                            <label>Quantity : </label>
                            <input id = "Number" type="number" placeholder="1"/>
                        </div>
                    <button onClick = {CartNoChange}>
                        Select
                    </button>
                </div>
        </div>
    )
    }
    // Function to go to cart 
    const GoToCart = () =>{
        router.push("/cart")
    }
    return (
        <div id = {Styles.Maindiv}>
            <div id = {Styles.MenuDiv}>
            <h1>Daves Tiffin's 🥗</h1>
                <button onClick={closeoropen} id = {Styles.Options}>Options</button>
               <div id = {Styles.Buttons}>
               <button>Menu📋</button>
               <button>About Us🏪</button>
                <button onClick={GoToCart} >Cart[{CartNo}]🛒 </button>
               </div>
            </div>
            <div id = {Styles.FeedDiv}>
            {ArrOfProduct.map((data)=> <Card Name = {data.Name} RotiNo = {data.RotiNo} SabhjiNo={data.SabhjiNo} SweetNo={data.SweetNo} Price= {data.Price} Quantity={data.Quantity} />)}

            </div>
            <div id = {Styles.Footer}>
                <h1>Developed by Prashant Jhim</h1>
                <button>Instagram</button>
                <button>Facebook</button>
                <button>Github</button>
            </div>
        </div>
    )
}
export default menu