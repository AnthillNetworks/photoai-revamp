import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Swal from 'sweetalert2';
import { CreateCustomerGrettingsFuntion } from './AllFunctions';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function UploadImageOrVideo({GetAllGreetins}) {
  const [open, setOpen] = React.useState(false);
  const [GreatingsCrm,GreatingsCrmValue] = React.useState('');
  const [GreatingsDes,GreatingsDesValue] = React.useState('');
  const [PhotoURL,SetPhotoURL] = React.useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const HandelSubmit = async(e)=>{
    e.preventDefault();
      const response = await CreateCustomerGrettingsFuntion(GreatingsCrm,GreatingsDes,PhotoURL);
      if(response){
        GetAllGreetins();
        setOpen(false);
      }
    }
  return (
    <React.Fragment>
      <div variant="outlined" onClick={handleClickOpen}>
          <button style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'10px 15px', margin:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>Add Greeting</button>
      </div>
      <Dialog open={open} TransitionComponent={Transition} transitionDuration={{ appear: 600, enter: 600, exit: 600 }} keepMounted onClose={handleClose} aria-describedby="alert-dialog-slide-description">
        <form onSubmit={HandelSubmit} style={{backgroundColor:'#1e2742',padding:'20px 50px',borderRadius:'0'}}>
            <div>
              <input type='text' value={GreatingsCrm} onChange={(e)=>{GreatingsCrmValue(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Greeting Name" required/>
              <input type='text' value={GreatingsDes} onChange={(e)=>{GreatingsDesValue(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Description" required/>
              <input type='text' value={PhotoURL} onChange={(e)=>{SetPhotoURL(e.target.value)}} style={{width:'90%',backgroundColor:'#13192f',border:'none',padding:'15px',borderRadius:'5px',fontSize:'15px',outline:'none',color:'white',margin:'15px 0'}} placeholder="Photo URL"/>
            </div>
        <div>
            <button type='submit' style={{border:'none',borderRadius:'5px',fontSize:'13px',width:'150px',padding:'10px 15px', margin:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>Save</button>
        </div>
        </form>
      </Dialog>
    </React.Fragment>
  );
}