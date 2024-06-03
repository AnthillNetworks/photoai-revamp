'use client'
import { useState } from "react";
import Styles from "./page.module.css"
import Swal from 'sweetalert2';
import Loader from "@/app/loader/page";
import LoginwithSecretKey from "./Fun";
export default function SignIn({event}){
    const [loadeer,loadderevalue] = useState(false);
    const HandelSubmit = async(Key)=>{
        // loadderevalue(true)
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
        const message = await LoginwithSecretKey(event,Key);
        Toast.fire({
            icon: message.icon,
            title: message.message
        });
        loadderevalue(false)
    }
    return(
        <>
        {loadeer?<Loader/>:""}
        <div className={Styles.SignInDiv}>
            <form className={Styles.SignInInnerDiv} onSubmit={(e)=>{e.preventDefault();HandelSubmit(e.target.UserID.value)}}>
                <div className={Styles.SignInInneDiv}>
                    <h1>Secret Key</h1>
                    <input type="text" name="UserID" className={Styles.InputBox}placeholder="key" required/>
                    <div className={Styles.ForCheckAndForgot}></div>
                    <button type="submit">Visit Dashboard</button>
                </div>
            </form>
        </div>
        </>
    )
}