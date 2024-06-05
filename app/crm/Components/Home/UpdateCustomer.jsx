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

    // <Box className={Style.DrawerCenter} style={{backgroundColor:"#13192f"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
    //     <div style={{width:'100vw',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    //         <div style={{maxWidth:'700px',width:'100%',backgroundColor:'#1e2742',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
    //             <form onSubmit={HandelSubmit} style={{maxWidth:'500px',width:'100%',display:'flex',flexDirection:'column'}}>
    //                 <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'30px'}}>
    //                     <div style={{color:'white',fontSize:'25px'}}>Update Customer</div>
    //                     <div><img src="/svg/Cross.svg" onClick={()=>{setState({ ...state, [anchor]: false })}} alt="" style={{cursor:'pointer'}} /></div>
    //                 </div>
    //                 <input type='text' value={CustomerName} onChange={(e)=>{SetCustomerName(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Customer name" required/>
    //                 <input type='number' pattern="\d{10}" value={MobileNumber} onChange={(e)=>{SetMobileNumber(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Whatsapp number" required/>
    //                 <input type='email' value={EmailID} onChange={(e)=>{SetEmailID(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Mail ID" required/>
    //                 <input type='text' value={Location} onChange={(e)=>{SetLocation(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Location" required/>
    //                 <button type='submit' style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'15px 20px', marginTop:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>Update</button>
    //             </form>
    //         </div>
    //     </div>
    // </Box>

    <Box className={`${Style.DrawerCenter} min-h-screen`} style={{backgroundColor:"var(--bg)",height:"100vh"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
      <div style={{width:'100vw',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',height:"100vh"}}>
          <div style={{position:"relative",boxShadow:"0px 72px 80px -48px rgba(0, 0, 0, 0.5)",backgroundColor:'var(--white)',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:"50em",padding:"3em 5em",borderRadius:"20px"}}>
              <form onSubmit={HandelSubmit} style={{maxWidth:'500px',width:'100%',display:'flex',flexDirection:'column',gap:".5em"}}>
                  <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'10px'}}>
                      <div style={{color:'var(--darkblue)',fontSize:'30px'}}>Edit Customer</div>
                      <div onClick={()=>{setState({ ...state, [anchor]: false })}} className={Style.backBtn}> <img src="/assets/back.svg" alt="Back" style={{width:"12px",height:"12px"}} /> Back</div>
                  </div>
                  <div>
                    <label className='text-sm' htmlFor="name">Customer Name</label>
                    <input type='text' name='CustomerName' value={CustomerName} onChange={(e)=>{SetCustomerName(e.target.value)}}  style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Customer name" required/>
                  </div>
                  <div>
                    <label className='text-sm' htmlFor="name">Whatsapp number</label>
                    <input type='number' name='MobileNumber' pattern="\d{10}" value={MobileNumber} onChange={(e)=>{SetMobileNumber(e.target.value)}} style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Whatsapp number" required/>
                  </div>
                  <div>
                    <label className='text-sm' htmlFor="name">Email ID</label>
                    <input type='email' name='EmailID' value={EmailID} onChange={(e)=>{SetEmailID(e.target.value)}}  style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Mail ID" required/>
                  </div>
                  <div>
                    <label className='text-sm' htmlFor="name">Location</label>
                    <input type='text' name='Location' value={Location} onChange={(e)=>{SetLocation(e.target.value)}} style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Location" required/>
                  </div>
                  <button type='submit' style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'8px 2em', marginTop:'15px',cursor:'pointer',backgroundColor:'var(--pink)',color:'#fff'}}>Update</button>
              </form>
          </div>
      </div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}>
            {/* <img src='/editcrm.svg' style={{marginBottom:'20px',marginLeft:'9px',cursor:'pointer'}}/> */}
            <div className={Style.searchBtn} style={{cursor:"pointer"}}>Edit</div>
          </div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}