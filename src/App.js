import React,{useEffect,useState,createContext, useContext,forceUpdate} from "react";
import { Button } from '@material-ui/core';
import "./style.css";
import { Input } from '@material-ui/core';
import ProductContainer from './components/productContainer'
import ProductCard from './components/productCard'
import AppBar from './components/appBar'
import Form from './components/checkoutDialog'
import Alert from './components/alertDialog'
import productJson from './products'
import CartContext from './hooks/CartContext.js'

//context
const minPurchase = 200;

export default function App() {

  const [cart,setCart] = useState({})
  const [showForm,setShowForm] = useState(false)
  const [showAlert,setShowAlert] = useState({state:false,msg:""})
  const [cartCount,setCartCount] = useState(0)
  const [showCart,setShowCart] = useState(false)
  const [msg,setMsg] = useState('Loading Shop')

  

  document.body.style.background = "url('https://i.pinimg.com/564x/14/44/16/1444163f3e80c424df57abc9bd259b31.jpg') no-repeat";
  document.body.style.backgroundSize="cover"
  document.body.style.backgroundAttachment="fixed"
  


  const[allProducts,setAllProducts] = useState([]);
  const[products,setProducts] = useState([]);
  const[searchVal,setSearchVal] = useState("");

  useEffect(()=>{
   
      setAllProducts(productJson)
      setProducts(productJson)
     
  },[])

  
  function search(e){
    const {value} = e.target;
    setShowCart(false)
    setSearchVal(value)
    let filtered = allProducts.filter((each)=> each.name.includes(value))
    setProducts(filtered)
    if(!Object.keys(filtered).length){
      setMsg("Item not found")
    }
    console.log("search")
  }

  const handleCheckout = ()=>{
    calcTotal().then((sum)=>{
      if(sum > minPurchase){
        setShowForm(true)
      }

      if(sum < minPurchase){
       setShowAlert({state:true,msg:"Cart Total is less than "+minPurchase}) 
      }

      if(sum == 0){
        setShowAlert({state:true,msg:"Your Cart is Empty"})
      }
    })
    
  }

  async function calcTotal(){
    return Object.entries(cart).reduce((add,each)=> add + each[1].amt,0)
  }

  const handleClose = ()=>{
     setShowForm(false)
  }

  const handleAlertClose = ()=>{
     setShowAlert({state:false,msg:""})
  }
  
  function showCartItems(){

    if(!showCart){
      let filtered = allProducts.filter((each => Object.keys(cart).includes(each._id)))
      if(!filtered.length){
        setMsg("Your Cart is Empty")
      }
      setProducts(filtered)
      setShowCart(true)
    }else{
      setProducts(allProducts)
      setShowCart(false)
    }
    
  }

  function updateCount(count){
    setCartCount(count)
  }
  return (
        // Navigation bar 
    //     Cart and checkout Button
    // search and Filter

    //Products container
        //each productCard
    <CartContext.Provider value={{cart,setCart,updateCount}}>
    <AppBar 
    searchFn={search} 
    searchVal={searchVal} 
    handleCheckout={handleCheckout} 
    showCart={showCartItems} 
    showingCart={showCart} 
    noItems={cartCount}/>
    <div style={{margin:"70px 0px"}}>
    
    {products.length != 0 ? 
    (
      <div>
        <ProductContainer itemsToShow={products} cart={cart} />
      </div>
      
    ):(
      <div>
        <h1>{msg}</h1>
      </div>
    )
    }
    
    </div>
    <Form show={showForm} handleClose={handleClose}/>
    <Alert show={showAlert} handleClose={handleAlertClose}/>
    </CartContext.Provider>
  );
}
