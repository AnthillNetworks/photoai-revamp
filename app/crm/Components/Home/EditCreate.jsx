'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Style from "./edit.module.css"
import { createClient } from '@supabase/supabase-js';
import { CreateCustomerFuntion } from './AllFunctions';
import { StylesProvider } from '@chakra-ui/react';
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

  const handleRefresh = () => {
    window.location.reload();
  };

  const list = (anchor) => (
    <Box className={`${Style.DrawerCenter} min-h-screen`} style={{backgroundColor:"var(--bg)",height:"100vh"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <div  onClick={handleRefresh}>
          <img src="assets/homeicon.svg" alt="Home" className={Style.homeIcon} />
        </div>
        <div style={{width:'100vw',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:"100vh"}}>
            <div style={{position:"relative",boxShadow:"0px 72px 80px -48px rgba(0, 0, 0, 0.5)",backgroundColor:'var(--white)',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:"50em",padding:"3em 5em",borderRadius:"20px"}}>
                <form onSubmit={HandelSubmit} style={{maxWidth:'500px',width:'100%',display:'flex',flexDirection:'column',gap:".5em"}}>
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'10px'}}>
                        <div style={{color:'var(--darkblue)',fontSize:'30px'}}>Add Customer</div>
                        {/* <div><img src="/svg/Cross.svg" onClick={()=>{setState({ ...state, [anchor]: false })}} alt="" style={{cursor:'pointer'}} /></div> */}
                        <div onClick={()=>{setState({ ...state, [anchor]: false })}} className={Style.backBtn}> <img src="/assets/back.svg" alt="Back" style={{width:"12px",height:"12px"}} /> Back</div>
                    </div>
                    <div>
                      <label className='text-sm' htmlFor="name">Customer Name</label>
                      <input type='text' name='CustomerName' style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Customer name" required/>
                    </div>
                    <div>
                      <label className='text-sm' htmlFor="name">Whatsapp number</label>
                      <input type='number' name='MobileNumber' style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Whatsapp number" required/>
                    </div>
                    <div>
                      <label className='text-sm' htmlFor="name">Email ID</label>
                      <input type='email' name='EmailID' style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Mail ID" required/>
                    </div>
                    <div>
                      <label className='text-sm' htmlFor="name">Location</label>
                      <input type='text' name='Location' style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Location" required/>
                    </div>
                    <button type='submit' style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'8px 2em', marginTop:'15px',cursor:'pointer',backgroundColor:'var(--pink)',color:'#fff'}}>Add customer</button>
                </form>
            </div>
        </div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          {/* <div onClick={toggleDrawer(anchor, true)}><button className={Style.AddCustomerStyle}>Add Customer</button></div> */}
          <div className={Style.searchBtn} onClick={toggleDrawer(anchor, true)}>Add Customer</div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
