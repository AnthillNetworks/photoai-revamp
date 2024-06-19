'use client'
import Link from "next/link"
import Style from "./page.module.css"
import Image from "next/image"
// import TemporaryDrawer from "@/app/crm/Components/Home/RightDrawer"
export default function Welcome({is_PrimeUser,UserID,Logo}){
    return(
        <div className="min-h-screen w-full flex items-center justify-center" style={{backgroundColor:"var(--bg)"}}>
          <div className={`flex`} style={{borderRadius:"20px",boxShadow:"0px 72px 80px -48px rgba(0, 0, 0, 0.5)",backgroundColor:"var(--lightpink)"}}>
            <div className={`${Style.logoCon} flex flex-col gap-4 w-full p-5 items-center justify-center`}>
              <div><Image src="/assets/samplelogo.svg" alt="Logo" width={100} height={100} className={Style.logoImg}/></div>
              <div style={{color:"var(--blue)",fontSize:"20px"}}>Anthill Networks</div>
            </div>
            <div className="p-6" style={{backgroundColor:"var(--white)",width:"100%", borderRadius:"0 20px 20px 0"}}>
              <div><Image src="/assets/rect.svg" alt="Rect" width={100} height={100} className={Style.rectImg}/></div>
              <div className="w-10/12" style={{color:"var(--darkblue)",fontSize:"14px"}}>An AI-based photo distribution platform crafted to elevate event engagement</div>
              <div className="flex gap-4 mt-4" style={{borderBottom:"1px solid #000"}}>
                <Link href="/create-event">
                  <div className="px-12 mb-6 text-center flex items-center gap-4" style={{backgroundColor:"var(--pink)",color:"white",cursor:"pointer",fontSize:"12px",borderRadius:"4px",padding:"6px 28px"}}>Create Event <Image src="/assets/plus.svg" alt="Plus" width={100} height={100} className={Style.icon}/> </div>
                </Link>
                <Link href="/search">
                  <div className="px-12 mb-6 text-center flex items-center gap-4" style={{backgroundColor:"var(--pink)",color:"white",cursor:"pointer",fontSize:"12px",borderRadius:"4px",padding:"6px 28px"}}>Search Event <Image src="/assets/search.svg" alt="Plus" width={100} height={100} className={Style.icon}/> </div>
                </Link>
              </div>
              
              {is_PrimeUser ? 
                <Link href="/crm" >
                  <div>
                    <div style={{color:"var(--darkblue)",fontSize:"14px", marginTop:"2em"}}>Hi, This is super CRM</div>
                    <div className="px-12 my-3 text-center flex items-center gap-4 w-fit" style={{backgroundColor:"var(--pink)",color:"white",cursor:"pointer",fontSize:"12px",borderRadius:"4px",padding:"6px 28px"}}>Open CRM <Image src="/assets/lock.svg" alt="Lock" width={100} height={100} className={Style.icon}/> </div>
                  </div>
                </Link> : <></>
                // <><TemporaryDrawer UserID={UserID}/></>
              }
            </div>
          </div>
        </div>
    )
}