"use client"
import React from 'react';
import sendsmscrm from '../../SendSMS';
import 'react-toastify/dist/ReactToastify.css';

import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function EventDetailsSendBtn({name,ConstCheckedData,Mobile}) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const HandelSendSMS = async()=>{
        if(ConstCheckedData){
          let AdvanceAmount = 0;
          ConstCheckedData.Advance_Payment.map((it)=>{
            AdvanceAmount += +it.Advance;
          })
          sendsmscrm(name,ConstCheckedData.EventName.split('-')[1],ConstCheckedData.Status,ConstCheckedData.Full_Amount,AdvanceAmount,Mobile);
          alert('Message Send ...');
        }
      }

  return (
    <div>
      <button onClick={()=>{handleClickOpen()}} style={{cursor:"pointer",borderRadius:"5px",padding:"4px 4em",fontSize:"14px",backgroundColor:"var(--pink)",color:"var(--white)",outline:"none",border:"none"}}>Send Update</button>
      <Dialog open={open} TransitionComponent={Transition} transitionDuration={{ appear: 600, enter: 600, exit: 600 }} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
            <div style={{backgroundColor:'#1e2742',padding:'30px 50px',borderRadius:'0'}}>
                <div style={{color:'white', fontSize:'20px'}}>Do You Want to Send Update</div>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'30px'}}>
                <button onClick={()=>{HandelSendSMS()}} style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'50px',padding:'10px 15px',cursor:'pointer',backgroundColor:'#13192f',color:'#fff'}}>Yes</button>
                <button onClick={()=>{handleClose()}} style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'50px',padding:'10px 15px',cursor:'pointer',backgroundColor:'#13192f',color:'#fff'}}>No</button>
            </div>
            </div>
      </Dialog>
    </div>
  )
}

export default EventDetailsSendBtn
