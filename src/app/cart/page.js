"use client"
import { useRouter } from 'next/navigation'
import styles from './cart.module.css'
import {useState} from 'react'
const Cart = () =>{
    const router = useRouter()
    const [ArrofProduct,ChangeArrProduct] = useState([
        {
            Name:"Tiffin 1",
            RotiNo:"8",
            SabhjiNo:"2",
            SweetNo:"1",
            Price: 100,
            Quantity:1
        }
    ])

    // Function to Go Back To Menu Part 
    const BackToMenu = () =>{
        router.push("/menu")
    }
    const Card = (props) =>{
        const img = "https://www.theglobeandmail.com/resizer/W68FdYu7lxsGsmzFYaagk9K3TG0=/arc-anglerfish-tgam-prod-tgam/public/ZHFLWK75OZB4TJM45XR627PU5I"
    
        // Function to Change The Price When Quantity is Changed
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
                            <input type="number" placeholder={props.Quantity}/>
                        </div>

                        <div>
                            <button>Save</button>
                            <button>Delete</button>
                        </div>
                    </div>
            </div>
        )
    }
    return (
        <div>
        <div id = {styles.NavBar}>
        <h1 onClick={BackToMenu} id = {styles.title}>Daves Tiffin🥗</h1>
        <div id = {styles.buttons}>
            <h2>Total : $1000</h2>
            <button>Checkout</button>
        </div>
        
        </div>
        <div id = {styles.Feed}>
            {ArrofProduct.map((data)=> <Card Name = {data.Name} RotiNo = {data.RotiNo} SabhjiNo={data.SabhjiNo} SweetNo={data.SweetNo} Price= {data.Price} Quantity={data.Quantity} />)}
        </div>


        </div>
    )
}

export default Cart