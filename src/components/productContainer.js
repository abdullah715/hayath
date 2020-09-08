import React, {useState,useEffect} from "react";
import ProductCard from './productCard'
import InfiniteScroll from 'react-infinite-scroller';

import CartContext from '../hooks/CartContext.js'


export default function ProductContainer(props){
  const {cart} = React.useContext(CartContext)


  const [items,setItems] = useState([])
  const [hasMore,setHasMore] =useState(true)
  const [limit,setLimit] = useState(5)
  const cartItems = Object.keys(cart)
  
  function loadFunc(){
    console.log(limit)
    if(props.itemsToShow.length >= limit){
      const nextSet = props.itemsToShow.slice(limit,limit+5)
      setItems(prev => [...prev,...nextSet])
      setLimit(limit=>limit+5)
    }else{
      const nextSet = props.itemsToShow.slice(limit,props.itemsToShow.length)
      setItems(prev => [...prev,...nextSet])
      setLimit(limit=>props.itemsToShow.length)
      setHasMore(false)
    }
    
  }
  useEffect(()=>{
    if(props.itemsToShow.length >= limit){
      setItems(props.itemsToShow.slice(0,limit))
      setHasMore(true)
    }else{
      setItems(props.itemsToShow.slice(0,props.itemsToShow.length))
      setHasMore(false)
    }
  },[props.itemsToShow])
  return (
    <div>
    <InfiniteScroll
    pageStart={0}
    loadMore={loadFunc}
    hasMore={hasMore}
    loader={<div className="loader" key={0}>Loading ...</div>}
>
    {items.map((each,index)=>{
    const id = each._id

    if(Object.keys(cart).includes(id)){
     return (
      <ProductCard 
        key={index}
        name={each.name}
        uuid={each._id}
        image={"https://royalspace.online/images/"+each._id+".png"}
        price={each.price}
        saleType={each.saleType}
        inCart={true}
        amt = {cart[each._id].amt}
        qty = {cart[each._id].qty}
        />
      ) 
    }else{
      return (
      <ProductCard 
        key={index}
        name={each.name}
        uuid={each._id}
        image={"https://royalspace.online/images/"+each._id+".png"}
        price={each.price}
        saleType={each.saleType}
        inCart={false}
        amt={0}
        qty={0}
        />
      ) 
    }
      
    })} 
</InfiniteScroll>

    
    </div>
  )
}