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
    <Box className={Style.DrawerCenter} style={{backgroundColor:"var(--bg)"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <div style={{width:'100vw',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{position:"relative",boxShadow:"0px 72px 80px -48px rgba(0, 0, 0, 0.5)",backgroundColor:'var(--white)',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:"50em",padding:"2em 5em",borderRadius:"20px"}}>
                <form onSubmit={HandelSubmit} style={{maxWidth:'500px',width:'100%',display:'flex',flexDirection:'column'}}>
                    
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'10px'}}>
                        <div style={{color:'var(--darkblue)',fontSize:'30px'}}>Create Event</div>
                        <div onClick={()=>{setState({ ...state, [anchor]: false })}} className={Style.backBtn}> <img src="/assets/back.svg" alt="Back" style={{width:"12px",height:"12px"}} /> Back</div>
                    </div>

                    <div>
                      <label className='text-sm' htmlFor="name">Event Name</label>
                      <input type='text' onChange={(e)=>{EventNameValue(e.target.value)}} style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}}  placeholder="Event Name" required/>
                    </div>
                      
                    <div>
                      <label className="text-sm" htmlFor="date">Event Date</label>
                      <div style={{width:'90%',backgroundColor:'var(--white)',border:'none',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0'}} 
                      ><DatePickerIcon className={Style.eveDatepicker} setValue={SetEventDate}/></div>
                    </div>

                    <div>
                      <label className='text-sm' htmlFor="modeofpayment">Mode of Payment</label>
                      <input type='text' list="nameOptions" onChange={(e)=>{SetPaymentMode(e.target.value)}} style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}}  placeholder="Mode of Payment" required/>
                    </div>

                    <datalist id="nameOptions">
                      <option value="Cash"/>
                      <option value="Debit cards"/>
                      <option value="Wallets"/>
                      <option value="Bank transfers"/>
                      <option value="Cards"/>
                      <option value="UPI"/>
                    </datalist>

                    <div>
                      <label className='text-sm'htmlFor="fullamount">Full Amount</label>
                      <input type='number' onChange={(e)=>{FullAmountValue(e.target.value)}} style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}}  placeholder="Full Amount" required/>
                    </div>
                    <div>
                      <label className='text-sm'htmlFor="advance">Advance</label>
                      <input type='number' onChange={(e)=>{AdvanceValue(e.target.value)}} style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Advance" required/>
                    </div>
                    <div>
                      <label className='text-sm'htmlFor="balance">Balance</label>
                      <input type='text' value={FullAmount-Advance} style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Balance Amount" disabled/>
                    </div>
                    <button type='submit' style={{width:"90%",border:'none',borderRadius:'5px',fontSize:'13px',padding:'8px 2.5em', marginTop:'15px',cursor:'pointer',backgroundColor:'var(--pink)',color:'#fff'}}>Create Event</button>
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