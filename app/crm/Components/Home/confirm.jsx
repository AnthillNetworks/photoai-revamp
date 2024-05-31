import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import sendsmscrm, { sendsmscrmofcustomer } from '../../SendSMS';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Confirm({ConstCheckedData}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const SendSMS = async()=>{
    if(ConstCheckedData){
      sendsmscrmofcustomer(ConstCheckedData.Customer_Name,ConstCheckedData.Balance,ConstCheckedData.Mobile)
      handleClose();
      alert('Message Sent ...')
    }else{
      handleClose();
      alert('Event Not Selected ...')
    }
  }
  return (
    <React.Fragment>
      <div variant="outlined" onClick={handleClickOpen} style={{padding:'15px 20px'}}>Send Update</div>
      <Dialog open={open} TransitionComponent={Transition} transitionDuration={{ appear: 600, enter: 600, exit: 600 }} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <div style={{backgroundColor:'#1e2742',padding:'30px 50px',borderRadius:'0'}}>
            <div style={{color:'white', fontSize:'20px'}}>Do You Want to Send Update</div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'30px'}}>
            <button onClick={()=>{SendSMS()}} style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'50px',padding:'10px 15px',cursor:'pointer',backgroundColor:'#13192f',color:'#fff'}}>Yes</button>
            <button onClick={()=>{handleClose()}} style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'50px',padding:'10px 15px',cursor:'pointer',backgroundColor:'#13192f',color:'#fff'}}>No</button>
        </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}