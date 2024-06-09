'use client'
import React, { useEffect, useState } from 'react'
import Styles from "./homestyle.module.css"
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import TemporaryDrawer from './RightDrawer';
import { FetchUserInFo, GetAllEventsDate } from './AllFunctions';
import Link from 'next/link';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditLeftDrawer from './EditDrawer';
import GreatingsLeftDrawer from './GreatingsDrawer';
import ReportLeftDrawer from './Report';
import AddPayment from './AddPayment';
import Image from 'next/image';
export default function HomePage({UserID}) {
    const [Array,ArrayValue] = useState([]);
    const [TodayDate,TodayDateValue] = useState(0);
    const [AddOpen,AddOpenValue] = useState(true);
    const [NotToShow,NotToShowValue] = useState([]);
    const [AddInfom,AddInfoValue] = useState([]);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const DaysArray = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    const [UsereInfo,SetUserInfo] = useState({});
    function getDaysOfCurrentMonth() {
        const today = new Date();
        const numDays = new Date(currentYear, currentMonth + 1, 0).getDate(); // corrected to get days of current month
        const daysOfMonth = [];
        const currentDate = today.getDate();
        for (let day = 1; day <= numDays; day++) {
            const DATE = new Date(currentYear, currentMonth, day);
            const FindDate = DATE.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
            daysOfMonth.push([FindDate.split(", ")[0], FindDate.split(", ")[1].split(" ")[1]]);
        }
        const arrayOfUndefined = [];
        for (let a = 0; a < DaysArray.indexOf(daysOfMonth[0][0]); a++) {
            arrayOfUndefined.push(a);
        }
        NotToShowValue(arrayOfUndefined);
        TodayDateValue(currentDate);
        ArrayValue(daysOfMonth);
    }
    const GetAllEvents = async()=>{
        const response = await GetAllEventsDate(currentMonth,currentYear);
        AddInfoValue(response);
        
    }
    const fetchuserInfofun = async()=>{
        const res = await FetchUserInFo();
        console.log(res);
        SetUserInfo(res);
    }
    const handleNextMonth = () => {
        setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
    };

    const handlePreviousMonth = () => {
        setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
    };

    const handleMonthChange = (event) => {
        setCurrentMonth(parseInt(event.target.value));
    };

    const handleYearChange = (event) => {
        setCurrentYear(parseInt(event.target.value));
    };
    useEffect(()=>{
        getDaysOfCurrentMonth();
        GetAllEvents();
    },[currentMonth,currentYear])
    useEffect(()=>{
        fetchuserInfofun();
    },[])
  return (
    <>
        <div className='flex min-h-screen' style={{backgroundColor:"var(--bg) !important"}}>
            <div className='flex flex-col items-center pt-8 gap-6' style={{width:'20em'}}>
                <div><Image src={UsereInfo?.Logo||''} alt='Logo' width={100} height={100} style={{width:'100px',borderRadius:'5px'}}/></div>
                {/* <div className={Styles.JustForFUN}><Image width={100} height={100} style={{width: '60px',height:'auto'}} src={!AddOpen?'/svg/AddCrm.svg':'/svg/CrossCrm.svg'} alt="search" onClick={()=>{!AddOpen?AddOpenValue(true):AddOpenValue(false)}}/></div> */}
                {AddOpen?<div className={Styles.JustForFUN} style={{marginTop:'20px',height:'60svh',justifyContent:'space-around'}}>
                    <EditLeftDrawer/>
                    <Link href="/"><Image width={100} height={100} src='/svg/AICrm.svg' alt="search" style={{width: '60px',height:'auto'}}/></Link>
                    <GreatingsLeftDrawer/>
                    <ReportLeftDrawer/>
                </div>:<></>}
            </div>
            <div className={Styles.MainContent} style={{display:"flex",flexDirection:"column",width:'100%'}}>
                <div className={Styles.NavSearchModel} style={{backgroundColor:"var(--bg)",display:"flex"}}>
                    {/* <div><Image src={UsereInfo?.Logo||''} alt='Logo' width={100} height={100} style={{width:'100px',borderRadius:'5px'}}/></div> */}
                    <div className={Styles.SearchModel}>
                            <div onClick={handlePreviousMonth}><ArrowLeftIcon color="primary" style={{fontSize:"30px",color:'black',cursor:'pointer'}}/></div>
                            <select
                            style={{color:'black',border:'none',outline:"none",fontSize:'16px',marginRight:'10px',marginLeft:'10px',cursor:'pointer',outline:'none',backgroundColor:"var(--bg)"}}
                            value={currentMonth}
                            onChange={handleMonthChange} 
                            >
                            {[0,1,2,3,4,5,6,7,8,9,10,11].map(i =>{
                                    return <option key={i} value={i}>
                                    {new Date(0, i).toLocaleString('default', { month: 'short' })}
                                    </option>
                            })}
                            </select>
                            <select
                            style={{backgroundColor:"var(--bg)",color:'black',marginRight:'10px',border:'none',outline:"none",fontSize:'16px'}}
                            value={currentYear}
                            onChange={handleYearChange} 
                            >
                            {[0,1,2,3,4,5,6,7,8,9,10,11].map(i =>{
                                    return <option key={i} value={new Date().getFullYear() - 1 + i}>
                                        {new Date().getFullYear() - 1 + i}
                                    </option>
                            })}
                            </select>
                            <div onClick={handleNextMonth}><ArrowRightIcon color="primary" style={{fontSize:"30px",color:'black',cursor:'pointer'}}/></div>
                    </div>
                    <div><TemporaryDrawer UserID={UserID}/></div>
                </div>
                <div className='flex gap-6 items-center w-full justify-end mb-4'>
                    <div className='flex gap-2 items-center text-sm'> <div style={{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:"#C870E0",color:"#000"}}></div>Lead</div>
                    <div className='flex gap-2 items-center text-sm'> <div style={{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:"#5079F9",color:"#000"}}></div>Advance paid</div>
                    <div className='flex gap-2 items-center text-sm'> <div style={{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:"#6E5FD3",color:"#000"}}></div>Editing</div>
                    <div className='flex gap-2 items-center text-sm'> <div style={{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:"#7BE276",color:"#000"}}></div>Event completed</div>
                    <div className='flex gap-2 items-center text-sm'> <div style={{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:"#EBBA54",color:"#000"}}></div>Balance settled</div>
                    <div className='flex gap-2 items-center text-sm'> <div style={{width:"12px",height:"12px",borderRadius:"50%",backgroundColor:"#F06976",color:"#000"}}></div>Delivered</div>
                </div>
                <div className={Styles.MainContentCalender}>
                    {NotToShow.map((item,index)=>{
                        return <div className={Styles.calenderboxNone} key={index}></div>
                    })}
                    {Array.map((item)=>{
                        return <div className={`${Styles.calenderbox} ${Styles.boxes}`} style={item[1] == `${TodayDate}`?{backgroundColor:"var(--darkblue)"}:{}}>
                            <div className={Styles.calenderboxDate} style={item[1] == `${TodayDate}`?{color:"#fff"}:{}}>{item[1]}</div>
                            {AddInfom.map((it,ind)=>{
                                if(it[0] == item[1]){
                                    return <><div className={Styles.EventNameBox} style={ColorAndBGcolor(it[2])} key={ind}><AddPayment uuid={it[3]} name={it[4]}/></div></>
                                }
                            })}
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>
  )
}
    
export function ColorAndBGcolor(status){
    if(status==''|| !status){
        return {
            backgroundColor:"#4F55C3;",
            color:"white"
        }
    }else if(status=='Lead'){
        return {
            backgroundColor:"#C870E0",
            color:"black"
        }
    }else if(status=='Advance paid'){
        return {
            backgroundColor:"#5079F9",
            color:"white"
        }
    }else if(status=='Editing'){
        return {
            backgroundColor:"#6E5FD3",
            color:"white"
        }
    }else if(status=='Event completed'){
        return {
            backgroundColor:"#7BE276",
            color:"white"
        }
    }else if(status=='Balance settled'){
        return {
            backgroundColor:"#EBBA54",
            color:"white"
        }
    }else if(status=='Delivered'){
        return {
            backgroundColor:"#F06976",
            color:"white"
        }
    }
}
export function DatePickerIcon({setValue}){
    return <div style={{border:'1px solid var(--blue)',color:"var(--blue)",borderRadius:'5px'}}><div className={Styles.datePicker}><LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
    onChange={(newValue) => {
        let date = newValue["$D"];
        let month = newValue["$M"]+1;
        let year = newValue["$y"];
      setValue(`${year}-${month<10?`0${month}`:month}-${date<10?`0${date}`:date}`);
    }}/></LocalizationProvider></div></div>
}

