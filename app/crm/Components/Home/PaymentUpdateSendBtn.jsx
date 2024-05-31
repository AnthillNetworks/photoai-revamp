import React from 'react'
import { sendsmscrmofcustomersetelement } from '../../SendSMS';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function PaymentUpdateSendBtn({cusname,total,Mobile,name,totalAmount}) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const HandelSendSMSBTN = async()=>{
        // sendsmscrmofcustomersetelement(`${cusname} (${name.split('-')[1].split('_').join(' ')})`,total,Mobile);
        sendsmscrmofcustomersetelement(`${cusname}`,total,Mobile,`${name.split('-')[1].split('_').join(' ')}`,totalAmount);
        alert('Message Sent ...')
      }

    return (
    <div>
        <button onClick={()=>{handleClickOpen()}} style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'15px 20px', marginTop:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>Send Update</button>            
        <Dialog open={open} TransitionComponent={Transition} transitionDuration={{ appear: 600, enter: 600, exit: 600 }} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
            <div style={{backgroundColor:'#1e2742',padding:'30px 50px',borderRadius:'0'}}>
                <div style={{color:'white', fontSize:'20px'}}>Do You Want to Send Update</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'30px'}}>
                <button onClick={()=>{HandelSendSMSBTN()}} style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'50px',padding:'10px 15px',cursor:'pointer',backgroundColor:'#13192f',color:'#fff'}}>Yes</button>
                <button onClick={()=>{handleClose()}} style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'50px',padding:'10px 15px',cursor:'pointer',backgroundColor:'#13192f',color:'#fff'}}>No</button>
            </div>
            </div>
        </Dialog>
    </div>
  )
}

export default PaymentUpdateSendBtn
