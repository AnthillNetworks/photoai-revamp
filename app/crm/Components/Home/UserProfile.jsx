'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Styles from "./homestyle.module.css"
import { FetchUserInFo, Logout, UpdatePassword, UpdateUserInFo, UpdateUserInfoLogo } from './AllFunctions';
import Image from 'next/image';
export default function TemporaryDrawer_({UserID}) {
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

    //  First
    const [open, setOpen] = React.useState(false);
    const [Name,nameVAlue] = React.useState(UserID);
    const HandeLogoUpload = async(photo)=>{
        const nameofFile = new Date();
        const uniqueNumber = generateUniqueNumber(nameofFile);
        const s3Client = new S3Client({
        region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
        credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY,
        },
        });
        const uploadCommand = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: `studio-logo/${uniqueNumber}.jpg`,
        Body: photo,
        ACL: "public-read",
        });
        const respo = await s3Client.send(uploadCommand);
        if (respo.$metadata.httpStatusCode == 200) {
        const res = await UpdateUserInfoLogo(`https://selife-bucket.s3.ap-south-1.amazonaws.com/studio-logo/${uniqueNumber}.jpg`);
        if(res){
            location.reload();
        }else{
            alert('Something Went Wrong...')
        }
        }
    }

    // Second
    const [PhoneNo,SetPhoneNo] = React.useState('');
    const [Location,SetLocation] = React.useState('');
    const [Website,SetWebsite] = React.useState('');
    const handleClick = () => {
        setOpen(!open);
    };
    const FetchInfo = async()=>{
        const res = await FetchUserInFo();
        SetPhoneNo(res.Phone_No || '');
        SetLocation(res.Location || '');
        SetWebsite(res.Website || '');
    }
    React.useEffect(()=>{
        FetchInfo();
    },[])

    //   Third
    const [CurrentPassword,SetCurrentPassword] = React.useState('');
    const [NewPassword,SetNewPassword] = React.useState('');
    const [ConfirmPassword,SetConfirmPassword] = React.useState('');
    const HandelSubmit = async(e)=>{
    e.preventDefault();
    if(NewPassword === ConfirmPassword){
      if(NewPassword == ''){
        alert('Please enter your new password')
      }else{
        const Pass = await UpdatePassword(CurrentPassword,NewPassword);
        alert(Pass);
      }
    }else{
      alert('Both Password need to same ...')
    }
  }

  const handleRefresh = () => {
    window.location.reload();
  };

  const list = (anchor) => (
    <Box className={`${Styles.DrawerCenter} min-h-screen`} style={{backgroundColor:"var(--bg)"}}  sx={{ width: "100vw",backgroundColor:'#1e2742',height:'100svh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' }} role="presentation">
        
        {/* Rewrite */}
        <div  onClick={handleRefresh}>
          <img src="assets/homeicon.svg" alt="Home" className={Styles.homeIcon} />
        </div>

        <div className='flex flex-col pt-4 gap-4 min-h-screen' style={{width:"60%",margin:"auto",overflow:'scroll'}}>
            {/* Header */}
            <div className='flex w-full items-center justify-between py-2' style={{borderBottom:"1px solid #4F55C3"}}>
              <div className='w-full px-4 py-2 flex gap-4 items-center'>
                <div className={Styles.ForBackButton} onClick={()=>{setState({ ...state, [anchor]: false })}}>
                  <img src="/assets/backbtn.svg" alt="Back" style={{width:"20px",height:"20px"}}/>
                </div>
                <div style={{color:"var(--blue)",fontSize:"24px"}}>Studio Profile</div>
              </div>
              <div className="flex items-center gap-4 w-fit" style={{border:"1px solid #D8D8D8",borderRadius:'5px',minWidth:"fit-content"}}><Image src="/assets/profile.svg" alt="Logo" width={100} height={100} className={Styles.profile} /><div className="pr-6 text-sm font-bold">Studio name</div></div>
            </div> 

            <div className='flex w-full px-4 py-6 gap-10'>
                {/* Left */}
                <div style={{width:"50%"}} className='flex flex-col'>
                    {/* Logo */}
                    <div className='p-4 bg-white flex flex-col gap-4 justify-between mb-4' style={{borderRadius:'10px'}}>
                        <div style={{fontSize:"18px",color:"var(--blue)"}}>Logos</div>
                        <div style={{fontSize:"12px",color:"var(--black)"}}>The logo should be of 56px height and 160px width and make sure it perfectly fit in the box</div>
                        <div className='text-white px-4 py-2 w-fit' style={{borderRadius:"5px",textAlign:"center",fontSize:'14px',backgroundColor:"var(--pink)"}}>Upload</div>
                    </div>
                    {/* Profile */}
                    <div style={{fontSize:"16px",fontWeight:"bold",padding:"0 0 .3em .5em",color:"var(--blue)"}}>Profile</div>
                    <div className='p-4 py-6 bg-white flex flex-col gap-4 justify-between mb-4' style={{borderRadius:'10px'}}>
                        <div className='flex flex-col gap-.5'>
                            <label htmlFor="name" style={{fontSize:"14px"}}>Name</label>
                            <input type="text" className={Styles.inputDiv} />
                        </div>
                        <div className='flex flex-col gap-.5'>
                            <label htmlFor="name" style={{fontSize:"14px"}}>Address</label>
                            <input type="text" className={Styles.inputDiv} />
                        </div>
                    </div>
                    {/* Contacts */}
                    <div style={{fontSize:"16px",fontWeight:"bold",padding:"0 0 .3em .5em",color:"var(--blue)"}}>Contacts</div>
                    <div className='p-4  py-6 bg-white flex flex-col gap-4 justify-between mb-4' style={{borderRadius:'10px'}}>
                        <div className='flex flex-col gap-.5'>
                            <label htmlFor="name" style={{fontSize:"14px"}}>Phone</label>
                            <input type="number" className={Styles.inputDiv} />
                        </div>
                        <div className='flex flex-col gap-.5'>
                            <label htmlFor="name" style={{fontSize:"14px"}}>Email</label>
                            <input type="email" className={Styles.inputDiv} />
                        </div>
                        <div className='flex flex-col gap-.5'>
                            <label htmlFor="name" style={{fontSize:"14px"}}>Website</label>
                            <input type="text" className={Styles.inputDiv} />
                        </div>
                    </div>
                    {/* Social Profile Links */}
                    <div style={{fontSize:"16px",fontWeight:"bold",padding:"0 0 .3em .5em",color:"var(--blue)"}}>Social Profiles</div>
                    <div className='p-4 py-6 bg-white flex flex-col gap-4 justify-between mb-4' style={{borderRadius:'10px'}}>
                        <div className='flex flex-col gap-0.5'>
                            <label htmlFor="name" style={{fontSize:"14px"}}>Instagram</label>
                            <input type="text" className={Styles.inputDiv} />
                        </div>
                        <div className='flex flex-col gap-.5'>
                            <label htmlFor="name" style={{fontSize:"14px"}}>Facebook</label>
                            <input type="text" className={Styles.inputDiv} />
                        </div>
                        <div className='flex flex-col gap-0.5'>
                            <label htmlFor="name" style={{fontSize:"14px"}}>Youtube</label>
                            <input type="text" className={Styles.inputDiv} />
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div style={{width:"50%",borderRadius:"10px",height:"fit-content",padding:"0 0 4em 0"}} className='bg-white'>
                    <div className='p-8' style={{borderBottom:"1px solid black"}}>
                        <div className='flex flex-col items-center justify-center gap-4'>
                            <img src="/assets/profileImg.svg" alt="Pro" className={Styles.profileImg} />
                            <div style={{fontSize:"20px",color:"var(--blue)"}}>AnthillNetworks</div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-6 justify-between p-10'>
                        <div>
                            <div style={{fontSize:"16px",color:"var(--blue)"}}>Phone</div>
                            <div style={{fontSize:"16px",color:"var(--black)"}}>9345615762</div>
                        </div>
                        <div>
                            <div style={{fontSize:"16px",color:"var(--blue)"}}>Email</div>
                            <div style={{fontSize:"16px",color:"var(--black)"}}>barathkumar.b2411@gmail.com</div>
                        </div>
                        <div>
                            <div style={{fontSize:"16px",color:"var(--blue)"}}>Website</div>
                            <div style={{fontSize:"16px",color:"var(--black)"}}>anthill2020@gmail.com</div>
                        </div>
                    </div>
                    <div className='w-full px-8'>
                        <div style={{backgroundColor:"#ECEDFF",borderRadius:"5px"}} className='px-16 py-2 flex items-center justify-between w-full'>
                            <img src="/assets/insta.svg" alt="Insta"  style={{width:"35px"}}/>
                            <img src="/assets/utube.svg" alt="UTube" style={{width:"50px"}} />
                            <img src="/assets/fb.svg" alt="FB"  style={{width:"40px"}}/>
                        </div>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>


        {/* <NestedProfileList UserID={UserID}/> */}
        {/* <div>
            <div style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}}>{Name}</div>
            <div style={{display:'flex',justifyContent:'space-between',marginLeft:'10px',marginTop:'10px'}}>
              <div>Logo</div>
              <div><input type="file" onChange={(e)=>{HandeLogoUpload(e.target.files[0])}} style={{width:'80px',overflow:'hidden'}}/></div>
            </div>
            <div className='flex w-full items-center justify-between py-2' style={{borderBottom:"1px solid #4F55C3"}}>
              <div className='w-full px-4 py-2 flex gap-4 items-center'>
                <div className={Styles.ForBackButton} onClick={()=>{setState({ ...state, [anchor]: false })}}>
                  <img src="/assets/backbtn.svg" alt="Back" style={{width:"20px",height:"20px"}}/>
                </div>
                <div style={{color:"var(--blue)",fontSize:"24px"}}>Send Greetings</div>
              </div>
              <div className="flex items-center gap-4 w-fit" style={{border:"1px solid #D8D8D8",borderRadius:'5px',minWidth:"fit-content"}}><Image src="/assets/profile.svg" alt="Logo" width={100} height={100} className={Styles.profile} /><div className="pr-6 text-sm font-bold">Studio name</div></div>
            </div>  
        </div> */}

        {/* <NestedContactList/> */}
        {/* <div>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={PhoneNo} onChange={(e)=>{SetPhoneNo(e.target.value);UpdateUserInFo(e.target.value,Location,Website)}} placeholder='Phone Number'/></div>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={Location} onChange={(e)=>{SetLocation(e.target.value);UpdateUserInFo(PhoneNo,e.target.value,Website)}} placeholder='Location'/></div>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={Website} onChange={(e)=>{SetWebsite(e.target.value);UpdateUserInFo(PhoneNo,Location,e.target.value)}} placeholder='Website'/></div>
        </div> */}

        {/* <NestedPasswordList/> */}
        {/* <form onSubmit={HandelSubmit}>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={CurrentPassword} onChange={(e)=>{SetCurrentPassword(e.target.value)}} placeholder='Current Password' required/></div>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={NewPassword} onChange={(e)=>{SetNewPassword(e.target.value)}} placeholder='New Password' required/></div>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={ConfirmPassword} onChange={(e)=>{SetConfirmPassword(e.target.value)}} placeholder='Confirm Password' required/></div>
            <div><button style={{backgroundColor:'#725aff',color:'white',border:'none',padding:"5px 10px",margin:'10px',borderRadius:'5px',cursor:'pointer'}}>Confirm</button></div>
        </form> */}
        {/* <div><button style={{backgroundColor:'#725aff',color:'white',border:'none',padding:"5px 10px",margin:'10px',borderRadius:'5px',cursor:'pointer'}} onClick={()=>{Logout()}}>Logout</button></div> */}
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}>
            {/* <img src="/svg/menu.svg"/> */}
            <div className="flex items-center gap-4 w-fit" style={{border:"1px solid #D8D8D8",borderRadius:'5px',minWidth:"fit-content"}}><Image src="/assets/profile.svg" alt="Logo" width={100} height={100} className={Styles.profile} /><div className="pr-6 text-sm font-bold text-black">Studio name</div></div>
          </div>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} transitionDuration={{ appear: 500, enter: 500, exit: 500 }}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
