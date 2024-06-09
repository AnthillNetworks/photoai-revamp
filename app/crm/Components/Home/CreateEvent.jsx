'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { DatePickerIcon } from './page';
import Style from "./edit.module.css"
import { CreateCustomerEvent } from './AllFunctions';
export default function CreateEvent({id,FetchEventsByUUID}){
  const [EventName,EventNameValue] = React.useState('');
  const [EventDate,SetEventDate] = React.useState('');
  const [PaymentMode,SetPaymentMode] = React.useState('');
  const [FullAmount,FullAmountValue] = React.useState(0);
  const [Advance,AdvanceValue] = React.useState(0);
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
    const response = await CreateCustomerEvent(id,EventName,EventDate,PaymentMode,FullAmount,Advance)
    if(response){
      FetchEventsByUUID();
      FullAmountValue(0);
      AdvanceValue(0)
      alert('Event Successfully Created')
      setState({ ...state, 'right': false })
    }
  }
  const list = (anchor) => (
    <Box className={Style.DrawerCenter} style={{backgroundColor:"#13192f"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <div style={{width:'100vw',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{maxWidth:'700px',width:'100%',backgroundColor:'#1e2742',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <form onSubmit={HandelSubmit} style={{maxWidth:'500px',width:'100%',display:'flex',flexDirection:'column'}}>
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'30px'}}>
                        <div style={{color:'white',fontSize:'25px'}}>Create Event</div>
                        <div><img src="/svg/Cross.svg" onClick={()=>{setState({ ...state, [anchor]: false })}} alt="" style={{cursor:'pointer'}} /></div>
                    </div>
                    <input type='text' onChange={(e)=>{EventNameValue(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Event Name" required/>
                    <div style={{width:'96.5%',backgroundColor:'#13192f'}}><DatePickerIcon setValue={SetEventDate}/></div>
                    {/* <input type='text' onChange={(e)=>{SetEventDate(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="YYYY-MM-DD" required/> */}
                    <input type='text' list="nameOptions" onChange={(e)=>{SetPaymentMode(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Mode of Payment" required/>
                    <datalist id="nameOptions">
                      <option value="Cash"/>
                      <option value="Debit cards"/>
                      <option value="Wallets"/>
                      <option value="Bank transfers"/>
                      <option value="Cards"/>
                      <option value="UPI"/>
                    </datalist>
                    <input type='number' onChange={(e)=>{FullAmountValue(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Full Amount" required/>
                    <input type='number' onChange={(e)=>{AdvanceValue(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Advance" required/>
                    <input type='text' value={FullAmount-Advance} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Balance Amount" disabled/>
                    <button type='submit' style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'15px 20px', marginTop:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>Create Event</button>
                </form>
            </div>
        </div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}><button style={{cursor:"pointer",borderRadius:"5px",padding:"4px 2em",fontSize:"14px",backgroundColor:"var(--pink)",color:"var(--white)",outline:"none",border:"none"}}>Add Event</button></div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}