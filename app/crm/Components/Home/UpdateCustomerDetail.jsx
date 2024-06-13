'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import { DatePickerIcon } from './page';
import Drawer from '@mui/material/Drawer';
import Style from "./edit.module.css"
import { UpdateCustomerEvent } from './AllFunctions';
export default function UpdateEventDetails({FetchCustomerData,Data}){
  const [EventName,EventNameValue] = React.useState(Data.EventName.split('-')[1]);
  const [EventDate,SetEventDate] = React.useState(Data.EventDate);
  const [PaymentMode,SetPaymentMode] = React.useState(Data?.Advance_Payment[0]?.Mode_Of_Payment||'');
  const [FullAmount,FullAmountValue] = React.useState(+Data.Full_Amount);
  const [Advance,AdvanceValue] = React.useState(+Data?.Advance_Payment[0]?.Advance || 0);
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
  function isValidDateFormat(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateString)) {
      return false;
    }
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month &&
      date.getDate() === day
    );
  }
  const HandelSubmit = async(e)=>{
    e.preventDefault();
    if(isValidDateFormat(EventDate)){
    const response = await UpdateCustomerEvent(Data.EventID,EventName,EventDate,PaymentMode,FullAmount)
    if(response){
      FetchCustomerData();
      setState({ ...state, 'right': false })
    }}else{
        alert('Invalid Date Format')
    }
  }
  const list = (anchor) => (
    <Box className={Style.DrawerCenter} style={{backgroundColor:"var(--bg)"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <div style={{width:'100vw',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{position:"relative",boxShadow:"0px 72px 80px -48px rgba(0, 0, 0, 0.5)",backgroundColor:'var(--white)',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:"50em",padding:"2em 5em",borderRadius:"20px"}}>
                <form onSubmit={HandelSubmit} style={{maxWidth:'500px',width:'100%',display:'flex',flexDirection:'column'}}>
                    
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'10px'}}>
                        <div style={{color:'var(--darkblue)',fontSize:'30px'}}>Update Event</div>
                        <div onClick={()=>{setState({ ...state, [anchor]: false })}} className={Style.backBtn}> <img src="/assets/back.svg" alt="Back" style={{width:"12px",height:"12px"}} /> Back</div>
                    </div>

                    <div>
                      <label className='text-sm' htmlFor="name">Event Name</label>
                      <input type='text' value={EventName} onChange={(e)=>{EventNameValue(e.target.value)}} style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}}  placeholder="Event Name" required/>
                    </div>

                    <div>
                      <label className='text-sm' htmlFor="date"></label>
                      <div style={{width:'90%',backgroundColor:'var(--white)',border:'none',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}}                     >
                        <DatePickerIcon style={{border:"none !important"}} className={Style.eveDatepicker} setValue={SetEventDate}/>
                      </div>
                    </div>

                    <div>
                      <label className='text-sm' htmlFor="payment"></label>
                      <input type='text' value={PaymentMode} list="nameOptions" onChange={(e)=>{SetPaymentMode(e.target.value)}} style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Mode of Payment" required/>
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
                      <input type='number' value={FullAmount} onChange={(e)=>{FullAmountValue(e.target.value)}}style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}}  placeholder="Full Amount" required/>
                    </div>
                    <div>
                      <label className='text-sm'htmlFor="advance">Advance</label>
                      <input type='number' value={Advance} onChange={(e)=>{AdvanceValue(e.target.value)}} style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Advance" required/>
                    </div>
                    <div>
                      <label className='text-sm'htmlFor="balance">Balance</label>
                      <input type='text' value={FullAmount-Advance} style={{width:'90%',backgroundColor:'var(--white)',border:'none',padding:'.4em .6em',borderRadius:'5px',fontSize:'15px',outline:'none',color:'black',margin:'5px 0',border:"1px solid var(--blue)"}} placeholder="Balance Amount" disabled/>
                    </div>

                    <button type='submit' style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'90%',padding:'8px 2.5em', marginTop:'15px',cursor:'pointer',backgroundColor:'var(--pink)',color:'#fff'}}>Update</button>
                </form>
            </div>
        </div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}><img src='/assets/edit.svg' style={{width:"24px",height:"24px",cursor:'pointer'}}/></div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}