"use client"
import React, { useState, useEffect } from "react";
import Styles from "./page.module.css";
import FmdGoodRoundedIcon from '@mui/icons-material/FmdGoodRounded';

import GetLogoUrl from "./getLogo";
import GetEventData from "./getEventdata";

export default function DigitalInvite({eventData})  {

  const [inputDate, setInputDate] = useState("");
  const [groomName, setgroomName] = useState("");
  const [brideName, setbrideName] = useState("");
  const [loc_,setloc_] = useState("");
 
  const [formattedmonth , setformattedmonth] = useState("");
  const [formatteddate , setformatteddate] = useState("");

  const [eventname , setevename] = useState("");
  const [mapLink , setmapLink] = useState(null);
  const [utubeLink , setutubeLink] = useState(null);
  const [Logo, setLogo] = useState("");

  const monthMapping = {
    "01": "January",
    "02": "February",
    "03": "March",
    "04": "April",
    "05": "May",
    "06": "June",
    "07": "July",
    "08": "August",
    "09": "September",
    "10": "October",
    "11": "November",
    "12": "December"
  };

  const daySuffix = {
    "1": "st",
    "2": "nd",
    "3": "rd",
    "21": "st",
    "22": "nd",
    "23": "rd",
    "31": "st",
    "_default": "th"
  };

  function getDaySuffix(day) {
    if (day in daySuffix) {
        return daySuffix[day];
    } else {
        return daySuffix["_default"];
    }
}

  useEffect(() => {
    if (eventData && eventData.eventDate) {
      setInputDate(eventData.eventDate);
      setbrideName(eventData.brideName);
      setgroomName(eventData.groomName);
      setloc_(eventData.loc_);
      setevename(eventData.eventname);
      GetData(eventData.eventname);
      GetLogo(eventData.eventname.split("-")[0]);
    }
  }, [eventData]);

  const GetData = async(name) =>{
    const SupaBaseData = await GetEventData(name);
    if (SupaBaseData["maplink"] != "") {
      setmapLink(SupaBaseData["maplink"]);
    }
    const originalUrl = SupaBaseData["utubelink"];
    if  (originalUrl != ""){ 
      const videoId = originalUrl.split("v=")[1];
      const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      setutubeLink(embedUrl);
    }
  }

  const GetLogo = async(UserID) => {
    const logo = await GetLogoUrl(UserID);
    setLogo(logo);
  }

  const [year, month, date] = inputDate.split("-");
  const targetDate = `${year}-${month}-${date}T00:00:00`;

  useEffect(() => {
    const formatted = monthMapping[month];
    setformattedmonth(formatted);
    const formattedDate = `${getDaySuffix(date)}`; 
    setformatteddate(formattedDate);
  }, [month]);

  const calculateTimeLeft = () => {
    const targetTime = new Date(targetDate);
    const currentTime = new Date();
    const difference = targetTime.getTime() - currentTime.getTime();
    let remainingTime = {};

    if (difference > 0) {
      remainingTime = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return remainingTime;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      calculateTimeLeft()
    }, 1000);

    return () => clearTimeout(timer);
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatDigits = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
  };

  const handleButtonClick = () => {
    window.location.href = mapLink;
  };

  return (
    <div>
      <div className={Styles.container}>
        <div className={Styles.imgDiv}>
          <img src='/svg/potrait.jpg' alt="" className={Styles.image} />
          <div className={Styles.logoDiv}><img src={Logo || ""} alt="Logo" className={Styles.logoImg} /></div>
          <div className={Styles.bride}>{groomName}</div>
          <div className={Styles.weds}>Weds</div>
          <div className={Styles.groom}>{brideName}</div>
          <div className={Styles.date}>
            <div>
              {date}<sup>{formatteddate}</sup> {formattedmonth} , {year}
            </div>
            <div className={Styles.locationEvent}>{loc_}</div>
          </div>

          {/* Get Direction */}
          {
            mapLink && (
              <div className={`${Styles.getDirection}`}>
                <button onClick={handleButtonClick} className={`${Styles.getbtn}`} > <div><FmdGoodRoundedIcon style={{width:"20px !important"}} /> </div> Get  Direction</button>
              </div>
            )
          }

          <div className={Styles.remCon}>
            {timeLeft.days > 0 && <div className={Styles.eachRem}><div className={Styles.values}>{`${timeLeft.days}:`}</div><div className={Styles.lables}>Days</div></div>}
            {
              <>
                <div className={Styles.eachRem}>
                  <div className={Styles.values}>{`${formatDigits(timeLeft.hours)}` === "undefined" ? "00" : `${formatDigits(timeLeft.hours)}:` }</div>
                  <div className={Styles.lables}>Hours</div>
                </div>
                <div className={Styles.eachRem}>
                  <div className={Styles.values}>{`${formatDigits(timeLeft.minutes)}` === "undefined" ? "00" : `${formatDigits(timeLeft.minutes)}:` }</div>
                  <div className={Styles.lables}>Minutes</div>
                </div>
                <div className={Styles.eachRem}>
                  <div className={Styles.values}>{`${formatDigits(timeLeft.seconds)}` === "undefined" ? "00" : `${formatDigits(timeLeft.seconds)}` }</div>
                  <div className={Styles.lables}>Seconds</div>
                </div>
              </>
            }
          </div>

          {/* Video */}
          {
            utubeLink && utubeLink !== "" && (
              <div className={Styles.videoDiv}>
                <iframe
                  width="280"
                  height="150"
                  src={utubeLink}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                ></iframe>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};
