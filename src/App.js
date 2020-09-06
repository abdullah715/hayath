import React,{useEffect,useState,createContext, useContext} from "react";
import { Button } from '@material-ui/core';
import "./style.css";
import { Input } from '@material-ui/core';
import ProductContainer from './components/productContainer'
import ProductCard from './components/productCard'
import AppBar from './components/appBar'

import CartContext from './hooks/CartContext.js'

//context


export default function App() {

  const [cart,setCart] = useState({})
  const [showCart,setShowCart] = useState(false)
  const [msg,setMsg] = useState('Loading Shop')

  function addToCart(id,qty,amt){
    console.log(id,qty,amt)
    let newItem = {[id]:{qty,amt}}
    setCart(prevCart=>({...prevCart,...newItem}))
    return 
  }

  async function removeFromCart(id){
    let newCart = cart
    await delete newCart[id]
    console.log(newCart)
    setCart(newCart)
    return ''
  }

  document.body.style.background = "url('https://i.pinimg.com/564x/14/44/16/1444163f3e80c424df57abc9bd259b31.jpg') no-repeat";
  document.body.style.backgroundSize="cover"
  document.body.style.backgroundAttachment="fixed"
  


  const[allProducts,setAllProducts] = useState([]);
  const[products,setProducts] = useState([]);
  const[searchVal,setSearchVal] = useState("");

  useEffect(()=>{
    const url = 'https://randomuser.me/api/?results=200'; // Get 10 random users

    fetch(url)
    .then(response => response.json())
    .then((res)=>{
      setAllProducts(res.results)
      setProducts(res.results)
      })
  },[])

  function search(e){
    const {value} = e.target;
    setSearchVal(value)
    let filtered = allProducts.filter((each)=> each.name.first.includes(value))
    setProducts(filtered)
    console.log("search")
  }

  function showCartItems(){
    if(!showCart){
      let filtered = allProducts.filter((each => Object.keys(cart).includes(each.login.uuid)))
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
    <AppBar searchFn={search} searchVal={searchVal} showCart={showCartItems} showingCart={showCart} />
    <div>
    
    {products.length != 0 ? 
    (
      <div>
        <ProductContainer itemsToShow={products} itemsInCart={cart}/>
      </div>
      
    ):(
      <div>
        <h1>{msg}</h1>
      </div>
    )
    }
    
    </div>
  
    </CartContext.Provider>
  );
}
