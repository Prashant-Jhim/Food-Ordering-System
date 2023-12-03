"use client"
import style from './addproduct.module.css'
import { useRouter } from 'next/navigation'
const AddProduct = ( ) =>{
    const Router = useRouter()
// Function To Add Product to Database
const Addproduct = async() =>{
    const Details = {
        Name : document.getElementById("Name").value ,
        RotiNo:document.getElementById("Roti").value ,
        SabhjiNo:document.getElementById("Sabhji").value,
        SweetNo:document.getElementById("Sweet").value,
        Price:document.getElementById("Price").value
    }
    if (Details.Name != "" && Details.RotiNo != "" && Details.SabhjiNo != "" && Details.SweetNo != "" && Details.Price != ""){
        const Request = await fetch("/api/AddProduct",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(Details)
        })
        const Response = await Request.json()
        document.getElementById("addbtn").innerHTML = "loading.."
        alert("It has been Added")
        document.getElementById("addbtn").innerHTML = 'added✅'

    }
    else {
        console.log("Something is wrong")
    }
    document.getElementById("addbtn").innerHTML = "Add"
}

// Function to GoBack To Menu
const BackToMenu = ()=>{
    Router.push("/menu")
}
    return(
        <div id = {style.Maindiv}>
            <h1 onClick={BackToMenu}>Daves Tiffin🥗</h1>
            <label>Name</label>
            <input id = "Name" type = "text" placeholder="Name of Product" />
            <label>Number Of Roti</label>
            <input id = "Roti"  type = "number" placeholder = "Number of Roti's" />
            <label>Number of Sabhji</label>
            <input id = "Sabhji" type = "number" placeholder="Number of Sabhji" />
            <label>Number of SweetNo</label>
            <input id = "Sweet" type="number" placeholder="Number of Sweets" />
            <label>Price in CAD$</label>
            <input id ="Price" type = "number" placeholder="Price Of Product" />
            <button id = "addbtn" onClick={Addproduct}>Add</button>
        </div>
    )
}
export default AddProduct