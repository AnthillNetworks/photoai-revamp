'use client'
import React from 'react';
import Styles from "./page.module.css"
import { QRCodeSVG } from 'qrcode.react';

function QrCodeGen({EventName}) {
  return (
    <div className={Styles.QrCodeGen}>
            <div>
                <div style={{ color: 'black', fontSize: '20px' }}>Scan QR code to upload your selfie</div>
                <div ref={qrCodeRef} style={{ boxShadow: '0px 12px 30px 0px rgba(0, 0, 0, 0.8)' }}>
                    <QRCodeSVG value={`${process.env.NEXT_PUBLIC_WEB_APP_BASE_URL}/upload/${EventName}`} style={{width:"18em",height:"18em",margin:"1em"}}/>
                </div>
                <button className={`${Styles.downbtn} mt-10`} onClick={downloadQRCode}>Download QR Code</button>
            </div>
    </div>
  )
}

export default QrCodeGen;

