import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function ConfirmDelete({DeleteFunction,item}) {
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <button style={{padding:'10px 30px',paddingLeft:'20px',borderRadius:'5px',border:'none',marginLeft:'10px',cursor:'pointer',backgroundColor:'red',color:'white'}} onClick={handleClickOpen}>Delete</button>
      {/* <div variant="outlined" onClick={handleClickOpen} style={{padding:'15px 20px'}}>Send Update</div> */}
      <Dialog open={open} TransitionComponent={Transition} transitionDuration={{ appear: 600, enter: 600, exit: 600 }} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <div style={{backgroundColor:'#1e2742',padding:'30px 50px',borderRadius:'0'}}>
            <div style={{color:'white', fontSize:'20px'}}>Do You Want to Send Update</div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:'30px'}}>
            <button onClick={()=>{DeleteFunction(item);handleClose()}} style={{padding:'10px 30px',paddingLeft:'20px',borderRadius:'5px',border:'none',marginLeft:'10px',cursor:'pointer',backgroundColor:'red',color:'white'}}>Yes</button>
            <button onClick={()=>{handleClose()}} style={{padding:'10px 30px',paddingLeft:'20px',borderRadius:'5px',border:'none',marginLeft:'10px',cursor:'pointer',backgroundColor:'white',color:'#000'}}>No</button>
        </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
}