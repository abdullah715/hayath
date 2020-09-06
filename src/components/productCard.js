

import React,{useState,useEffect,useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Input } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

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
    maxWidth: '100%',
    maxHeight: '100%',
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
  }
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

  const {cart,addToCart,removeFromCart} = useContext(CartContext)
  
  const classes = useStyles();
  const [kg,setKg] = useState(0)
  const [gram,setGram] = useState(0)
  const [qty,setQty] = useState(0)
  const [amt,setAmt] = useState(0)
 
  useEffect(()=>{
      setAmt(()=>(props.amt))
      setQty(()=>(props.qty))
      setKg(()=>(props.qty.before()))
      setGram(()=>((props.qty-props.qty.before())*1000))
  },[props.qty,props.amt])

  useEffect(()=>{
    setQty(()=>(kg+(gram/1000)))
  },[kg,gram])

  useEffect(()=>{
    setAmt(()=>(qty*100))
  },[qty])

  useEffect(()=>{
      if(amt > 0){
        addToCart(props.uuid,qty,amt)
      }else{
        removeFromCart(props.uuid)
      }
  },[amt])
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

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item  >
            <div>
            <img className={classes.img} alt="complex" src={props.image} />
            </div>
          </Grid>
          <Grid item >
          <Grid item container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  {props.name}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Qty : {qty}
                </Typography>
                 <Typography variant="body2" gutterBottom>
                  Amout : {amt}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: {props.uuid.slice(0,10)}
                </Typography>
              </Grid>

            </Grid>
          </Grid>
          </Grid>
          
          <Grid xs="12"  style={{margin:"12px 0px 0"}}>
          <div  style={{display:"flex",justifyContent:"space-between"}}>
            <div className={classes.input}>

            <ButtonBase>
              <AddIcon onClick={()=>(increment("kg"))}/>
             </ButtonBase>
            <Input id={props.uuid.slice(0,10)} fullWidth={false} className={classes.inp} value={kg}/>
             <ButtonBase>
             <RemoveIcon onClick={()=>(decrement("kg"))}/>
             </ButtonBase>
            </div>
          
             <div className={classes.input}>
             <ButtonBase>
              <AddIcon onClick={()=>(increment("gram"))}/>
             </ButtonBase>
           
            <Input id={props.uuid.slice(0,10)} fullWidth={false} className={classes.inp} value={gram}/>
             <ButtonBase>
             <RemoveIcon onClick={()=>(decrement("gram"))}/>
             </ButtonBase>
            
            </div>

          </div>
          </Grid>
      </Paper>
    </div>
  );
}
