'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Style from "./edit.module.css"
import { createClient } from '@supabase/supabase-js';
import { CreateCustomerFuntion } from './AllFunctions';
export default function EditCreate({FetchCustomerData}) {
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
    const result = await CreateCustomerFuntion(e.target.elements.CustomerName.value,e.target.elements.MobileNumber.value,e.target.elements.EmailID.value,e.target.elements.Location.value);
    if(result){
      FetchCustomerData();
      setState({ ...state, 'right': false })
    }
  }
  const list = (anchor) => (
    <Box className={Style.DrawerCenter} style={{backgroundColor:"#13192f"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <div style={{width:'100vw',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{maxWidth:'700px',width:'100%',backgroundColor:'#1e2742',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <form onSubmit={HandelSubmit} style={{maxWidth:'500px',width:'100%',display:'flex',flexDirection:'column'}}>
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'30px'}}>
                        <div style={{color:'white',fontSize:'25px'}}>Create Customer</div>
                        <div><img src="/svg/Cross.svg" onClick={()=>{setState({ ...state, [anchor]: false })}} alt="" style={{cursor:'pointer'}} /></div>
                    </div>
                    <input type='text' name='CustomerName' style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Customer name" required/>
                    <input type='number' name='MobileNumber' style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Whatsapp number" required/>
                    <input type='email' name='EmailID' style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Mail ID" required/>
                    <input type='text' name='Location' style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Location" required/>
                    <button type='submit' style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'15px 20px', marginTop:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>Create</button>
                </form>
            </div>
        </div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}><button className={Style.AddCustomerStyle}>Add Customer</button></div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}