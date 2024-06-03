'use client'
import UserNav from './Components/usernav/usernav';
import React,{useState,useRef,useEffect} from 'react';
import Styles from "./Components/page.module.css"
import MapData from './Components/MapData/page';
import axios from 'axios';
import { S3Client } from '@aws-sdk/client-s3';
import Loader from "@/app/loader/page";
const MasonryLayout = ({event,username}) => {
  const sliderRef = useRef(null);
  const [loadeer,loadderevalue] = useState(false);
  const [stackone,stackonevalue] = useState([]);
  const [stacktwo,stacktwovalue] = useState([]);
  const [stackthree,stackthreevalue] = useState([]);
  const [stackfour,stackfourvalue] = useState([]);
  const [stackfive,stackfivevalue] = useState([]);
  const [screenframe,screenframevalue] = useState();
  const [Slider,SliderValue] = useState(false)
  const [scrollamount,scrollvalue] = useState(0);
  const [data,Datavalue] = useState([]);
const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_KEY
  }
});
const PushToStacks = (ArrayData)=>{
  if(window.innerWidth >= 1000){
    const stacks = [[], [], [], [],[]];
    ArrayData.forEach((item, index) => {
      const stackIndex = index % 5;
      stacks[stackIndex].push(item);
    });
    stackonevalue(prevData => [...new Set([...prevData, ...stacks[0]])]);
    stacktwovalue(prevData => [...new Set([...prevData, ...stacks[1]])]);
    stackthreevalue(prevData => [...new Set([...prevData, ...stacks[2]])]);
    stackfourvalue(prevData => [...new Set([...prevData, ...stacks[3]])]);
    stackfivevalue(prevData => [...new Set([...prevData, ...stacks[4]])]);
    screenframevalue(5);
  }else if(window.innerWidth >= 800){
    const stacks = [[], [], [], []];
    ArrayData.forEach((item, index) => {
      const stackIndex = index % 4;
      stacks[stackIndex].push(item);
    });
    stackonevalue(prevData => [...new Set([...prevData, ...stacks[0]])]);
    stacktwovalue(prevData => [...new Set([...prevData, ...stacks[1]])]);
    stackthreevalue(prevData => [...new Set([...prevData, ...stacks[2]])]);
    stackfourvalue(prevData => [...new Set([...prevData, ...stacks[3]])]);
    screenframevalue(4);
  }else if(window.innerWidth >= 550){
    const stacks = [[], [], []];
    ArrayData.forEach((item, index) => {
      const stackIndex = index % 3;
      stacks[stackIndex].push(item);
    });
    stackonevalue(prevData => [...new Set([...prevData, ...stacks[0]])]);
    stacktwovalue(prevData => [...new Set([...prevData, ...stacks[1]])]);
    stackthreevalue(prevData => [...new Set([...prevData, ...stacks[2]])]);
    screenframevalue(3);
  }else{
    const stacks = [[], []];
    ArrayData.forEach((item, index) => {
      const stackIndex = index % 2;
      stacks[stackIndex].push(item);
    });
    stackonevalue(prevData => [...new Set([...prevData, ...stacks[0]])]);
    stacktwovalue(prevData => [...new Set([...prevData, ...stacks[1]])]);
    screenframevalue(2);
  }
}
const FetchDashboard = async()=>{
  const response = await axios.get(`https://selife-bucket.s3.ap-south-1.amazonaws.com/${event}/Output/${username}/Data.json`);
  const fetchedImages = response.data.map(obj => `${event}/photographers_images/${obj}`);
  Datavalue(fetchedImages);
  PushToStacks(fetchedImages);
}
useEffect(()=>{
  FetchDashboard();
},[])
useEffect(()=>{
  if (sliderRef.current) {
    const container = sliderRef.current;
    container.scrollLeft += window.innerWidth*scrollamount;
  }
},[Slider])
const scrollToPosition = (path) => {
  SliderValue(true);
  scrollvalue(data.indexOf(path))
};
  return (
    <>
    {loadeer?<Loader/>:""}
    <UserNav image={`https://selife-bucket.s3.ap-south-1.amazonaws.com/${event}/selfie/${username}/image.jpeg`} name={username} eventName={event}/>
      {screenframe === 5?<>
      <div className={Styles.MainContainer}>
        <div><MapData Data={stackone} ScrollBtn={scrollToPosition}/></div>
        <div><MapData Data={stacktwo} ScrollBtn={scrollToPosition}/></div>
        <div><MapData Data={stackthree} ScrollBtn={scrollToPosition}/></div>
        <div><MapData Data={stackfour} ScrollBtn={scrollToPosition}/></div>
        <div><MapData Data={stackfive} ScrollBtn={scrollToPosition}/></div>
      </div>
      </>:<></>}
      {screenframe === 4?<>
        <div className={Styles.MainContainer}>
          <div><MapData Data={stackone} ScrollBtn={scrollToPosition}/></div>
          <div><MapData Data={stacktwo} ScrollBtn={scrollToPosition}/></div>
          <div><MapData Data={stackthree} ScrollBtn={scrollToPosition}/></div>
          <div><MapData Data={stackfour} ScrollBtn={scrollToPosition}/></div>
        </div>
      </>:<></>}
      {screenframe === 3?<>
        <div className={Styles.MainContainer}>
          <div><MapData Data={stackone} ScrollBtn={scrollToPosition}/></div>
          <div><MapData Data={stacktwo} ScrollBtn={scrollToPosition}/></div>
          <div><MapData Data={stackthree} ScrollBtn={scrollToPosition}/></div>
        </div>
      </>:<></>}
      {screenframe === 2?<>
        <div className={Styles.MainContainer}>
          <div><MapData Data={stackone} ScrollBtn={scrollToPosition}/></div>
          <div><MapData Data={stacktwo} ScrollBtn={scrollToPosition}/></div>
        </div>
      </>:<></>}
      {Slider?<div className={Styles.OverflowScrollAnimation} ref={sliderRef}>
        {data.map((item,index)=>{
          return <div key={index} className={Styles.FullscreenImage}>
          <span onClick={()=>{SliderValue(false)}}>&#x2716;</span>
          <span className={Styles.FullscrennnnImage}>
            <div></div>
            <a className={Styles.DownloadBtnOnSlider} href={`https://selife-bucket.s3.ap-south-1.amazonaws.com/${item}`} target="_blank" download>Download</a>
          </span>
          <div>
            <img src={`https://selife-bucket.s3.ap-south-1.amazonaws.com/${item.split('photographers_images')[0]}COMPRESS_IMAGES${item.split('photographers_images')[1]}`} alt="Fullscreen Image" className={Styles.FullscrenImage}/>
          </div>
        </div>
        })}
        </div>:<></>}
    </>
  );
};
export default MasonryLayout;