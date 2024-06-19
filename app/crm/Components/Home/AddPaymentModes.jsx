'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Style from "./edit.module.css"
import { DatePickerIcon } from './page';
import { CreateAmountWithUUIDEvent } from './AllFunctions';
export default function AddPaymentModes({uuid,name,GetAllAmount}) {
  const [Date, SetDate] = React.useState('')
  const [Payment, SetPayment] = React.useState('')
  const [Amount, SetAmount] = React.useState('')
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
    const response = await CreateAmountWithUUIDEvent(uuid,name,Date,Payment,Amount);
    if(response){
      GetAllAmount();
      setState({ ...state, 'right': false })
    }
  }
  const list = (anchor) => (
    <Box className={Style.DrawerCenter} style={{backgroundColor:"#13192f"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <div style={{width:'100vw',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{maxWidth:'700px',width:'100%',backgroundColor:'#1e2742',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                <form onSubmit={HandelSubmit} style={{maxWidth:'500px',width:'100%',display:'flex',flexDirection:'column'}}>
                    <div style={{display:'flex',justifyContent:'space-between',width:'100%',marginBottom:'60px'}}>
                        <div style={{color:'white',fontSize:'25px'}}>Add Payment</div>
                        <div><img src="/svg/Cross.svg" onClick={()=>{setState({ ...state, [anchor]: false })}} alt="" style={{cursor:'pointer'}} /></div>
                    </div>
                    <div style={{width:'96.5%',backgroundColor:'#13192f'}}><DatePickerIcon setValue={SetDate}/></div>
                    <input type='text' onChange={(e)=>{SetPayment(e.target.value)}} list='nameOptions' style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Mode Of Payment" required/>
                    <datalist id="nameOptions">
                      <option value="Cash"/>
                      <option value="Debit cards"/>
                      <option value="Wallets"/>
                      <option value="Bank transfers"/>
                      <option value="Cards"/>
                      <option value="UPI"/>
                    </datalist>
                    <input type='number' onChange={(e)=>{SetAmount(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'1px solid gray',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white'}} placeholder="Amount" required/>
                    <button type='submit' style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'15px 20px', marginTop:'50px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>Add Amount</button>
                </form>
            </div>
        </div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}><button style={{border:'none',borderRadius:'5px',fontSize:'13px',padding:'6px 2em',cursor:'pointer',backgroundColor:'var(--pink)',color:'#fff'}}>Add Payment</button></div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}