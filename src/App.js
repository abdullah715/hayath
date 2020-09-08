import React,{useEffect,useState,createContext, useContext,forceUpdate} from "react";
import { Button } from '@material-ui/core';
import "./style.css";
import { Input } from '@material-ui/core';
import ProductContainer from './components/productContainer'
import ProductCard from './components/productCard'
import AppBar from './components/appBar'
import Form from './components/checkoutDialog'
import productJson from './products'
import CartContext from './hooks/CartContext.js'

//context


export default function App() {

  const [cart,setCart] = useState({})
  const [showForm,setShowForm] = useState(false)
  const [cartCount,setCartCount] = useState(0)
  const [showCart,setShowCart] = useState(false)
  const [msg,setMsg] = useState('Loading Shop')

  function addToCart(id,qty,amt){
    console.log(id,qty,amt)
    let newItem = {[id]:{qty,amt}}
    setCart(prevCart=>({...prevCart,...newItem}))
    setCartCount(Object.keys(cart).length)

    return 
  }

  async function removeFromCart(id){
    let newCart = cart
    await delete newCart[id]
    console.log(newCart)
    setCart( prevCart => newCart)
    setCartCount(Object.keys(cart).length)
    return 
  }

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
    setSearchVal(value)
    let filtered = allProducts.filter((each)=> each.name.includes(value))
    setProducts(filtered)
    console.log("search")
  }

  const handleCheckout = ()=>{
    setShowForm(true)
  }

  const handleClose = ()=>{
     setShowForm(false)
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

  return (
        // Navigation bar 
    //     Cart and checkout Button
    // search and Filter

    //Products container
        //each productCard
    <CartContext.Provider value={{cart,addToCart,removeFromCart}}>
    <AppBar cartCount={cartCount} searchFn={search} searchVal={searchVal} handleCheckout={handleCheckout} showCart={showCartItems} showingCart={showCart} />
    <div style={{margin:"70px 0px"}}>
    
    {products.length != 0 ? 
    (
      <div>
        <ProductContainer itemsToShow={products} cartCount={cartCount} itemsInCart={cart}/>
      </div>
      
    ):(
      <div>
        <h1>{msg}</h1>
      </div>
    )
    }
    
    </div>
    <Form show={showForm} handleClose={handleClose}/>
    </CartContext.Provider>
  );
}
