'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Style from "./edit.module.css"
import DeleteIcon from '@mui/icons-material/Delete';
import AddPaymentModes from './AddPaymentModes';
import { GetEventsAmountByUUID,GetEventsTotalAmountByUUID,UpdateEventsAmountByUUID } from './AllFunctions';
import downloadCSV,{downloadEXCEL,downloadPDF,searchFun} from './DownloadCSV';
import { sendsmscrmofcustomersetelement } from '../../SendSMS';
import PaymentUpdateSendBtn from './PaymentUpdateSendBtn';
import Image from 'next/image';
export default function AddPayment({uuid,name,cusname,Mobile,EventDate,ConstCheckedData,SetConstCheckedData,OnOnStatusChange,Location,Email_ID,Full_Amount,AdvanceAmount,Bal,verbose}) {
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
    sendsmscrmofcustomersetelement(`${cusname}`,total,Mobile,`${name.split('-')[1].split('_').join(' ')}`,totalAmount);
    alert('Message Sent ...')
  }
  const [dropdownVisible, setDropdownVisible] = React.useState(false);
  const handleDownload = (format) => {
      switch (format) {
          case 'csv':
              downloadCSV(Data);
              break;
          case 'excel':
              downloadEXCEL(Data);
              break;
          case 'pdf':
              downloadPDF(Data);
              break;
          default:
              break;
      }
      setDropdownVisible(false);
  };
  const handleRefresh = () => {
    window.location.reload();
  };

  const list = (anchor) => (
    <Box className={`${Style.DrawerCenter} min-h-screen`} style={{backgroundColor:"var(--bg)"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
      <div  onClick={handleRefresh}>
          <img src="assets/homeicon.svg" alt="Home" className={Style.homeIcon} />
      </div>    
      <div className='w-10/12 m-auto flex items-center flex-col pt-4 gap-4 min-h-screen' style={{width:'80%',margin:"auto"}}>
        
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
            <div className='text-xl font-bold' style={{color:"var(--blue)"}}>{cusname}</div>
            <div className='text-lg font-bold' style={{color:"var(--blue)"}}>{Location}</div>
            <div className='flex gap-3 text-sm'><img src="/assets/call.svg" alt="Call" /><div style={{color:"var(--blue)"}}>{Mobile}</div></div>
            <div className='flex gap-3 text-sm'><img src="/assets/msg.svg" alt="Call" /><div style={{color:"var(--blue)"}}>{Email_ID}</div></div>
            <div className='text-sm flex gap-2'><div className='text-sm font-bold' style={{color:"var(--blue)"}}>Paid :</div><div style={{color:"var(--pink)"}}>$ {total}</div></div>
            <div className='text-sm flex gap-2'><div className='text-sm font-bold' style={{color:"var(--blue)"}}>Balance :</div><div style={{color:"var(--pink)"}}>$ {totalAmount-total}</div></div>
          </div>
          <div className='flex flex-col justify-between gap-10'>
            <div className='text-xl flex gap-2'><div className='text-xl font-bold' style={{color:"var(--blue)"}}>Total Amount :</div><div style={{color:"var(--pink)"}}>$ {totalAmount}</div></div>
              <div><PaymentUpdateSendBtn  name={name} total={total} totalAmount={totalAmount} cusname={cusname} Mobile={Mobile}/></div>
          </div>
        </div>

        {/* Con */}
        <div className='pl-8 my-4 flex items-center justify-between w-full'>
          <div style={{color:"var(--blue)",fontSize:"24px"}}>{name.split("-")[1]} Event</div>
          <div className='flex gap-6'>
            {/* <div onClick={()=>{downloadCSV(Data)}} className='flex items-center' style={{cursor:"pointer",border:"1px solid var(--pink)",borderRadius:"5px",padding:"4px 2em",fontSize:"14px",backgroundColor:"var(--bg)",color:"var(--pink)",outline:"none"}}> Download </div> */}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <button 
                  className={Style.searchBtn} 
                  style={{ display:"flex", gap:"1em",alignItems:"center",justifyContent:"space-between",border: "1px solid var(--pink)", color: "var(--pink)", backgroundColor: "var(--bg)" }}
                  onClick={() => setDropdownVisible(!dropdownVisible)} 
              >
                  Download as <img src="/assets/downarr.svg" alt="Down Arrow" />
              </button>
              {dropdownVisible && (
                  <div className={`${Style.dropdown} flex flex-col py-2`} style={{ position: 'absolute', top: '100%', left: "85px", zIndex: 1 }}>
                      <div style={{borderBottom:"1px solid black",width:"4em"}}>
                        <button style={{padding:"0em .7em",fontSize:"14px"}} onClick={() => handleDownload('csv')}>CSV</button>
                      </div>
                      <div style={{borderBottom:"1px solid black",width:"4em"}}>
                        <button style={{padding:"0em .7em",fontSize:"14px"}} onClick={() => handleDownload('excel')}>EXCEL</button>
                      </div>
                      <div style={{borderBottom:"1px solid black",width:"4em"}} >
                        <button style={{padding:"0em .7em",fontSize:"14px"}} onClick={() => handleDownload('pdf')}>PDF</button>
                      </div>
                  </div>
              )}
            </div>
            <div><AddPaymentModes uuid={uuid} name={name} GetAllAmount={GetAllAmount}/></div>
          </div>
        </div>
        
        {/* Table */}
        <div className={Style.tableContainer} style={{width:"40em",backgroundColor:"white",borderRadius:"10px",marginLeft:"2em",alignSelf:"self-start",padding:"0 0 4px 0"}}>
          <div className={`${Style.table} bg-white`}>
            <div className={Style.tableHeader}>
              <div className={Style.tableRow}>
                <div className={Style.tableHeaderCell}>Date</div>
                <div className={Style.tableHeaderCell} style={{ minWidth: '300px' }}>Mode of Payment</div>
                <div className={Style.tableHeaderCell}>Amount</div>
                <div style={{flex:".25"}} className={Style.tableHeaderCell}> </div>
              </div>
            </div>
            <div className={Style.tableBody}>
              {Data.map((item, index) => (
                <>
                  <div className={`${Style.tableRow} bg-white`} key={index}>
                    <div className={Style.tableCell} style={{ color: 'black', textDecoration: 'none' }}>{item.Date}</div>
                    <div className={Style.tableCell}>{item.Mode_Of_Payment}</div>
                    <div className={`${Style.tableCell}`}>
                      {(+item.Advance).toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </div>
                    <div style={{flex:".25"}}>
                      <img src="/assets/delete.svg" alt="Del" style={{ cursor: 'pointer' }} onClick={() => { HandelDelete(index) }}/>
                      {/* <DeleteIcon className={Style.deleteIcon} style={{ cursor: 'pointer' }} onClick={() => { HandelDelete(index) }} /> */}
                    </div>
                  </div>
                </>
              ))}
            </div>
        </div>
        </div>

      </div>

    </Box>
  );

  return (
    <div>
      {['bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)} style={{cursor:'pointer'}}>

            <div className={verbose ? Style.customTableCell2 : Style.customTableCell1 } style={{minWidth:"10em"}}>
              {name.split('-')[1].split('_').join(' ')}
            </div>
            <div className={Style.customTableCell1} style={{minWidth:"10em"}}>{EventDate}</div>
            <div className={Style.customTableCell1} style={{minWidth:"10em"}}>
              {Full_Amount}
            </div>
            <div className={Style.customTableCell1} style={{minWidth:"10em"}}>
              {AdvanceAmount}
            </div>
            <div className={Style.customTableCell1} style={{minWidth:"10em"}}>
              {Bal}
            </div>

          </div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
