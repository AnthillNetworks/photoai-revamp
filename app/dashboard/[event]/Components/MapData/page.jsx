'use client'
import { Checkbox, Skeleton } from "@mui/material"
import Styles from "./page.module.css"
import { useState } from "react";
import Image from 'next/image'
const MapData = ({Data,ScrollBtn})=>{
    const arrayOfUndefined = Array.from({ length: 5 });
    return(
        <>
        {Data.length === 0?<>{arrayOfUndefined.map((_, index) => {
            const height = Math.floor(Math.random() * (250 - 100 + 1)) + 200;
            const [check,checkvalue] = useState(false);
            return <div key={index} className={Styles.OneDiv}><Skeleton variant="rectangular" key={index} style={{ backgroundColor: 'rgba(23, 123, 229,0.4)',borderRadius:'7px', margin:'3px' }} animation="wave" width='100%' height={height} /><img src={check?'/svg/FavTrue.svg':'/svg/FavSelected.svg'} onClick={()=>{if(check){checkvalue(false)}else{checkvalue(true)}}} className={Styles.CheckBox}/></div>
        })}</>:<>
        {Data.map((item)=>{
            return <div key={item} className={Styles.OneDiv}>
            <Image src={`https://selife-bucket.s3.ap-south-1.amazonaws.com/${item.split('photographers_images')[0]}COMPRESS_IMAGES${item.split('photographers_images')[1]}`} width={200} height={200} className={Styles.Image} loading="lazy" onClick={()=>{ScrollBtn(item)}} alt=""/>
        </div>
        })}</>}
        </>
    )
}
export default MapData;