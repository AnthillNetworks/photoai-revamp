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
    <Box className={Style.DrawerCenter} style={{backgroundColor:"#13192f"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <div style={{width:'100vw',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{maxWidth:'700px',width:'100%',backgroundColor:'#1e2742',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <form onSubmit={HandelSubmit} style={{maxWidth:'500px',width:'100%',display:'flex',flexDirection:'column'}}>
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'30px'}}>
                        <div style={{color:'white',fontSize:'25px'}}>Update Event</div>
                        <div><img src="/svg/Cross.svg" onClick={()=>{setState({ ...state, [anchor]: false })}} alt="" style={{cursor:'pointer'}} /></div>
                    </div>
                    <input type='text' value={EventName} onChange={(e)=>{EventNameValue(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Event Name" required/>
                    <div style={{width:'96.5%',backgroundColor:'#13192f'}}><DatePickerIcon setValue={SetEventDate}/></div>
                    <input type='text' value={PaymentMode} list="nameOptions" onChange={(e)=>{SetPaymentMode(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Mode of Payment" required/>
                    <datalist id="nameOptions">
                      <option value="Cash"/>
                      <option value="Debit cards"/>
                      <option value="Wallets"/>
                      <option value="Bank transfers"/>
                      <option value="Cards"/>
                      <option value="UPI"/>
                    </datalist>
                    <input type='number' value={FullAmount} onChange={(e)=>{FullAmountValue(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Full Amount"/>
                    <input type='number' value={Advance} onChange={(e)=>{AdvanceValue(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Advance" disabled/>
                    <input type='text' value={FullAmount-Advance} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Balance Amount" disabled/>
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
          <div onClick={toggleDrawer(anchor, true)}><img src='/assets/edit.svg' style={{width:"24px",height:"24px",cursor:'pointer'}}/></div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}