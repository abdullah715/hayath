import React, {useState,useEffect} from "react";
import ProductCard from './productCard'
import InfiniteScroll from 'react-infinite-scroller';


export default function ProductContainer(props){


  const [items,setItems] = useState([])
  const [hasMore,setHasMore] =useState(true)
  const [limit,setLimit] = useState(5)
  const cartItems = Object.keys(props.itemsInCart)
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
    const {first,last} =  each.name;
    const id = each.login.uuid
    console.log(cartItems.includes(id))

    if(Object.keys(props.itemsInCart).includes(id)){
     return (
      <ProductCard 
        key={index}
        name={first+" "+last}
        uuid={each.login.uuid}
        image={each.picture.medium}
        inCart={true}
        amt = {props.itemsInCart[each.login.uuid].amt}
        qty = {props.itemsInCart[each.login.uuid].qty}
        />
      ) 
    }else{
      return (
      <ProductCard 
        key={index}
        name={first+" "+last}
        uuid={each.login.uuid}
        image={each.picture.medium}
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