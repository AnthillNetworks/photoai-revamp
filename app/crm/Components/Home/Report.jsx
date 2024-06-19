'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { PieChart } from 'react-minimal-pie-chart';
import Style from "./edit.module.css"
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import { GetCustomerFuntion,GetCustomerByStartAndEndDate,GetCustomerByStartAndEndAndNameDate,GetCustomerByNameDate } from './AllFunctions';
import { DatePickerIcon } from './page';
import Image from 'next/image';
import { Padding } from '@mui/icons-material';
import ExamplePieChart from './Charts';
export default function ReportLeftDrawer() {
  const [StartDate,SetStartDate] = React.useState('')
  const [Data,DataSet] = React.useState([]);
  const [EndDate,SetEndDate] = React.useState('')
  const [Tot,SetTot] = React.useState(0)
  const [Bal,SetBal] = React.useState(0)
  const [CusName,SetCusName] = React.useState('Over All')
  const [AllCustomerName,SetAllCustomerName] = React.useState([]);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const FetchCustomerData = async ()=>{
    const response = await GetCustomerFuntion();
    let total = 0;
    let balance = 0
    response.map((item)=>{
      total = total + item.Full_Amount
      balance = balance + item.Balance
    })
    console.log(total,balance,response);
    SetBal(balance)
    SetTot(total)
    DataSet(response);
    let CusName = [];
    {response.map((it)=>{
      CusName.push(it.Customer_Name)
    })}
    SetAllCustomerName(CusName);
    console.log(CusName);
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
  const HandelSubmit = async(st,en,name)=>{
    if(st.length == 10 && en.length == 10){
    if(isValidDateFormat(en)&&isValidDateFormat(st)){
      if(name === 'Over All'|| name==''){
        console.log(st,en)
        const response = await GetCustomerByStartAndEndDate(st,en);
        console.log(response)
        let total = 0;
        let balance = 0
        response.map((item)=>{
          total = total + item.Full_Amount
          balance = balance + item.Balance
        })
        SetBal(balance)
        SetTot(total)
      }else{
        if(AllCustomerName.includes(name)){
          const re = await GetCustomerByStartAndEndAndNameDate(st,en,name);
          let total = 0;
          let balance = 0
          re.map((item)=>{
            total = total + item.Full_Amount
            balance = balance + item.Balance
          })
          SetBal(balance)
          SetTot(total)
        }
      }}else{
        alert('Invalid Date Format')
    }}else if(AllCustomerName.includes(name)){
      const ress = await GetCustomerByNameDate(name);
      let total = 0;
      let balance = 0
      ress.map((item)=>{
        total = total + item.Full_Amount
        balance = balance + item.Balance
      })
      SetBal(balance)
      SetTot(total)
    }
  }
  React.useEffect(()=>{
    HandelSubmit(StartDate,EndDate,CusName);
  },[StartDate,EndDate])
  React.useEffect(()=>{
    FetchCustomerData();
  },[])

  const handleRefresh = () => {
    window.location.reload();
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (

    <Box className={`${Style.DrawerCenter} min-h-screen`} style={{backgroundColor:"var(--bg)"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <div  onClick={handleRefresh}>
          <img src="assets/homeicon.svg" alt="Home" className={Style.homeIcon} />
        </div>
        <div className='w-10/12 m-auto flex items-center flex-col pt-4 gap-4 min-h-screen' style={{width:'70%',margin:"auto"}}>
            {/* Header */}
            <div className='flex w-full items-center justify-between py-2' style={{borderBottom:"1px solid #4F55C3"}}>
              <div className='w-full px-4 py-2 flex gap-4 items-center'>
                <div className={Style.ForBackButton} onClick={()=>{setState({ ...state, [anchor]: false })}}>
                  <img src="/assets/backbtn.svg" alt="Back" style={{width:"20px",height:"20px"}}/>
                </div>
                <div style={{color:"var(--blue)",fontSize:"24px"}}>Insights</div>
              </div>
              <div className="flex items-center gap-4 w-fit" style={{border:"1px solid #D8D8D8",borderRadius:'5px',minWidth:"fit-content"}}><Image src="/assets/profile.svg" alt="Logo" width={100} height={100} className={Style.profile} /><div className="pr-6 text-sm font-bold">Studio name</div></div>
            </div>  

            {/* Desc */}
            <div className='flex items-start flex-col mt-4 w-full pl-8'>
              <div className='text-black font-medium'>Unlock the full potential of your photo studio! </div>
              <div className='text-black font-medium'>Track every sale and order with precision, gaining invaluable insights into your business performance.</div>
            </div>

            {/* Input */}
            <div className={`${Style.ReportsFilters} flex w-full pl-6 items-center justify-between flex-wrap`}>
              <div className='flex flex-col'>
                  <label className={Style.label} for="inputField">Customer Name</label>
                  <input type="text" list='nameOptions' id="inputField" className={Style.inputCon} value={CusName} onChange={(e) =>{SetCusName(e.target.value);HandelSubmit(StartDate,EndDate,e.target.value)}}/>
                  <datalist id="nameOptions" className={Style.datalistCon}>
                    <option value='Over All'/>
                    {AllCustomerName.map((it)=>{  
                      return <option value={it}/>
                    })}
                  </datalist>
              </div>
              <div className='flex gap-2'>
                <div>
                  <label className={Style.label} for="inputField">Start Date</label>
                  <div className={Style.datePickerCon}>
                    <DatePickerIcon setValue={SetStartDate}/>
                  </div>
                </div>
                <div>
                  <label className={Style.label} for="inputField">End Date</label>
                  <div className={Style.datePickerCon}>
                    <DatePickerIcon setValue={SetEndDate}/>
                  </div>
                </div>
              </div>
            </div>

            {/* AmountCon */}
            <div className='mt-8 flex flex-wrap items-center gap-4 w-full pl-8'>
              <div className='flex flex-col items-start bg-white justify-between px-4 py-6' style={{boxShadow:"rgba(0, 0, 0, 0.3) 0px 2px 2px 0px",borderRadius:"10px"}}>
                <div className='text-sm font-normal text-black'>Total Revenue</div>
                <div className='flex gap-1'><img src="/assets/rupee.svg" alt="Rupee" style={{width:"12px"}} /><div style={{color:"var(--orange)",fontSize:"34px"}} >{Tot.toLocaleString('en-IN', {currency: 'INR'})}</div></div>
              </div>
              <div className='flex flex-col items-start bg-white justify-between px-4 py-6' style={{boxShadow:"rgba(0, 0, 0, 0.3) 0px 2px 2px 0px",borderRadius:"10px"}}>
                <div className='text-sm font-normal text-black'>Paid Amount</div>
                <div className='flex gap-1'><img src="/assets/rupee.svg" alt="Rupee" style={{width:"12px"}} /><div style={{color:"var(--orange)",fontSize:"34px"}} >{(Tot-Bal).toLocaleString('en-IN', {currency: 'INR'})}</div></div>
              </div>
              <div className='flex flex-col items-start bg-white justify-between px-4 py-6' style={{boxShadow:"rgba(0, 0, 0, 0.3) 0px 2px 2px 0px",borderRadius:"10px"}}>
                <div className='text-sm font-normal text-black'>Balance Amount</div>
                <div className='flex gap-1'><img src="/assets/rupee.svg" alt="Rupee" style={{width:"12px"}} /><div style={{color:"var(--orange)",fontSize:"34px"}} >{Bal.toLocaleString('en-IN', {currency: 'INR'})}</div></div>
              </div>
            </div>

            {/* Charts */}
            <div className='bg -white w-full mt-6 mb-4'>
              <div className='flex items-start pl-8' style={{position:"relative",width:"32em"}}>
                <ExamplePieChart Bal={Bal} Tot={Tot} />
                {/* Legends */}
                <div style={{position:"absolute",top:"55%",right:"10%"}}>
                  <div className='flex gap-1 items-center'><div style={{width:"9px",height:"9px",borderRadius:"2px",backgroundColor:"var(--red)"}}></div><div style={{fontSize:"14px"}}>Total Revenue</div></div>
                  <div className='flex gap-1 items-center'><div style={{width:"9px",height:"9px",borderRadius:"2px",backgroundColor:"var(--paid)"}}></div><div style={{fontSize:"14px"}}>Paid Amount</div></div>
                  <div className='flex gap-1 items-center'><div style={{width:"9px",height:"9px",borderRadius:"2px",backgroundColor:"var(--bal)"}}></div><div style={{fontSize:"14px"}}>Balance Amount</div></div>
                </div>
              </div>
            </div>
        </div>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
        <div 
            onClick={toggleDrawer(anchor, true)} 
            className={`flex gap-4 items-center ${Style.NavOptions2}`} 
            style={{ cursor: "pointer" }}
          >
            <div className={Style.CustomerIcon2}></div>
            <div>Insights</div>
        </div>

        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
          {list(anchor)}
        </Drawer>
      </React.Fragment>
      ))}
    </div>
  );
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 7,
  width: '15vw',
  marginRight:'20px',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? 'gray' : '#308fe8',
  },
}));
const BorderPaidLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 7,
  width: '15vw',
  marginRight:'20px',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? '#13192f' : '#308fe8',
  },
}));
const BorderBalenceLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 7,
  width: '15vw',
  marginRight:'20px',
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === 'light' ? 'gray' : '#308fe8',
  },
}));