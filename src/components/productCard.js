

import React,{useState,useEffect,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Input } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import LazyLoad from 'react-lazyload';

import CartContext from '../hooks/CartContext.js'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
        padding: theme.spacing(1,0),

  },
  paper: {
    padding: theme.spacing(1,1),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 200,
    height: 200,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '128px',
    maxHeight: '128px',
    minWidth: '128px',
    minHeight: '128px',
  },
  input:{
    display:"flex",
    justifyContent:"space-evenly",
    borderTop:"solid",
    padding:"2px 2px"
  },
  inp:{
    maxWidth:"75px",
    margin:"2px 10px"
  },
  
}));

Number.prototype.before = function () {
  var value = parseInt(this.toString().split(".")[0], 10);//before
  return value ? value : 0;
}

Number.prototype.after = function () {
  var value = parseInt(this.toString().split(".")[1], 10);//after
  return value ? value : 0;
}

export default function ProductCard(props) {

  const {cart,setCart,updateCount} = useContext(CartContext)
  
  const classes = useStyles();
  let inpContainer = {
    display:"flex"}
  if(props.saleType == 'weight'){
    inpContainer.justifyContent = "space-around"
  }else{
    inpContainer.justifyContent = "space-evenly"
  }

  const [kg,setKg] = useState(props.qty.before())
  const [gram,setGram] = useState(0)
  const [qty,setQty] = useState(props.qty)
  const [amt,setAmt] = useState(props.amt)
  const [imgErr,setImgErr] = useState(false)
  const [image,setImage] = useState("https://media.tenor.com/images/67d17766117cca8152040f688609472b/tenor.gif")
 
  

  useEffect(()=>{
    setQty(()=>(kg+(gram/1000)))
  },[kg,gram])

  useEffect(()=>{
    let calcAmt = qty*props.price
    setAmt(()=>(calcAmt))
    if(qty == 0){
      removeFromCart(props.uuid)
    }
    if(qty > 0){
      addToCart(props.uuid,qty,calcAmt,props.name)
      
    }
  },[qty])

    function addToCart(id,qty,amt,name){
        console.log(id,qty,amt,name)
        let newItem = {[id]:{qty,amt,name}}
        setCart(prevCart=>({...prevCart,...newItem}))
        updateCount(Object.keys({...cart,...newItem}).length);

      }

    async function removeFromCart(id){
      console.log("removing")
      let newCart = cart
      await delete newCart[id]
      let resp = setCart(newCart)
        updateCount(Object.keys(cart).length);
    }
    
  
  function increment(type){
    if(type=='kg'){
      setKg(prev=>  prev+1)
    }else{
      setGram(prev=> prev<=500 ? prev+250 : 750)
    }
    
  }
  function decrement(type){
    if(type=='kg'){
    setKg(prev=> prev<=0 ? 0 : prev-1)
    }else{
    setGram(prev=> prev<=0 ? 0 : prev-250)
    }
  }

  function errorImage(){
    setImgErr(true)
    setImage("https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png")
  }

useEffect(()=>{

    if(cart[props.uuid]){
      console.log(cart[props.uuid])
      setAmt(()=>(cart[props.uuid].amt))
      setQty(()=>(cart[props.uuid].qty))
      setKg(()=>(cart[props.uuid].qty.before()))
      setGram(()=>((cart[props.uuid].qty-props.qty.before())*1000))
    }else{
      setAmt(0)
      setQty(0)
      setKg(0)
      setGram(0)
    }
  },[cart[props.uuid]])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item  >
            <div>
                  <LazyLoad once offset={100}>

            <img className={classes.img} alt="complex" src={image} 
            onError={errorImage}
            onLoad={imgErr ? null :()=>setImage(props.image)}
            />
            </LazyLoad>
            </div>
          </Grid>
          <Grid item >
          <Grid item container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h6" style={{width:window.innerWidth*(0.45)}}>
                  {props.name}
                </Typography>
                 <Typography variant="body2" gutterBottom>
                  Price: {props.price} 
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Qty : {qty}
                </Typography>
                 <Typography variant="body2" gutterBottom>
                  Amout : {amt}
                </Typography>
               
              </Grid>

            </Grid>
          </Grid>
          </Grid>
          
          <Grid style={{margin:"12px 0px 0"}}>
          <div  style={inpContainer}>
            <div className={classes.input}>

            <ButtonBase>
              <AddIcon onClick={()=>(increment("kg"))}/>
             </ButtonBase>
            <Input id={props.uuid.slice(0,10)} fullWidth={false} className={classes.inp} value={kg}/>
             <ButtonBase>
             <RemoveIcon onClick={()=>(decrement("kg"))}/>
             </ButtonBase>
            </div>
          
            {props.saleType == 'weight' && (
          <div className={classes.input}>
             <ButtonBase>
              <AddIcon onClick={()=>(increment("gram"))}/>
             </ButtonBase>
           
            <Input id={props.uuid.slice(0,10)} fullWidth={false} className={classes.inp} value={gram}/>
             <ButtonBase>
             <RemoveIcon onClick={()=>(decrement("gram"))}/>
             </ButtonBase>
            
            </div>
            )}
            

          </div>
          </Grid>
      </Paper>
    </div>
  );
}

