'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import Login from "./Login";
import Swal from 'sweetalert2';
import Loader from "@/app/loader/page";
export default function SignIn(){
    const [chechbox,checkboxvalue] = useState(true);
    const [user,uservalue] = useState('');
    const [password,passwordvalue] = useState('');
    const [loadeer,loadderevalue] = useState(false);
    useEffect(()=>{
        const userid = localStorage.getItem('UserName');
        const passwordv = localStorage.getItem('Password');
        if(userid && passwordv){
            uservalue(userid);
            passwordvalue(passwordv);
        }
        if(user != '' && password != ''){
            HandelSubmit(user,password);
        }
    },[user,password]);
    const HandelSubmit = async(username,userpass)=>{
        loadderevalue(true)
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
        const message = await Login(username,userpass);
        Toast.fire({
            icon: message.icon,
            title: message.message
        });
        if(message.icon === 'success' && !chechbox){
            localStorage.setItem('UserName',username)
            localStorage.setItem('Password',userpass)
        }
        loadderevalue(false)
    }
    return(
        <>
        {loadeer?<Loader/>:""}
        <div className="min-h-screen w-full flex items-center justify-center" style={{backgroundColor:"var(--bg)"}}>
            <div className={`bg-white p-6 py-16 flex`} style={{borderRadius:"20px",boxShadow:"0px 72px 80px -48px rgba(0, 0, 0, 0.5)"}}>
                <div style={{minWidth:"30em",minHeight:"20em"}}>

                </div>
                <form onSubmit={(e)=>{e.preventDefault();HandelSubmit(e.target.UserID.value,e.target.Password.value)}} style={{width:"20em"}}>
                    <div>
                        <h1 style={{color:"var(--blue)"}}>Log in</h1>
                        <h3 style={{color:"var(--blue)"}}>Nice to see your again</h3>
                        <div style={{fontSize:"12px"}}>Please login to your account</div>
                        <div className="flex flex-col gap-2 mt-4 pr-8">
                            <label htmlFor="user_id" className="text-sm">User ID</label>
                            <input type="text" name="UserID" className="outline-none px-2" style={{border:"1px solid rgba(184, 184, 184, 1)",borderRadius:"4px"}} required/>
                        </div>
                        <div className="flex flex-col gap-2 mt-4 pr-8">
                            <label htmlFor="user_id" className="text-sm">Password</label>
                            <input type="password" name="Password" className="outline-none px-2" style={{border:"1px solid rgba(184, 184, 184, 1)",borderRadius:"4px"}} required/>
                        </div>
                        <div style={{fontSize:"14px",color:"var(--pink)"}} className="w-full pr-8 mt-6 flex items-center justify-end">Forget password?</div>
                        <div className="px-2 mt-6 text-center mr-8" style={{backgroundColor:"var(--pink)",color:"white",cursor:"pointer",fontSize:"12px",borderRadius:"4px",padding:"6px 0"}}> <button type="submit">Login</button> </div>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
}