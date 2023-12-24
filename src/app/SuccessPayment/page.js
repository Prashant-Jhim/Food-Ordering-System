"use client" 
import '../global.css'
import styles from './page.module.css'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
const SuccessPayment = () =>{
    const router = useRouter()
    // Function to clear the cart from user arr of carts and make session completed 
    const SessionSaved = async () =>{
        const session = window.localStorage.getItem("Session")
        const id = window.localStorage.getItem("ID")
        console.log(id)
        if (id == undefined || id == "nothing"){
            router.push("/")
        }
        if (id != undefined && id != "nothing"){
            const Request = await fetch("/api/SucPayment",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id:id,Session:session})
            })
            const Response = await Request.json()
            console.log(Response)
        }
    }
    useEffect(()=>{
        SessionSaved()
    },[])

    const BackToMenu = ()=>{
        router.push("/")
    }
    return (
        <div id = {styles.MainDiv}>
            <h1 id = {styles.Title}>Daves Tiffin 🥗</h1>
            <h1 id = {styles.para}>Thank u for Shopping with us </h1>
            <button onClick={BackToMenu}>Back To Menu</button>
        </div>
    )
}
export default SuccessPayment