'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Style from "./edit.module.css"
import downloadCSV,{searchFun} from './DownloadCSV';
import CreateEvent from './CreateEvent';
import { DatePickerIcon } from './page';
import Confirm from './confirm';
import AddPayment from './AddPayment';
import { GetEventNameByDate, GetEventsByUUID, UpdateStatusByUUID,DeleteCustomerEventFuntion } from './AllFunctions';
import { ColorAndBGcolor } from './page';
import UpdateEventDetails from './UpdateCustomerDetail';
import sendsmscrm from '../../SendSMS';
import EventDetailsSendBtn from './EventDetailsSendBtn';
import Image from 'next/image';
import GetCustomerDetailsByName from './GetCustomerDetailsByName';
export const TableCkeckBox = ({item,ConstCheckedData,cusname,SetConstCheckedData,OnStatusChange,Mobile,Location,Email_ID})=>{
  const [StatusValue,SetStatusValue] = React.useState(item.Status);
  let AdvanceAmount = 0;
  item.Advance_Payment.map((it)=>{
    AdvanceAmount += +it.Advance;
  })
  return <div className={Style.customTableRow}>
  <div className={Style.customTableCell}>
    <AddPayment uuid={item.Customer_ID_UUID} name={item.EventName} cusname={cusname} OnStatusChange={OnStatusChange} Mobile={Mobile} item={item.EventDate} ConstCheckedData={ConstCheckedData} SetConstCheckedData={SetConstCheckedData} Location={Location} Email_ID={Email_ID}/>
  </div>
  <div className={Style.customTableCell}>{item.EventDate}</div>
  <div className={Style.customTableCell}>
    {item.Full_Amount.toLocaleString('en-IN', {style: 'currency', currency: 'INR'})}
  </div>
  <div className={Style.customTableCell}>
    {AdvanceAmount.toLocaleString('en-IN', {style: 'currency', currency: 'INR'})}
  </div>
  <div className={Style.customTableCell}>
    {(item.Full_Amount - AdvanceAmount).toLocaleString('en-IN', {style: 'currency', currency: 'INR'})}
  </div>
  <div className={Style.customTableCell}>
    <select
      className={Style.customSelect}
      style={{...ColorAndBGcolor(StatusValue), border: 'none', outline: 'none',color:"black",cursor: 'pointer', fontSize: '16px',borderRadius:"5px",padding:"4px"}}
      value={StatusValue}
      onChange={(e) => {
        SetStatusValue(e.target.value);
        OnStatusChange(item.EventID, e.target.value);
      }}
    >
      <option value="">Status</option>
      <option value="Lead" style={ColorAndBGcolor('Lead')}>Lead</option>
      <option value="Advance paid" style={ColorAndBGcolor('Advance paid')}>Advance paid</option>
      <option value="Editing" style={ColorAndBGcolor('Editing')}>Editing</option>
      <option value="Event completed" style={ColorAndBGcolor('Event completed')}>Event completed</option>
      <option value="Balance settled" style={ColorAndBGcolor('Balance settled')}>Balance settled</option>
      <option value="Delivered" style={ColorAndBGcolor('Delivered')}>Delivered</option>
    </select>
  </div>
  <div className={Style.customTableCell} style={{border: 'none', backgroundColor:"var(--bg)"}}>
    <img
      className={Style.customImage}
      style={{width: '20px', cursor: 'pointer'}}
      onClick={() => {if(ConstCheckedData){SetConstCheckedData(null)}else{SetConstCheckedData(item)}}}
      src={ConstCheckedData?.EventID !== item.EventID ? '/svg/CheckedFalse.svg' : '/svg/CheckedTrue.svg'}
      alt=""
    />
  </div>
</div>
}
export default function EventDetailsToDownload({id,name,Mobile,Location,Email_ID}) {
    const [Data,SetData] = React.useState([]);
    const [ConstData,SetConstData] = React.useState([]);
    const [csvData,SetcsvData] = React.useState([]);
    const [StartDate,SetStartDate] = React.useState('')
    const [ConstCheckedData,SetConstCheckedData] = React.useState(null);
    const [EndDate,SetEndDate] = React.useState('')
    const [total,settotval] = React.useState(0);
    const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const HandelDelete = async()=>{
    const result = window.confirm("Are you sure you want to delete?");
    if(result){
      const response = await DeleteCustomerEventFuntion(ConstCheckedData.EventID);
      if(response){
        FetchEventsByUUID();
      }else{
        alert("Something went wrong");
      }
    }
  }
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const FetchEventsByUUID = async()=>{
    const response = await GetEventsByUUID(id);
    SetConstData(response);
    let tot = 0;
    for(let a = 0;a<response.length;a++){
      let AdvanceAmount = 0;
      response[a].Advance_Payment.map((it)=>{
        AdvanceAmount += +it.Advance;
      })
      tot = tot + (+response[a].Full_Amount - AdvanceAmount)
    }
    settotval(tot)
    SetData(response);
  }
  const FetchCusDetailsByName = async () => {
    const response = await GetCustomerDetailsByName(name);
  }
  const OnStatusChange = async(EventID,e)=>{
    const response = await UpdateStatusByUUID(EventID,e);
  }
  React.useEffect(()=>{
    FetchEventsByUUID();
    // FetchCusDetailsByName();
  },[]);
  const downloadCSVFunction = async()=>{
    const Array = [];
    for(let a = 0;a<Data.length;a++) {
      let AdvanceAmount = 0;
      Data[a].Advance_Payment.map((it)=>{
        AdvanceAmount += +it.Advance;
      })
      Array.push({"Event_Name":Data[a].EventName,"EventDate":Data[a].EventDate,"Full_Amount":Data[a].Full_Amount,"Paid_Amount":AdvanceAmount,"Balance":(+Data[a].Full_Amount - AdvanceAmount),"Status":Data[a].Status});
    }
    downloadCSV(Array)
  }
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
  const HandelDateFilter = async()=>{
    if(isValidDateFormat(StartDate) && isValidDateFormat(EndDate)){
      const response = await GetEventNameByDate(StartDate,EndDate,id);
      SetConstData(response);
      let tot = 0;
      for(let a = 0;a<response.length;a++){
        let AdvanceAmount = 0;
        response[a].Advance_Payment.map((it)=>{
          AdvanceAmount += +it.Advance;
        })
        tot = tot + (+response[a].Full_Amount - AdvanceAmount)
      }
      settotval(tot)
      SetData(response);
    }
  }
  React.useEffect(()=>{
    HandelDateFilter()
  },[StartDate,EndDate])
  const HandelSendSMS = async()=>{
    if(ConstCheckedData){
      let AdvanceAmount = 0;
      ConstCheckedData.Advance_Payment.map((it)=>{
        AdvanceAmount += +it.Advance;
      })
      sendsmscrm(name,ConstCheckedData.EventName.split('-')[1],ConstCheckedData.Status,ConstCheckedData.Full_Amount,AdvanceAmount,Mobile);
      alert('Message Send ...');
    }
  }
  const list = (anchor) => (
    <Box className={`${Style.DrawerCenter} min-h-screen overflow-scroll`} style={{backgroundColor:"var(--bg)",overflow:"scroll !important"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
 
      <div className='min-h-screen overflow-scroll w-10/12 m-auto flex items-center justify-center flex-col pt-4 gap-4' style={{width:'80%',margin:"auto",overflow:"scroll !important"}}>
        
        {/* Header */}
        <div className='flex w-full items-center justify-between py-2' style={{borderBottom:"1px solid var(--blue)"}}>
          <div className='w-full px-4 py-2 flex gap-4 items-center'>
            <div className={Style.ForBackButton} onClick={()=>{setState({ ...state, [anchor]: false })}}>
              {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_263_943)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.94063 13.0599C7.65973 12.7787 7.50195 12.3974 7.50195 11.9999C7.50195 11.6024 7.65973 11.2212 7.94063 10.9399L13.5966 5.2819C13.878 5.00064 14.2596 4.84268 14.6575 4.84277C14.8545 4.84282 15.0495 4.88167 15.2315 4.9571C15.4135 5.03253 15.5789 5.14307 15.7181 5.2824C15.8574 5.42173 15.9679 5.58713 16.0432 5.76915C16.1186 5.95117 16.1573 6.14625 16.1573 6.34325C16.1572 6.54025 16.1184 6.73531 16.0429 6.9173C15.9675 7.09929 15.857 7.26463 15.7176 7.4039L11.1226 11.9999L15.7186 16.5959C15.862 16.7342 15.9763 16.8997 16.055 17.0826C16.1337 17.2656 16.1752 17.4624 16.177 17.6616C16.1788 17.8607 16.141 18.0583 16.0656 18.2427C15.9903 18.427 15.879 18.5946 15.7382 18.7355C15.5975 18.8764 15.43 18.9878 15.2457 19.0633C15.0614 19.1389 14.8639 19.1769 14.6647 19.1753C14.4656 19.1736 14.2687 19.1323 14.0857 19.0538C13.9026 18.9753 13.7371 18.8611 13.5986 18.7179L7.93863 13.0599H7.94063Z" fill="white"/></g><defs><clipPath id="clip0_263_943"><rect width="24" height="24" fill="white"/></clipPath></defs></svg> */}
              <img src="/assets/backbtn.svg" alt="Back" style={{width:"20px",height:"20px"}}/>
            </div>
            <div style={{color:"var(--blue)",fontSize:"24px"}}>Customers Details</div>
          </div>
          <div className="flex items-center gap-4" style={{minWidth:"fit-content",border:"1px solid #D8D8D8",borderRadius:'5px'}}><Image src="/assets/profile.svg" alt="Logo" width={100} height={100} className={Style.profile} /><div className="pr-6 text-sm font-bold w-fit">Studio name</div></div>
        </div>

        {/* Details */}
        <div className='flex w-full pl-8 justify-between pb-6' style={{borderBottom:"1px solid var(--blue)"}}>
          <div className='flex flex-col gap-3'>
            <div className='text-xl font-bold' style={{color:"var(--blue)",fontSize:"26px"}}>{name}</div>
            <div className='text-lg font-bold' style={{color:"var(--blue)",fontSize:"16px"}}>{Location}</div>
            <div className='flex gap-3 text-sm'><img src="/assets/call.svg" alt="Call" /><div style={{color:"var(--blue)"}}>{Mobile}</div></div>
            <div className='flex gap-3 text-sm'><img src="/assets/msg.svg" alt="Call" /><div style={{color:"var(--blue)"}}>{Email_ID}</div></div>
          </div>
          <div className='flex flex-col justify-between gap-10'>
            <div className='text-xl flex gap-2'><div className='text-xl font-bold' style={{color:"var(--blue)",fontSize:"26px"}}>Balance :</div><div style={{color:"var(--pink)"}}>$ {`${total}`}</div></div>
            <div><EventDetailsSendBtn name={name} ConstCheckedData={ConstCheckedData} Mobile={Mobile} /></div>
          </div>
          <div className='flex items-center'>
            { ConstCheckedData ? <>
                <div className='flex flex-col justify-between gap-6'>
                  <div className='flex gap-3 items-end justify-end'><div style={{fontSize:'14px',color:"#A0A0A0"}}>Edit</div><UpdateEventDetails FetchCustomerData={FetchEventsByUUID} Data={ConstCheckedData}/></div>
                  <div className='flex gap-3 items-end justify-end'><div style={{fontSize:'14px',color:"#A0A0A0"}}>Delete</div><img src='/assets/del.svg' style={{cursor:'pointer',width:"24px",height:"24px"}} onClick={HandelDelete}/></div>
                </div>  </>: <></>
            }
          </div>
        </div>

        {/* DateCon */}
        <div className='pl-8 my-4 flex items-center justify-between w-full'>
          <div style={{color:"var(--blue)",fontSize:"24px"}}>Event</div>
          <div className='flex gap-6'>
            <div onClick={()=>{downloadCSVFunction()}} style={{cursor:"pointer",border:"1px solid var(--pink)",borderRadius:"5px",padding:"4px 2em",fontSize:"14px",backgroundColor:"var(--bg)",color:"var(--pink)",outline:"none"}}> Download </div>
            <div><CreateEvent id={id} FetchEventsByUUID={FetchEventsByUUID}/></div>
          </div>
        </div>
        <div className='pl-8 my-4 flex items-center w-full'>  
          <div>
              <div className='flex gap-4'>
                <div><div className={Style.inputcontainer}><label className={Style.label} for="inputField">Start Date</label><DatePickerIcon setValue={SetStartDate}/></div></div>
                <div><div className={Style.inputcontainer}><label className={Style.label} for="inputField">End Date</label><DatePickerIcon setValue={SetEndDate}/></div></div>
              </div>
          </div>
          <div className={`flex gap-2 bg-white items-center`} style={{borderRadius:"5px",padding:"4px 8px",minWidth:'fit-content',boxShadow:"0px 2px 2px 0px rgba(0, 0, 0, 0.25)"}}>
            <div><img src="/assets/srh.svg" alt="Search" style={{width:"18px",height:"18px",outline:"none",border:"none"}}/></div>
            <div className='w-full'>
              <input type="text" placeholder="Search" className='w-full outline-none border-none' onChange={(e)=>{SetData(searchFun(e.target.value,ConstData))}}/>
            </div>
        </div>
        </div>

        {/* Table */}

        <div className={Style.customTableContainer}>
          <div className={Style.customTable}>
            <div className={Style.customTableHeader}>
              <div className={Style.customTableRow}>
                <div className={Style.customTableCell}>Event Name</div>
                <div className={Style.customTableCell}>Date</div>
                <div className={Style.customTableCell}>Full Amount</div>
                <div className={Style.customTableCell}>Paid Amount</div>
                <div className={Style.customTableCell}>Balance</div>
                <div className={Style.customTableCell}>Status</div>
              </div>
            </div>
            <div className={Style.customTableBody}>
              {Data.map((item, index) => (
                <TableCkeckBox
                  item={item}
                  ConstCheckedData={ConstCheckedData}
                  cusname={name}
                  SetConstCheckedData={SetConstCheckedData}
                  key={index}
                  OnStatusChange={OnStatusChange}
                  Mobile={Mobile}
                  Location={Location}
                  Email_ID={Email_ID}
                />
              ))}
              {/* <div className={Style.customTableRow}>
                <div className={Style.customTableCell} style={{border: 'none', backgroundColor: 'var(--white)'}}></div>
                <div className={Style.customTableCell} style={{border: 'none', backgroundColor: 'var(--white)'}}></div>
                <div className={Style.customTableCell} style={{border: 'none', backgroundColor: 'var(--white)'}}></div>
                <div className={Style.customTableCell} style={{border: 'none', backgroundColor: 'var(--white)'}}>Total</div>
                <div className={Style.customTableCell} style={{border: 'none', backgroundColor: 'var(--white)'}}>
                  {total.toLocaleString('en-IN', {style: 'currency', currency: 'INR'})}
                </div>
              </div> */}
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
          <div onClick={toggleDrawer(anchor, true)}>
            {name}
          </div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}