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
export default function TemporaryDrawer({UserID}) {
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

  const list = (anchor) => (
    <Box sx={{ width: 300,backgroundColor:'#1e2742',height:'100svh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center' }} role="presentation">
        <NestedProfileList UserID={UserID}/>
        <NestedContactList/>
        <NestedPasswordList/>
        <div><button style={{backgroundColor:'#725aff',color:'white',border:'none',padding:"5px 10px",margin:'10px',borderRadius:'5px',cursor:'pointer'}} onClick={()=>{Logout()}}>Logout</button></div>
    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}><img src="/svg/menu.svg"/></Button>
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
export function NestedProfileList({UserID}) {
  const [open, setOpen] = React.useState(false);
  const [Name,nameVAlue] = React.useState(UserID);
  const handleClick = () => {
    setOpen(!open);
  };
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
  return (
    <List
      sx={{ width: '100%', bgcolor: '#13192f',color:'white',borderRadius:'5px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Profile" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <div>
            <div style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}}>{Name}</div>
            <div style={{display:'flex',justifyContent:'space-between',marginLeft:'10px',marginTop:'10px'}}>
              <div>Logo</div>
              <div><input type="file" onChange={(e)=>{HandeLogoUpload(e.target.files[0])}} style={{width:'80px',overflow:'hidden'}}/></div>
            </div>
          </div>
        </List>
      </Collapse>
    </List>
  );
}
export function NestedContactList() {
  const [open, setOpen] = React.useState(false);
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
  return (
    <List
      sx={{ width: '100%', bgcolor: '#13192f',color:'white',borderRadius:'5px' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Contact" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <div>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={PhoneNo} onChange={(e)=>{SetPhoneNo(e.target.value);UpdateUserInFo(e.target.value,Location,Website)}} placeholder='Phone Number'/></div>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={Location} onChange={(e)=>{SetLocation(e.target.value);UpdateUserInFo(PhoneNo,e.target.value,Website)}} placeholder='Location'/></div>
            <div><input style={{backgroundColor:'transparent',color:'white',outline:'none',border:'none',margin:'10px'}} type="text" value={Website} onChange={(e)=>{SetWebsite(e.target.value);UpdateUserInFo(PhoneNo,Location,e.target.value)}} placeholder='Website'/></div>
          </div>
        </List>
      </Collapse>
    </List>
  );
}
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