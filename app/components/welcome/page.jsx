// 'use client'
// import Link from "next/link"
// import Style from "./page.module.css"
// // import TemporaryDrawer from "@/app/crm/Components/Home/RightDrawer"
// export default function Welcome({is_PrimeUser,UserID,Logo}){
//     return(
//         <>
//         <div className={Style.WelcomeMainDiv}>
//             <div>
//                 <div>
//                     <div><img src={Logo || ''} style={{width:'100px',borderRadius:'5px'}}/></div>
//                     <div>
//                         <div>Welcome!</div>
//                         <div>
//                             <div style={{textTransform:'capitalize'}}>{UserID}</div>
//                             {/* {is_PrimeUser?<Link href="/crm" style={{backgroundColor:'#13192f',padding:'5px 20px',border:'none',borderRadius:'5px',color:'#9747ff',fontWeight:'bolder',textDecoration:'none'}}>CRM</Link>:<><TemporaryDrawer UserID={UserID}/></>} */}
//                         </div>
//                     </div>
//                 </div>
//                 <div className={Style.CreateSearch}>
//                     <div>
//                         <Link href="/create-event">Create Event <img src="/svg/CreateEvent.svg"/></Link>
//                         <Link href="/search">Search Event <img src="/svg/exploreSearch.svg"/></Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </>
//     )
// }

import React from 'react'

function Welcome() {
  return (
    <div>
      welcome
    </div>
  )
}

export default Welcome
