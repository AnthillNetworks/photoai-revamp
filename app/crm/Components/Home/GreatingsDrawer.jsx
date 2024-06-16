'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import EditCreate from './EditCreate';
import { searchFun } from './DownloadCSV';
import Style from "./edit.module.css"
import UploadImageOrVideo from './uploaddrawer';
import { CreateCustomerGrettingsFuntion, GetCustomerGrettingsFuntion } from './AllFunctions';
import ReadyToSendSMS from './RedyToSend';
import Image from 'next/image';
export default function GreatingsLeftDrawer() {
  const [Data,DataValue] = React.useState([]);
  const [ConstData,ConstDataValue] = React.useState([]);
  const [IfIsOk,SetIfIsOk] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const GetAllGreetins = async()=>{
    const response = await GetCustomerGrettingsFuntion();
    DataValue(response);
    ConstDataValue(response);
  }
  React.useEffect(()=>{
    GetAllGreetins();
  },[])
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [GreatingsCrm,GreatingsCrmValue] = React.useState('');
  const [GreatingsDes,GreatingsDesValue] = React.useState('');
  const [PhotoURL,SetPhotoURL] = React.useState('');
  const HandelSubmit = async(e)=>{
    e.preventDefault();
      const response = await CreateCustomerGrettingsFuntion(GreatingsCrm,GreatingsDes,PhotoURL);
      if(response){
        GetAllGreetins();
        GreatingsDesValue("");
        GreatingsCrmValue("");
        SetPhotoURL("");
        alert("Greeting Saved ..")
      }
    }

  const list = (anchor) => (
    <Box className={`${Style.DrawerCenter} min-h-screen`} style={{backgroundColor:"var(--bg)"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
              
        <div className='w-10/12 m-auto flex items-center flex-col pt-4 gap-4' style={{width:'80%',margin:"auto",overflow:"scroll"}}>
            {/* Header */}
            <div className='flex w-full items-center justify-between py-2' style={{borderBottom:"1px solid #4F55C3"}}>
              <div className='w-full px-4 py-2 flex gap-4 items-center'>
                <div className={Style.ForBackButton} onClick={()=>{setState({ ...state, [anchor]: false })}}>
                  <img src="/assets/backbtn.svg" alt="Back" style={{width:"20px",height:"20px"}}/>
                </div>
                <div style={{color:"var(--blue)",fontSize:"24px"}}>Send Greetings</div>
              </div>
              <div className="flex items-center gap-4 w-fit" style={{border:"1px solid #D8D8D8",borderRadius:'5px',minWidth:"fit-content"}}><Image src="/assets/profile.svg" alt="Logo" width={100} height={100} className={Style.profile} /><div className="pr-6 text-sm font-bold">Studio name</div></div>
            </div>  

            {/* Desc */}
            <div className='flex items-start flex-col mt-4 w-full pl-8'>
              <div className='font-medium' style={{color:"var(--blue)"}}>Use Send Greetings feature to share personalized messages and cherished memories!</div>
            </div>

            {/* Add Greeting */}
            {/* <div><UploadImageOrVideo GetAllGreetins={GetAllGreetins}/></div> */}
            <form onSubmit={HandelSubmit} className={`${Style.formDiv} w-full pl-8`}>
              <div className='text-xl mb-4' style={{color:"var(--blue)"}}>Add Greeting</div>
              <div className='flex justify-between'>
                <div className='w-10/12 flex flex-col gap-4'>
                  <div className='flex flex-col'>
                    <label htmlFor="name" style={{fontSize:"14px",color:"black"}}>Greeting name</label>
                    <input type='text' value={GreatingsCrm} onChange={(e)=>{GreatingsCrmValue(e.target.value)}} style={{width:'90%',backgroundColor:'none',border:'none',padding:'4px 8px',border:"1px solid var(--blue)",borderRadius:'5px',fontSize:'15px',outline:'none',color:'#000'}} placeholder="Greeting Name" required/>
                  </div>
                  <div className='flex flex-col'>
                    <label htmlFor="name" style={{fontSize:"14px",color:"black"}}>Description</label>
                    <textarea type='text' value={GreatingsDes} onChange={(e)=>{GreatingsDesValue(e.target.value)}} style={{minHeight:'8em',maxHeight:"8em",width:'90%',backgroundColor:'none',border:'none',padding:'4px 8px',border:"1px solid var(--blue)",borderRadius:'5px',fontSize:'15px',outline:'none',color:'#000'}} placeholder="Description" required/>
                  </div>
                </div>
                <div className='w-10/12 flex flex-col gap-4'>
                  <div>
                    <label htmlFor="name" style={{fontSize:"14px",color:"black"}}>Paste Image Url</label>
                    <textarea type='text' value={PhotoURL} onChange={(e)=>{SetPhotoURL(e.target.value)}} style={{minHeight:'8em',maxHeight:"8em",width:'90%',backgroundColor:'none',border:'none',padding:'4px 8px',border:"1px solid var(--blue)",borderRadius:'5px',fontSize:'15px',outline:'none',color:'#000'}} placeholder="Photo URL"/>
                  </div>
                  <div>
                    <button type='submit' style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'4px 8px',cursor:'pointer',backgroundColor:'var(--pink)',color:'#fff'}}>Save</button>
                  </div>
                </div>
              </div>
              <div>
              </div>
            </form>

            {/* SearchCOn */}
            <div className="flex w-full pl-8 items-center mt-4 gap-8">
            <div className='text-xl text-normal' style={{color:"var(--blue)"}}>Saved Greeting</div>
              <div className={Style.SearchModel}>
                  <input type="text" placeholder="Search" style={{boxShadow:"0px 3px 3px 0px rgba(0, 0, 0, 0.25)"}}  onChange={(e)=>{DataValue(searchFun(e.target.value,ConstData))}}/>
                  {/* <img src="/svg/crmsearch.svg" alt="search" /> */}
              </div>
            </div>

            {/* Table */}
            <div className={Style.allGreet}>
              {Data.map((item,index)=>{

                return <div className='w-full flex items-center justify-between'>
                  <div className='flex gap-10'>
                    <div><img src={`${item.Photo}`} alt="" className={Style.greetImg} /></div>
                    <div className='flex flex-col gap-2'>
                      <div style={{fontSize:"25px",fontWeight:"540px",color:"var(--black)",fontWeight:"400"}}>{item.Greeting_Name}</div>
                      <div>{item.Desc}</div>
                    </div>
                  </div>
                  <div><ReadyToSendSMS SendingData={item}/></div>
                </div>
                // return <tr key={index}>
                //   <td style={{color:'white',textDecoration:'none'}}>{item.Greeting_Name}</td>
                //   <td style={{maxWidth:'300px',overflow:'hidden'}}>{item.Desc}</td>
                //   <td style={{maxWidth:'300px',overflow:'hidden'}}>{item.Photo}</td>
                //   <td><ReadyToSendSMS SendingData={item}/></td>
                // </tr>
              })}
            </div>
        </div>
              {IfIsOk?<></>:<></>}
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
        <div 
            onClick={toggleDrawer(anchor, true)} 
            className={`flex gap-4 items-center ${Style.NavOptions1}`} 
            style={{ cursor: "pointer" }}
          >
            <div className={Style.CustomerIcon1}></div>
            <div>Send Greetings</div>
          </div>
        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
          {list(anchor)}
        </Drawer>
      </React.Fragment>
      ))}
    </div>
  );
}