'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Style from "./edit.module.css"
import { UpdateCustomerFuntion } from './AllFunctions';
export default function UpdateCustomer({FetchCustomerData,Data}) {
    const [CustomerName,SetCustomerName] = React.useState(Data.Customer_Name)
    const [MobileNumber,SetMobileNumber] = React.useState(Data.Mobile)
    const [EmailID,SetEmailID] = React.useState(Data.Email_ID)
    const [Location,SetLocation] = React.useState(Data.Location)

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const HandelSubmit = async(e)=>{
    e.preventDefault();
    if(MobileNumber.toString().length !== 10){
        alert("Invalid Mobile Number")
    }else{
    const result = await UpdateCustomerFuntion(CustomerName,MobileNumber,EmailID,Location,Data.Customer_ID);
    if(result){
      FetchCustomerData();
      setState({ ...state, 'right': false })
    }else{
        alert("Something went wrong")
    }}
  }
  const list = (anchor) => (
    <Box className={Style.DrawerCenter} style={{backgroundColor:"#13192f"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <div style={{width:'100vw',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{maxWidth:'700px',width:'100%',backgroundColor:'#1e2742',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <form onSubmit={HandelSubmit} style={{maxWidth:'500px',width:'100%',display:'flex',flexDirection:'column'}}>
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'30px'}}>
                        <div style={{color:'white',fontSize:'25px'}}>Update Customer</div>
                        <div><img src="/svg/Cross.svg" onClick={()=>{setState({ ...state, [anchor]: false })}} alt="" style={{cursor:'pointer'}} /></div>
                    </div>
                    <input type='text' value={CustomerName} onChange={(e)=>{SetCustomerName(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Customer name" required/>
                    <input type='number' pattern="\d{10}" value={MobileNumber} onChange={(e)=>{SetMobileNumber(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Whatsapp number" required/>
                    <input type='email' value={EmailID} onChange={(e)=>{SetEmailID(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Mail ID" required/>
                    <input type='text' value={Location} onChange={(e)=>{SetLocation(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Location" required/>
                    <button type='submit' style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'15px 20px', marginTop:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>Update</button>
                </form>
            </div>
        </div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}><img src='/editcrm.svg' style={{marginBottom:'20px',marginLeft:'9px',cursor:'pointer'}}/></div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}