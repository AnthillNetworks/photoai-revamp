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


  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    // <Box className={Style.DrawerCenterDivDiv} style={{backgroundColor:"#13192f"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
    //           <div style={{marginLeft:'10vw',marginTop:'4vw'}}>
    //               <div style={{color:'white',display:'flex',alignItems:'center',cursor:'pointer'}} onClick={()=>{setState({ ...state, [anchor]: false })}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_263_943)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.94063 13.0599C7.65973 12.7787 7.50195 12.3974 7.50195 11.9999C7.50195 11.6024 7.65973 11.2212 7.94063 10.9399L13.5966 5.2819C13.878 5.00064 14.2596 4.84268 14.6575 4.84277C14.8545 4.84282 15.0495 4.88167 15.2315 4.9571C15.4135 5.03253 15.5789 5.14307 15.7181 5.2824C15.8574 5.42173 15.9679 5.58713 16.0432 5.76915C16.1186 5.95117 16.1573 6.14625 16.1573 6.34325C16.1572 6.54025 16.1184 6.73531 16.0429 6.9173C15.9675 7.09929 15.857 7.26463 15.7176 7.4039L11.1226 11.9999L15.7186 16.5959C15.862 16.7342 15.9763 16.8997 16.055 17.0826C16.1337 17.2656 16.1752 17.4624 16.177 17.6616C16.1788 17.8607 16.141 18.0583 16.0656 18.2427C15.9903 18.427 15.879 18.5946 15.7382 18.7355C15.5975 18.8764 15.43 18.9878 15.2457 19.0633C15.0614 19.1389 14.8639 19.1769 14.6647 19.1753C14.4656 19.1736 14.2687 19.1323 14.0857 19.0538C13.9026 18.9753 13.7371 18.8611 13.5986 18.7179L7.93863 13.0599H7.94063Z" fill="white"/></g><defs><clipPath id="clip0_263_943"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>Back</div>
    //           </div>
    //           <div className={Style.ReportLeftDrawer}>
    //             <div className={Style.Reports}>Reports</div>
    //             <div className={Style.ReportsFilters}>
    //               <div><div className={Style.inputcontainer}><label className={Style.label} for="inputField">Start Date</label><DatePickerIcon setValue={SetStartDate}/></div></div>
    //               <div><div className={Style.inputcontainer}><label className={Style.label} for="inputField">End Date</label><DatePickerIcon setValue={SetEndDate}/></div></div>
    //               <div><div className={Style.inputcontainer}><label className={Style.label} for="inputField">Customer Name</label><input className={Style.input} type="text" list='nameOptions' id="inputField" value={CusName} onChange={(e) =>{SetCusName(e.target.value);HandelSubmit(StartDate,EndDate,e.target.value)}}/><datalist id="nameOptions">
    //                   <option value='Over All'/>
    //                   {AllCustomerName.map((it)=>{
    //                     return <option value={it}/>
    //                   })}
    //                 </datalist></div></div>
    //             </div>
    // 
    //             <div>
    //               <div className={Style.CustomerDiv}>
    //                 <div className={Style.CustomerName}>{CusName == ''?'Over All':CusName}</div>
    //                 <div className={Style.PieChartCssFlex}>
    //                   <div className={Style.PieChartCss}><PieChart data={[{ title: 'Paid', value: Tot-Bal, color: '#13192f' },{ title: 'Balance', value: Bal, color: '#979ea7'},]}/></div>
    //                   <div className={Style.PieChartCssPrice}>
    //                     <div>
    //                       <div>Total Amount</div>
    //                       <div className={Style.ProgressFlex}>
    //                         <div><BorderLinearProgress variant="determinate" value={100} /></div>
    //                         <div>{Tot.toLocaleString('en-IN', {style: 'currency',currency: 'INR'})}</div>
    //                       </div>
    //                     </div>
    //                     <div>
    //                       <div>Paid</div>
    //                       <div className={Style.ProgressFlex}>
    //                         <div><BorderPaidLinearProgress variant="determinate" value={(((Tot-Bal)/Tot)*100)} /></div>
    //                         <div>{(Tot-Bal).toLocaleString('en-IN', {style: 'currency',currency: 'INR'})}</div>
    //                       </div>
    //                     </div>
    //                     <div>
    //                       <div>Balance</div>
    //                       <div className={Style.ProgressFlex}>
    //                         <div><BorderBalenceLinearProgress variant="determinate" value={((Bal/Tot)*100)} /></div>
    //                         <div>{Bal.toLocaleString('en-IN', {style: 'currency',currency: 'INR'})}</div>
    //                       </div>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    // </Box>

    <Box className={`${Style.DrawerCenter} min-h-screen`} style={{backgroundColor:"var(--bg)"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <div className='w-10/12 m-auto flex items-center flex-col pt-4 gap-4' style={{width:'70%',margin:"auto"}}>
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
              <div className='flex items-start pl-8' style={{position:"relative"}}>
                <ExamplePieChart Bal={Bal} Tot={Tot} />
                {/* Legends */}
                <div style={{position:"absolute",top:"45%",right:"40%"}}>
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
        {/* <div><Image onClick={toggleDrawer(anchor, true)} src='/svg/report.svg' alt="search" width={100} height={100} style={{width: '60px',height:'auto',cursor:'pointer'}}/></div> */}
        <div onClick={toggleDrawer(anchor, true)} className='flex gap-2' style={{cursor:"pointer"}}>
              <img src="/assets/ininsights.svg" alt="Customer" style={{width: '20px',height:'20',objectFit:"contain",cursor:'pointer'}}/>
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