export function generateUniqueNumber(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1; // Month is zero-based
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  
  // Concatenate and convert to a number
  const uniqueNumber = parseInt(`${year}${month}${day}${hours}${minutes}${seconds}`, 10);
  
  return uniqueNumber;
}


// export function NestedProfileList({UserID}) {
  
//   return (
//     <List
//       sx={{ width: '100%', bgcolor: '#13192f',color:'white',borderRadius:'5px' }}
//       component="nav"
//       aria-labelledby="nested-list-subheader"
//     >
//       <ListItemButton onClick={handleClick}>
//         <ListItemText primary="Profile" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <div>
//             <div style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}}>{Name}</div>
//             <div style={{display:'flex',justifyContent:'space-between',marginLeft:'10px',marginTop:'10px'}}>
//               <div>Logo</div>
//               <div><input type="file" onChange={(e)=>{HandeLogoUpload(e.target.files[0])}} style={{width:'80px',overflow:'hidden'}}/></div>
//             </div>
//           </div>
//         </List>
//       </Collapse>
//     </List>
//   );
// }


// export function NestedContactList() {
//   const [open, setOpen] = React.useState(false);
//   const [PhoneNo,SetPhoneNo] = React.useState('');
//   const [Location,SetLocation] = React.useState('');
//   const [Website,SetWebsite] = React.useState('');
//   const handleClick = () => {
//     setOpen(!open);
//   };
//   const FetchInfo = async()=>{
//     const res = await FetchUserInFo();
//     SetPhoneNo(res.Phone_No || '');
//     SetLocation(res.Location || '');
//     SetWebsite(res.Website || '');
//   }
//   React.useEffect(()=>{
//     FetchInfo();
//   },[])
//   return (
//     <List
//       sx={{ width: '100%', bgcolor: '#13192f',color:'white',borderRadius:'5px' }}
//       component="nav"
//       aria-labelledby="nested-list-subheader"
//     >
//       <ListItemButton onClick={handleClick}>
//         <ListItemText primary="Contact" />
//         {open ? <ExpandLess /> : <ExpandMore />}
//       </ListItemButton>
//       <Collapse in={open} timeout="auto" unmountOnExit>
//         <List component="div" disablePadding>
//           <div>
//             <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={PhoneNo} onChange={(e)=>{SetPhoneNo(e.target.value);UpdateUserInFo(e.target.value,Location,Website)}} placeholder='Phone Number'/></div>
//             <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={Location} onChange={(e)=>{SetLocation(e.target.value);UpdateUserInFo(PhoneNo,e.target.value,Website)}} placeholder='Location'/></div>
//             <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={Website} onChange={(e)=>{SetWebsite(e.target.value);UpdateUserInFo(PhoneNo,Location,e.target.value)}} placeholder='Website'/></div>
//           </div>
//         </List>
//       </Collapse>
//     </List>
//   );
// }


