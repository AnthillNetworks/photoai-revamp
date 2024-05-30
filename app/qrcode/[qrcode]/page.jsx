'use server'
import QrCodeGen from "./components/GenerateQrCode/page";
export default async function Home({ params }) {
  return <QrCodeGen EventName={params.qrcode}/>
}