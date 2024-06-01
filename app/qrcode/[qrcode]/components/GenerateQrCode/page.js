'use client'
import React, { useRef } from 'react';
import Styles from "./page.module.css"
import { QRCodeSVG } from 'qrcode.react';

function QrCodeGen({EventName}) {
  const qrCodeRef = useRef(null);
    const downloadQRCode = () => {
      const svg = qrCodeRef.current.querySelector('svg');
      const svgData = new XMLSerializer().serializeToString(svg);
      const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(blob);
  
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qr-code.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
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

