'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Style from "./edit.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import AddPaymentModes from './AddPaymentModes';
import { GetEventsAmountByUUID,GetEventsTotalAmountByUUID,UpdateEventsAmountByUUID } from './AllFunctions';
import downloadCSV from './DownloadCSV';
import { sendsmscrmofcustomersetelement } from '../../SendSMS';
import PaymentUpdateSendBtn from './PaymentUpdateSendBtn';
import Image from 'next/image';
export default function AddPayment({uuid,name,cusname,Mobile}) {
  const [Data,DataValue] = React.useState([]);
  const [total,Settotal] = React.useState(0);
  const [totalAmount,settotalAmount] = React.useState(0);
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
  const GetAllAmount = async()=>{
    const response = await GetEventsAmountByUUID(uuid,name);
    DataValue(response[0].Advance_Payment)
    let tott = 0;
    for(let a = 0; a<response[0].Advance_Payment.length;a++){
      tott += +response[0].Advance_Payment[a].Advance;
    }
    Settotal(tott);
  }
  const GetTotalAmount = async () => {
    const TotalAmountForEvent = await GetEventsTotalAmountByUUID(uuid,name);
    settotalAmount(TotalAmountForEvent[0].Full_Amount);
  }
  React.useEffect(()=>{
    GetAllAmount()  ,
    GetTotalAmount()
  },[])
  const HandelDelete = async(itemKey)=>{
    let Array = [];
    for(let i=0; i<Data.length;i++){
      if(itemKey!= i){
        Array.push(Data[i])
      }
    }
    let tott = 0;
    for(let a = 0; a<Array.length;a++){
      tott += +Array[a].Advance;
    }
    Settotal(tott);
    UpdateEventsAmountByUUID(uuid,name,Array)
    DataValue(Array);
  }
  const HandelSendSMSBTN = async()=>{
    // sendsmscrmofcustomersetelement(`${cusname} (${name.split('-')[1].split('_').join(' ')})`,total,Mobile);
    sendsmscrmofcustomersetelement(`${cusname}`,total,Mobile,`${name.split('-')[1].split('_').join(' ')}`,totalAmount);
    alert('Message Sent ...')
  }
  const list = (anchor) => (
    <Box className={`${Style.DrawerCenter} min-h-screen`} style={{backgroundColor:"var(--bg)"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
            
      <div className='w-10/12 m-auto flex items-center justify-center flex-col pt-4 gap-4' style={{width:'80%',margin:"auto"}}>
        
        {/* Header */}
        <div className='flex w-full items-center justify-between py-2' style={{borderBottom:"1px solid var(--blue)"}}>
          <div className='w-full px-4 py-2 flex gap-4 items-center'>
            <div className={Style.ForBackButton} onClick={()=>{setState({ ...state, [anchor]: false })}}>
              <img src="/assets/backbtn.svg" alt="Back" style={{width:"20px",height:"20px"}}/>
            </div>
            <div style={{color:"var(--blue)",fontSize:"24px"}}>Event Details</div>
          </div>
          <div className="flex items-center gap-4" style={{minWidth:"fit-content",border:"1px solid #D8D8D8",borderRadius:'5px'}}><Image src="/assets/profile.svg" alt="Logo" width={100} height={100} className={Style.profile} /><div className="pr-6 text-sm font-bold w-fit">Studio name</div></div>
        </div>

        {/* Details */}
        <div className='flex w-full gap-64 pl-8 items-stretch pb-6' style={{borderBottom:"1px solid var(--blue)"}}>
          <div className='flex flex-col gap-3'>
            <div className='text-xl font-bold' style={{color:"var(--blue)"}}>Wade Warren</div>
            <div className='text-lg font-bold' style={{color:"var(--blue)"}}>Bangalore</div>
            <div className='flex gap-3 text-sm'><img src="/assets/call.svg" alt="Call" /><div style={{color:"var(--blue)"}}>(406) 555-0120</div></div>
            <div className='flex gap-3 text-sm'><img src="/assets/msg.svg" alt="Call" /><div style={{color:"var(--blue)"}}>felicia.reid@example.com</div></div>
          </div>
          <div className='flex flex-col justify-between gap-10'>
            <div className='text-xl flex gap-2'><div className='text-xl font-bold' style={{color:"var(--blue)"}}>Balance :</div><div style={{color:"var(--pink)"}}>$3200</div></div>
              <div><PaymentUpdateSendBtn  name={name} total={total} totalAmount={totalAmount} cusname={cusname} Mobile={Mobile}/></div>
          </div>
        </div>

        {/* Con */}
        <div className='pl-8 my-4 flex items-center justify-between w-full'>
          <div style={{color:"var(--blue)",fontSize:"24px"}}>Event</div>
          <div className='flex gap-6'>
            <div onClick={()=>{downloadCSV(Data)}} className='flex items-center' style={{cursor:"pointer",border:"1px solid var(--pink)",borderRadius:"5px",padding:"4px 2em",fontSize:"14px",backgroundColor:"var(--bg)",color:"var(--pink)",outline:"none"}}> Download </div>
            <div><AddPaymentModes uuid={uuid} name={name} GetAllAmount={GetAllAmount}/></div>
          </div>
        </div>

        {/* Table */}
        <div className={Style.tableContainer}>
          <div className={Style.table}>
            <div className={Style.tableHeader}>
              <div className={Style.tableRow}>
                <div className={Style.tableHeaderCell}>Date</div>
                <div className={Style.tableHeaderCell} style={{ minWidth: '300px' }}>Mode of Payment</div>
                <div className={Style.tableHeaderCell}>Amount</div>
              </div>
            </div>
            <div className={Style.tableBody}>
              {Data.map((item, index) => (
                <>
                  <div className={Style.tableRow} key={index}>
                    <div className={Style.tableCell} style={{ color: 'black', textDecoration: 'none' }}>{item.Date}</div>
                    <div className={Style.tableCell}>{item.Mode_Of_Payment}</div>
                    <div className={Style.tableCell}>{(+item.Advance).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
                    <DeleteIcon className={Style.deleteIcon} style={{ cursor: 'pointer' }} onClick={() => { HandelDelete(index) }} />
                  </div>
                </>
              ))}
            </div>
        </div>
      </div>

      </div>

            {/* <div className={Style.NavSearchModel}>
                <div className={Style.ForBackButton} onClick={()=>{setState({ ...state, [anchor]: false })}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_263_943)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.94063 13.0599C7.65973 12.7787 7.50195 12.3974 7.50195 11.9999C7.50195 11.6024 7.65973 11.2212 7.94063 10.9399L13.5966 5.2819C13.878 5.00064 14.2596 4.84268 14.6575 4.84277C14.8545 4.84282 15.0495 4.88167 15.2315 4.9571C15.4135 5.03253 15.5789 5.14307 15.7181 5.2824C15.8574 5.42173 15.9679 5.58713 16.0432 5.76915C16.1186 5.95117 16.1573 6.14625 16.1573 6.34325C16.1572 6.54025 16.1184 6.73531 16.0429 6.9173C15.9675 7.09929 15.857 7.26463 15.7176 7.4039L11.1226 11.9999L15.7186 16.5959C15.862 16.7342 15.9763 16.8997 16.055 17.0826C16.1337 17.2656 16.1752 17.4624 16.177 17.6616C16.1788 17.8607 16.141 18.0583 16.0656 18.2427C15.9903 18.427 15.879 18.5946 15.7382 18.7355C15.5975 18.8764 15.43 18.9878 15.2457 19.0633C15.0614 19.1389 14.8639 19.1769 14.6647 19.1753C14.4656 19.1736 14.2687 19.1323 14.0857 19.0538C13.9026 18.9753 13.7371 18.8611 13.5986 18.7179L7.93863 13.0599H7.94063Z" fill="white"/></g><defs><clipPath id="clip0_263_943"><rect width="24" height="24" fill="white"/></clipPath></defs></svg></div>
                <div className={Style.SearchModel}>
                </div>
                <div></div>
            </div>
            <div style={{display:'flex',justifyContent:'space-around',alignItems:'center',width:'100%',marginBottom:'30px'}}>
                <div style={{color:'white',fontSize:'25px'}}>{name.split('-')[1].split('_').join(" ")}</div>
                <div><AddPaymentModes uuid={uuid} name={name} GetAllAmount={GetAllAmount}/></div>
            </div>
            <div className={Style.TableTag}>
                <table>
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th style={{minWidth:'300px'}}>Mode of Payment</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Data.map((item,index)=>{
                      return <tr key={index}>
                      <td style={{color:'white',textDecoration:'none'}}>{item.Date}</td>
                      <td>{item.Mode_Of_Payment}</td>
                      <td>{(+item.Advance).toLocaleString('en-IN', {style: 'currency',currency: 'INR'})}</td>
                      <DeleteIcon style={{cursor:'pointer'}} onClick={()=>{HandelDelete(index)}}/>
                    </tr>
                    })}
                  </tbody>
                </table>
            </div>
            <div style={{width:'40vw',display:'flex',margin:'0 30vw',justifyContent:'flex-end'}}><div style={{color:'white',margin:'20px'}}>Total {total.toLocaleString('en-IN', {style: 'currency',currency: 'INR'})}</div></div>
            <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'50px'}}>
                <div style={{maxWidth:'600px',width:'100%',display:'flex',justifyContent:'space-between'}}>
                    <PaymentUpdateSendBtn 
                      name={name}
                      total={total}
                      totalAmount={totalAmount}
                      cusname={cusname}
                      Mobile={Mobile}
                    />
                    <button onClick={()=>{downloadCSV(Data)}} style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'15px 20px', marginTop:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>Download as CSV</button>
                </div>
            </div> */}
    </Box>
  );

  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)} style={{cursor:'pointer'}}>{name.split('-')[1].split('_').join(' ')}</div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}