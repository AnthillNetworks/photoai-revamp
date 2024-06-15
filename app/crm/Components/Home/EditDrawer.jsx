'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Style from "./edit.module.css"
import downloadCSV,{searchFun} from './DownloadCSV';
import EditCreate from './EditCreate';
import EventDetailsToDownload from './EventDetailstoDownload';
import { DeleteCustomerFuntion, GetCustomerFuntion } from './AllFunctions';
import Confirm from './confirm';
import UpdateCustomer from './UpdateCustomer';
import Image from 'next/image';
export default function EditLeftDrawer() {
  const [Data,SetData] = React.useState([]);
  const [ConstData,SetConstData] = React.useState([]);
  const [ConstCheckedData,SetConstCheckedData] = React.useState(null);
  const [tot,totvalue] = React.useState(0);
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
  const FetchCustomerData = async ()=>{
    const response = await GetCustomerFuntion();
    SetConstData(response)
    let total = 0
    response.map((item)=>{
      total = total + item.Balance;
    })
    totvalue(total);
    SetData(response);
  }
  const HandelDelete = async()=>{
    const result = window.confirm("Are you sure you want to delete?");
    if(result){
      const response = await DeleteCustomerFuntion(ConstCheckedData.Customer_ID);
      if(response){
        FetchCustomerData();
      }else{
        alert("Something went wrong");
      }
    }
  }
  React.useEffect(()=>{
    FetchCustomerData();
  },[]);
  const list = (anchor) => (
    <Box className={`${Style.DrawerCenter} min-h-screen`} style={{backgroundColor:"var(--bg)"}} sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '100vw' }} role="presentation">
        <div className='w-10/12 m-auto flex items-center justify-center flex-col pt-4 gap-4' style={{width:'70%',margin:"auto"}}>
            {/* Header */}
            <div className='flex w-full items-center justify-between py-2'>
              <div className='w-full px-4 py-2 flex gap-4 items-center'>
                <div className={Style.ForBackButton} onClick={()=>{setState({ ...state, [anchor]: false })}}>
                  {/* <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_263_943)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.94063 13.0599C7.65973 12.7787 7.50195 12.3974 7.50195 11.9999C7.50195 11.6024 7.65973 11.2212 7.94063 10.9399L13.5966 5.2819C13.878 5.00064 14.2596 4.84268 14.6575 4.84277C14.8545 4.84282 15.0495 4.88167 15.2315 4.9571C15.4135 5.03253 15.5789 5.14307 15.7181 5.2824C15.8574 5.42173 15.9679 5.58713 16.0432 5.76915C16.1186 5.95117 16.1573 6.14625 16.1573 6.34325C16.1572 6.54025 16.1184 6.73531 16.0429 6.9173C15.9675 7.09929 15.857 7.26463 15.7176 7.4039L11.1226 11.9999L15.7186 16.5959C15.862 16.7342 15.9763 16.8997 16.055 17.0826C16.1337 17.2656 16.1752 17.4624 16.177 17.6616C16.1788 17.8607 16.141 18.0583 16.0656 18.2427C15.9903 18.427 15.879 18.5946 15.7382 18.7355C15.5975 18.8764 15.43 18.9878 15.2457 19.0633C15.0614 19.1389 14.8639 19.1769 14.6647 19.1753C14.4656 19.1736 14.2687 19.1323 14.0857 19.0538C13.9026 18.9753 13.7371 18.8611 13.5986 18.7179L7.93863 13.0599H7.94063Z" fill="white"/></g><defs><clipPath id="clip0_263_943"><rect width="24" height="24" fill="white"/></clipPath></defs></svg> */}
                  <img src="/assets/backbtn.svg" alt="Back" style={{width:"20px",height:"20px"}}/>
                </div>
                <div style={{color:"var(--blue)",fontSize:"24px"}}>Customers</div>
              </div>
              <div className="flex items-center gap-4" style={{border:"1px solid #D8D8D8",borderRadius:'5px'}}><Image src="/assets/profile.svg" alt="Logo" width={100} height={100} className={Style.profile} /><div className="pr-6 text-sm font-bold">Studio name</div></div>
            </div>

            {/* Search */}
            <div className={`${Style.NavSearchModel} mb-4`}>
                {/* <div className={Style.ForBackButton} onClick={()=>{setState({ ...state, [anchor]: false })}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_263_943)"><path fill-rule="evenodd" clip-rule="evenodd" d="M7.94063 13.0599C7.65973 12.7787 7.50195 12.3974 7.50195 11.9999C7.50195 11.6024 7.65973 11.2212 7.94063 10.9399L13.5966 5.2819C13.878 5.00064 14.2596 4.84268 14.6575 4.84277C14.8545 4.84282 15.0495 4.88167 15.2315 4.9571C15.4135 5.03253 15.5789 5.14307 15.7181 5.2824C15.8574 5.42173 15.9679 5.58713 16.0432 5.76915C16.1186 5.95117 16.1573 6.14625 16.1573 6.34325C16.1572 6.54025 16.1184 6.73531 16.0429 6.9173C15.9675 7.09929 15.857 7.26463 15.7176 7.4039L11.1226 11.9999L15.7186 16.5959C15.862 16.7342 15.9763 16.8997 16.055 17.0826C16.1337 17.2656 16.1752 17.4624 16.177 17.6616C16.1788 17.8607 16.141 18.0583 16.0656 18.2427C15.9903 18.427 15.879 18.5946 15.7382 18.7355C15.5975 18.8764 15.43 18.9878 15.2457 19.0633C15.0614 19.1389 14.8639 19.1769 14.6647 19.1753C14.4656 19.1736 14.2687 19.1323 14.0857 19.0538C13.9026 18.9753 13.7371 18.8611 13.5986 18.7179L7.93863 13.0599H7.94063Z" fill="white"/></g><defs><clipPath id="clip0_263_943"><rect width="24" height="24" fill="white"/></clipPath></defs></svg></div> */}
                <div className={Style.SearchModel}>
                    <input type="text" placeholder="Search" onChange={(e)=>{SetData(searchFun(e.target.value,ConstData))}}/>
                    <div className={Style.searchBtn}>Search</div>
                </div>
                <div className={Style.AddModelButton}>
                  <button  className={Style.searchBtn} style={{border:"1px solid var(--pink)",color:"var(--pink)",backgroundColor:"var(--white)"}} onClick={()=>{downloadCSV(Data)}}>Download as CSV</button>
                  <EditCreate FetchCustomerData={FetchCustomerData}/>
                </div>  
            </div>

            {/* <div className={Style.TableTag} style={{maxHeight:"60vh",overflow:"scroll"}}>
                <table>
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Mobile</th>
                      <th>Mail</th>
                      <th>Location</th>
                      <th>Balance</th>
                    </tr>
                  </thead>
                  <tbody >
                      {Data.map((item,index)=>{
                        return  <tr key={index}>
                        <td style={{cursor:'pointer'}}><EventDetailsToDownload id={item.Customer_ID} name={item.Customer_Name} Mobile={item.Mobile}/></td>
                        <td>{item.Mobile}</td>
                        <td>{item.Email_ID}</td>
                        <td>{item.Location}</td>
                        <td>{item.Balance.toLocaleString('en-IN', {style: 'currency',currency: 'INR'})}</td>
                        <td style={{border:'none',backgroundColor:'#13192f'}}><img style={{width:'20px',cursor:'pointer'}} onClick={()=>{if(ConstCheckedData){SetConstCheckedData(null)}else{SetConstCheckedData(item)}}} src={ConstCheckedData?.Customer_ID != item.Customer_ID?'/svg/CheckedFalse.svg':'/svg/CheckedTrue.svg'} alt="" /></td>
                      </tr>
                      })}
                    <tr>
                      <td style={{border:'none',backgroundColor:'#13192f'}}></td>
                      <td style={{border:'none',backgroundColor:'#13192f'}}></td>
                      <td style={{border:'none',backgroundColor:'#13192f'}}></td>
                      <td style={{border:'none',backgroundColor:'#13192f'}}>Total</td>
                      <td style={{border:'none',backgroundColor:'#13192f'}}>{tot.toLocaleString('en-IN', {style: 'currency',currency: 'INR'})}</td>
                    </tr>
                  </tbody>
                </table>
            </div> */}

            <div className={Style.TableTag} style={{ maxHeight: "60vh", overflow: "scroll" }}>
              <div className={Style.customTable}>
                <div className={Style.customThead}>
                  <div className={Style.customTr}>
                    <div className={Style.customTh}>#</div>
                    <div className={Style.customTh}>Customer Name</div>
                    <div className={Style.customTh}>Mobile</div>
                    <div className={Style.customTh}>Mail</div>
                    <div className={Style.customTh}>Location</div>
                    <div className={Style.customTh}>Balance</div>
                  </div>
                </div>
                <div className={Style.customTbody}>
                  {Data.map((item, index) => {
                    return (
                      <div className={Style.customTr} key={index}>
                        <div className={Style.customTd}>
                          <img
                            style={{ width: '20px', cursor: 'pointer' }}
                            onClick={() => {
                              if (ConstCheckedData) {
                                SetConstCheckedData(null);
                              } else {
                                SetConstCheckedData(item);
                              }
                            }}
                            src={ConstCheckedData?.Customer_ID !== item.Customer_ID ? '/svg/CheckedFalse.svg' : '/svg/CheckedTrue.svg'}
                            alt=""
                          />
                        </div>
                        <div className={Style.customTd} style={{ cursor: 'pointer' }}>
                          <EventDetailsToDownload id={item.Customer_ID} name={item.Customer_Name} Mobile={item.Mobile} Location={item.Location} Email_ID={item.Email_ID}/>
                        </div>
                        <div className={Style.customTd}>{item.Mobile}</div>
                        <div className={Style.customTd}>{item.Email_ID}</div>
                        <div className={Style.customTd}>{item.Location}</div>
                        <div className={Style.customTd}>{item.Balance.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}</div>
                        <div>
                          <button className={Style.searchBtn} style={{padding:"4px 16px"}}><Confirm ConstCheckedData={ConstCheckedData}/></button>
                        </div>
                      </div>
                    );
                  })}
                  <div className={Style.customTr}>
                    <div className={Style.customTd} style={{ border: 'none' }}></div>
                    <div className={Style.customTd} style={{ border: 'none' }}></div>
                    <div className={Style.customTd} style={{ border: 'none' }}></div>
                    <div className={Style.customTd} style={{ border: 'none' }}></div>
                    <div className={Style.customTd} style={{ border: 'none' }}>Total</div>
                    <div className={Style.customTd} style={{ border: 'none' }}>
                      {tot.toLocaleString('en-IN', { style: 'currency', currency: 'INR' })}
                    </div>
                    <div className={Style.customTd} style={{ border: 'none' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:'20px'}}>
                {/* <div className={Style.FooterButton}>
                    <button style={{border:'none',borderRadius:'5px',fontSize:'13px', marginTop:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}><Confirm ConstCheckedData={ConstCheckedData}/></button>
                    <button onClick={()=>{downloadCSV(Data)}} style={{border:'none',borderRadius:'5px',fontSize:'13px', marginTop:'15px',cursor:'pointer',backgroundColor:'#A240E5',color:'#fff'}}>Download as CSV</button>
                </div> */}
                {ConstCheckedData?<>
                  <div className='flex gap-3'>
                      <div><UpdateCustomer FetchCustomerData={FetchCustomerData} Data={ConstCheckedData}/></div>
                      <div>
                        {/* <img src='/DeleteCrm.svg' style={{cursor:'pointer'}} onClick={HandelDelete}/> */}
                        <div onClick={HandelDelete} className={Style.searchBtn} style={{cursor:"pointer",color:"var(--pink)",backgroundColor:"var(--white)",border:"1px solid var(--pink)"}}>Delete</div>
                      </div>
                </div>
                </>:<>
                <div>
                      <div></div>
                      <div></div>
                </div>
                </>}
            </div>
        </div>
    </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div>
            {/* <img onClick={toggleDrawer(anchor, true)} src='/svg/EditCrm.svg' alt="search" style={{width: '60px',height:'auto',cursor:'pointer'}}/> */}
            <div onClick={toggleDrawer(anchor, true)} className='flex gap-2' style={{cursor:"pointer"}}>
              <img src="/assets/customer.svg" alt="Customer" style={{width: '20px',height:'20',objectFit:"contain",cursor:'pointer'}}/>
              <div>Customers</div>
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