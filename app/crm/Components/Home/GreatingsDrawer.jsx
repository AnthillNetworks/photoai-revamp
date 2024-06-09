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

              {/* <div className={Style.NavSearchModel}>
                  <div className={Style.ForBackButton} onClick={()=>{setState({ ...state, [anchor]: false })}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_263_943)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.94063 13.0599C7.65973 12.7787 7.50195 12.3974 7.50195 11.9999C7.50195 11.6024 7.65973 11.2212 7.94063 10.9399L13.5966 5.2819C13.878 5.00064 14.2596 4.84268 14.6575 4.84277C14.8545 4.84282 15.0495 4.88167 15.2315 4.9571C15.4135 5.03253 15.5789 5.14307 15.7181 5.2824C15.8574 5.42173 15.9679 5.58713 16.0432 5.76915C16.1186 5.95117 16.1573 6.14625 16.1573 6.34325C16.1572 6.54025 16.1184 6.73531 16.0429 6.9173C15.9675 7.09929 15.857 7.26463 15.7176 7.4039L11.1226 11.9999L15.7186 16.5959C15.862 16.7342 15.9763 16.8997 16.055 17.0826C16.1337 17.2656 16.1752 17.4624 16.177 17.6616C16.1788 17.8607 16.141 18.0583 16.0656 18.2427C15.9903 18.427 15.879 18.5946 15.7382 18.7355C15.5975 18.8764 15.43 18.9878 15.2457 19.0633C15.0614 19.1389 14.8639 19.1769 14.6647 19.1753C14.4656 19.1736 14.2687 19.1323 14.0857 19.0538C13.9026 18.9753 13.7371 18.8611 13.5986 18.7179L7.93863 13.0599H7.94063Z" fill="white"/></g><defs><clipPath id="clip0_263_943"><rect width="24" height="24" fill="white"/></clipPath></defs></svg></div>
                  <div className={Style.SearchModel}>
                      <input type="text" placeholder="Search" onChange={(e)=>{DataValue(searchFun(e.target.value,ConstData))}}/>
                      <img src="/svg/crmsearch.svg" alt="search" />
                  </div>
                  <div><UploadImageOrVideo GetAllGreetins={GetAllGreetins}/></div>
              </div> */}
              {/* <div className={Style.TableTag} style={{maxHeight:"70vh",overflow:"scroll"}}>
                  <table>
                    <thead>
                      <tr>
                        <th>Greeting Name</th>
                        <th>Desc</th>
                        <th>Photo</th>
                        <th>Send</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Data.map((item,index)=>{
                      return <tr key={index}>
                        <td style={{color:'white',textDecoration:'none'}}>{item.Greeting_Name}</td>
                        <td style={{maxWidth:'300px',overflow:'hidden'}}>{item.Desc}</td>
                        <td style={{maxWidth:'300px',overflow:'hidden'}}>{item.Photo}</td>
                        <td><ReadyToSendSMS SendingData={item}/></td>
                      </tr>
                      })}
                    </tbody>
                  </table>
              </div> */}
              {IfIsOk?<></>:<></>}
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
        <div><img onClick={toggleDrawer(anchor, true)} src='/svg/GreatingsCrm.svg' alt="search" style={{width: '60px',height:'auto',cursor:'pointer'}}/></div>
        <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 1000, enter: 1000, exit: 1000 }}>
          {list(anchor)}
        </Drawer>
      </React.Fragment>
      ))}
    </div>
  );
}