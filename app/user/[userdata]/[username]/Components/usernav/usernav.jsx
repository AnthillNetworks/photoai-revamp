'use client'
import Style from "./usernav.module.css"
import Image from "next/image"
import { Avatar } from "@mui/material"
import Link from "next/link"
export default function UserNav({image,name,eventName}){
    return(
        <>
        <div className={Style.MainDivForNav}>
            <div className={Style.FirstDiv}>
                <Avatar className={Style.ImageALT}sx={{ width: 100, height: 100 }} alt="Remy Sharp" src={image} />
                <div>
                    <div>{name.split('%20').join(" ")}</div>
                    <div></div>
                </div>
            </div>
            <div>
                <Link className={Style.NavBtn} href={`/user/${eventName}/${name}/download`}>Download</Link>
            </div>
        </div>
        </>
    )
}