export function NestedPasswordList() {
  const [open, setOpen] = React.useState(false);
  const [Name,nameVAlue] = React.useState('');
  const [CurrentPassword,SetCurrentPassword] = React.useState('');
  const [NewPassword,SetNewPassword] = React.useState('');
  const [ConfirmPassword,SetConfirmPassword] = React.useState('');
  const handleClick = () => {
    setOpen(!open);
  };
  const HandelSubmit = async(e)=>{
    e.preventDefault();
    if(NewPassword === ConfirmPassword){
      if(NewPassword == ''){
        alert('Please enter your new password')
      }else{
        const Pass = await UpdatePassword(CurrentPassword,NewPassword);
        alert(Pass);
      }
    }else{
      alert('Both Password need to same ...')
    }
  }
  return (
    <List
      sx={{ width: '100%', bgcolor: '#13192f',color:'white',borderRadius:'5px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Change Password" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <form onSubmit={HandelSubmit}>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={CurrentPassword} onChange={(e)=>{SetCurrentPassword(e.target.value)}} placeholder='Current Password' required/></div>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={NewPassword} onChange={(e)=>{SetNewPassword(e.target.value)}} placeholder='New Password' required/></div>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={ConfirmPassword} onChange={(e)=>{SetConfirmPassword(e.target.value)}} placeholder='Confirm Password' required/></div>
            <div><button style={{backgroundColor:'#725aff',color:'white',border:'none',padding:"5px 10px",margin:'10px',borderRadius:'5px',cursor:'pointer'}}>Confirm</button></div>
          </form>
        </List>
      </Collapse>
    </List>
  );
}