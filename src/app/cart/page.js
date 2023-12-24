"use client"
import '../global.css'
import { useRouter } from 'next/navigation'
import styles from './cart.module.css'
import { loadStripe } from '@stripe/stripe-js'
import {useState,useEffect} from 'react'



const Cart = () =>{
    const router = useRouter()
    const [PurchaseEnabled,ChangePurchase] = useState(false)
    const [buttonName,ChangeBtnName] = useState("Purchases")
    const [typeoffeed,changetypeoffeed] = useState("orders")
    const [ArrofProduct,ChangeArrProduct] = useState([])
    const [CartPrice,ChangeCartPrice] = useState(0)

    //Function To Check User is Login or Valid 
    const Usercheck = async() =>{
        const id = window.localStorage.getItem("ID")
        if (id == null){
            router.push("/")
        }
        if (id != null){
            const Request = await fetch("api/idcheck",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id})
              })
              const Response = await Request.json()
              if (Response.status == false ){
                router.push("/")
              }
              if (Response.status == true){
                CartFeed()
              }
        }
    }
    // Function to Fetch All Purchases done by customer 
    const FetchPurchases = async() =>{
       const name = document.getElementById(styles.purchasebtn).innerHTML
       if (name == "Purchases"){
        const id = window.localStorage.getItem("ID")
        const Request = await fetch("/api/Purchases",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:id})
        })
        const Response = await Request.json()
        if (Response.status == true){
            console.log(Response)
            ChangePurchase(true)
            ChangeArrProduct(Response.ArrofProduct)
            ChangeBtnName("Orders")
            return 0
        }
        if (Response.status == false){
            ChangeBtnName("Orders")
            ChangeArrProduct([])
            
            return 0
        }
       }
       if (name == "Orders"){
        CartFeed()
        ChangePurchase(false)
        ChangeBtnName("Purchases")
        return 0
       }

    }
    // Function To handle Checkout 
    const CheckOut = async()=>{
        const cartfeed = ArrofProduct
        if (cartfeed.length != 0){
            const url = window.location.origin
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_APICLIENT)
        const id = window.localStorage.getItem("ID")
        const Request =  await fetch("/api/stripe",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                url:url,
                Cartfeed : cartfeed,
                Customer:id
            })
        })
        
        const Response = await Request.json()
        window.localStorage.setItem("Session",Response.id)
        if (Response.status == true){
            const result = stripe.redirectToCheckout({
                sessionId:Response.id
            })
            console.log(result)
            if (result.error){
                console.log( result.error)
            }
            
        }
        }
        if (cartfeed.length == 0){
            alert("Your Cart is Empty")
        }
    }
    // Function to get Customer Cart Feed 
    const CartFeed = async() =>{
        const id = window.localStorage.getItem("ID")
        const Request = await fetch("/api/CartFeed",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({id:id})
        })
        const Response = await Request.json()
        ChangeArrProduct(Response.Arr)
        console.log(Response.Arr)
        const data = Response.Arr 
        
        var newprice = 0
        for (let i = 0 ; i < data.length ; i++){
            console.log(i)
            
            const dataprice = parseInt(data[i].Quantity) * parseInt(data[i].Price)
             newprice = dataprice + newprice 
             console.log(newprice)
        }
        ChangeCartPrice(newprice)
    }
    // useEffect Function to fetch data 
    useEffect(()=>{
        Usercheck()
        
    },[])

     // Function To Show Different Days function to differently
     const ShowPurchases = (props) =>{
        const data = props.session.ArrofProduct
        console.log(data)
        return (
            <div>
            {data.map((Data)=><Card Time = {props.session.Time} Date={props.session.Date} key ={Data._id} _id={Data._id} Name = {Data.Name} RotiNo = {Data.RotiNo} SabhjiNo={Data.SabhjiNo} SweetNo={Data.SweetNo} Price= {Data.Price} Quantity={Data.Quantity} />)}
            </div>
        )
       
     }
    // Content Function 
    const Content = ()=>{
        const imgsrc = "https://img.freepik.com/free-vector/reading-list-concept-illustration_114360-1005.jpg?w=1800&t=st=1702159568~exp=1702160168~hmac=41d0208935dfb8f46282ef84cebd9fcdb0243678560d9aa3d33a80b34d32aa40"
       

        if (ArrofProduct.length != 0){
            console.log(buttonName)
            if (buttonName == "Purchases"){
                
                    return (
                        <div id = {styles.Feed}>
                        {ArrofProduct.map((Data)=><Card key ={Data._id} _id={Data._id} Name = {Data.Name} RotiNo = {Data.RotiNo} SabhjiNo={Data.SabhjiNo} SweetNo={Data.SweetNo} Price= {Data.Price} Quantity={Data.Quantity} />)}
                         </div>
                    )
                
                    }
               if (buttonName == "Orders"){
                console.log(ArrofProduct)
                return(
                    <div id = {styles.Feed}>
                                    {ArrofProduct.map((session)=><ShowPurchases session = {session}/>)}
    
                    </div>
               
            )
                }

            
        }
        if (ArrofProduct.length == 0){
            return(
                <div id = {styles.Feed2}>
                
                <img src = {imgsrc} />
                <button onClick = {BackToMenu}>Back To Menu</button>
            </div>
            )
        }
    }

    
    // Function to Go Back To Menu Part 
    const BackToMenu = () =>{
        router.push("/menu")
    }

    const Card = (props) =>{
        const cartid = props._id
        const img = "https://www.theglobeandmail.com/resizer/W68FdYu7lxsGsmzFYaagk9K3TG0=/arc-anglerfish-tgam-prod-tgam/public/ZHFLWK75OZB4TJM45XR627PU5I"
        const [Quantity,ChangeQuantity] = useState(props.Quantity)
        // Function to check whether it is purchased is done or not 
        const Checkpurchase = ()=>{
                console.log(PurchaseEnabled)
                console.log(props.Time)
            if (PurchaseEnabled == true){
                return(
                    <div>
                        <h2>Date: <strong id = {styles.date}>{props.Date}</strong></h2>
                        <p id = {styles.Time}>Time : {props.Time}</p>
                    </div>
                )
            }
            if (PurchaseEnabled == false){
                return(
                    <div>
                    <button onClick={DelorEdit} id = {styles.Savebtn}>Save</button>
                    <button onClick={DelorEdit} id = {styles.DelBtn}>Delete</button>
                </div>
                )
            }
        }
        //Function To Change The Quantity when is it changed 
        const ChangQty = (event) =>{
            const value = event.target.value
            ChangeQuantity(value)
        }
        // Function to go to AboutUs 
        const BackToAbout = () =>{
            router.push("/AboutUs")
        }
       // Function to save or delete cartitem
    const DelorEdit = async (event) =>{
        const id = event.target.id 
       console.log(cartid)
       
        if (id == styles.Savebtn){
            if (Quantity > 0){
                const Request = await fetch('/api/editcart',{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({id:cartid,Quantity:Quantity,Type:"Edit"})
                })
                const Response = await Request.json()
                console.log("i m save")
                if (Response.status == true){
                    CartFeed()
                }
            }
            if (Quantity <= 0){
                alert("Quantity is Invalid")
            }
        }
        if (id == styles.DelBtn){
            const Request = await fetch('/api/editcart',{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({id:cartid,Quantity:Quantity,Type:"Delete"})
            })
            const Response = await Request.json()
            console.log("i m delete")
            if (Response.status == true){
                CartFeed()
            }
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
                            <input disabled = {PurchaseEnabled} onChange={ChangQty} type="number" placeholder={props.Quantity}/>
                        </div>

                       <Checkpurchase/>
                    </div>
            </div>
        )
    }
    return (
        <div>
        <div id = {styles.NavBar}>
        <h1 onClick={BackToMenu} id = {styles.title}>Daves Tiffin🥗</h1>
        <div id = {styles.buttons}>
            <h2>Total : ${CartPrice}</h2>
            <button  onClick={CheckOut}>Checkout</button>
        </div>
       
        </div>
        <button onClick={FetchPurchases} id = {styles.purchasebtn}>{buttonName}</button>
        <Content/>

        </div>
    )
}

export default Cart