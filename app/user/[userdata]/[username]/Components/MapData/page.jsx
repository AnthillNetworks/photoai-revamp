'use client'
import { Checkbox, Skeleton } from "@mui/material"
import Styles from "./page.module.css"
const MapData = ({Data,ScrollBtn})=>{
    const arrayOfUndefined = Array.from({ length: 5 });
    return(
        <>
        {Data.length === 0?<>{arrayOfUndefined.map((_, index) => {
            const height = Math.floor(Math.random() * (250 - 100 + 1)) + 200;
            return <div key={index} className={Styles.OneDiv}><Skeleton variant="rectangular" key={index} style={{ backgroundColor: '#1E2742',borderRadius:'7px', margin:'3px' }} animation="wave" width='100%' height={height} /><Checkbox default className={Styles.CheckBox}/></div>
        })}</>:<>
        {Data.map((item,index)=>{
            return <div key={index} className={Styles.OneDiv}>
                <img src={`https://selife-bucket.s3.ap-south-1.amazonaws.com/${item.split('photographers_images')[0]}COMPRESS_IMAGES${item.split('photographers_images')[1]}`} className={Styles.Image} loading="lazy" onClick={()=>{ScrollBtn(item)}}/>
        </div>
        })}</>}
        </>
    )
}
export default MapData;