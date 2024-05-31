'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Style from "./edit.module.css"
import { isEqual } from 'lodash';
import { GetCustomerFuntion } from './AllFunctions';
import { sendgreatingmessages } from '../../SendSMS';
import { searchFun } from './DownloadCSV';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GreetingSendBtn from './GreetingSendBtn';
export const TableCkeckBox = ({item,CheckValue,SetArrayValue})=>{
    return <div style={{display:'flex',borderBottom:'1px solid gray',justifyContent:'space-between',margin:'20px',padding:'10px 20px'}}>
        <div style={{color:'white'}}>{item.Customer_Name} ( {item.Mobile} )</div>
        <img
  style={{ cursor: "pointer" }}
  src={
    !CheckValue.some(val => isEqual(val, [item.Mobile, item.Customer_Name]))
      ? '/svg/CheckedFalse.svg'
      : '/svg/CheckedTrue.svg'
  }
  onClick={() => {
    CheckValue.some(val => isEqual(val, [item.Mobile, item.Customer_Name]))
      ? SetArrayValue(
          CheckValue.filter(it => !isEqual(it, [item.Mobile, item.Customer_Name]))
        )
      : SetArrayValue([[item.Mobile, item.Customer_Name], ...CheckValue]);
  }}
  alt=""
/>
        {/* <img style={{cursor:"pointer"}} src={!CheckValue.includes([item.Mobile,item.Customer_Name])?'/svg/CheckedFalse.svg':'/svg/CheckedTrue.svg'} onClick={()=>{CheckValue.includes([item.Mobile,item.Customer_Name])?SetArrayValue(CheckValue.filter(it => it[0] !== item.Mobile)):SetArrayValue([[item.Mobile,item.Customer_Name],...CheckValue])}} alt=""/> */}
    </div>
}
export default function ReadyToSendSMS({SendingData}) {
    const [ArrayOfNumbers,SetArrayValue] = React.useState([]);
    const [ConstData,SetConstData] = React.useState([]);
    const [CustomerData,SetCustomerData] = React.useState([]);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const GetAllCutomers = async()=>{
    const response = await GetCustomerFuntion();
    SetCustomerData(response);
    SetConstData(response);
  }
  React.useEffect(()=>{
    GetAllCutomers();
  },[])
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const HandelSelectAll = async()=>{
    if(ArrayOfNumbers.length == 0){
      const ar = [];
      CustomerData.map((item)=>{
          ar.push([item.Mobile,item.Customer_Name])
      })
      SetArrayValue([...ar]);
    }else{
      SetArrayValue([]);
    }
  }
  const list = (anchor) => (
    <Box className={Style.DrawerCenter} style={{backgroundColor:"#13192f"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <ToastContainer className={Style.toastDiv}/>
        <div style={{width:'100vw',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div style={{maxWidth:'700px',width:'100%',backgroundColor:'#1e2742',height:'100svh',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            <div className={Style.DrawermapdataCenter}>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <div className={Style.SearchModel} style={{backgroundColor:'#13192f',maxWidth:'400px'}}>
                        <input type="text" placeholder="Search" style={{backgroundColor:'#13192f'}} onChange={(e)=>{SetCustomerData(searchFun(e.target.value,ConstData))}}/>
                        <img src="/svg/crmsearch.svg" alt="search" />
                    </div>
                    <div className={Style.ContainerTable}>
                        <div>
                            {CustomerData.map((item,index)=>{
                                return <TableCkeckBox item={item} CheckValue={ArrayOfNumbers} SetArrayValue={SetArrayValue} key={index}/>
                            })}
                        </div>
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'column'}}>
                    <button onClick={()=>{HandelSelectAll()}} style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'10px 15px', margin:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>{ArrayOfNumbers.length != 0?'Unselect':'Select All'}</button>
                    {/* <button onClick={ async ()=>{
                      const res =  await sendgreatingmessages(SendingData,ArrayOfNumbers);
                      console.log(res,"Response")
                      if (res) {
                        toast.success("Message Send Successfully")
                        console.log(res);
                      } else {
                        console.log("Error :",res)
                        toast.warning("Something Went wrong!")
                      }
                      alert('Message Sent ...')
                    }} style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'10px 15px', margin:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>Send</button> */}
                    
                    {/* Updated Code */}
                    <GreetingSendBtn SendingData={SendingData} ArrayOfNumbers={ArrayOfNumbers} 
                    />
                    <button onClick={()=>{setState('top',false)}} style={{border:'1px solid #813abc',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'10px 15px', margin:'15px',cursor:'pointer',backgroundColor:'transparent',color:'#813abc'}}>Cancel</button>
                </div>
            </div>
            </div>
        </div>
    </Box>
  );

  return (
    <div>
      {['top'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}><button style={{backgroundColor:'#a240e5',padding:'10px 40px',border:'none',borderRadius:'10px',color:'white',cursor:'pointer'}}>Send</button></div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}