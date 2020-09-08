import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import CartContext from '../hooks/CartContext.js'

export default function FormDialog(props) {

    const {cart} = React.useContext(CartContext)
  const [open, setOpen] = React.useState(true);
  const [details, setDetails] = React.useState({name:"",mobile:"",address:""});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    props.handleClose()
  };

  React.useEffect(()=>{
    console.log("dialog",props.show)
    if(props.show){
      setOpen(true)
    }else{
      setOpen(false)
    }
    
  },[props.show])
  function handleCheckout(){
    console.log(details,cart)
  }
  function handleInput(e){
    const {id,value} = e.target
    setDetails(prev=>({...prev,[id]:value}))
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Checkout</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            onChange={handleInput}
            value={details.name}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="mobile"
            label="Mobile"
            type="text"
            value={details.mobile}
            onChange={handleInput}
            fullWidth
          />
           <TextField
            autoFocus
            margin="dense"
            id="address"
            label="Address"
            type="text"
            value={details.address}
            onChange={handleInput}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleCheckout} color="primary">
            Checkout
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
