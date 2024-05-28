'use server'
import { unstable_noStore as noStore } from 'next/cache';
// import Cryptr from "cryptr";
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
const thirtyDays = 30 * 24 * 60 * 60;
// const cryptr = new Cryptr(process.env.NEXT_PUBLIC_APP_PHOTO_AI_SECRET_WORD);
export default async function Login(user,password){
    noStore();
    const oneDay = 24 * 60 * 60 * 1000;
    const onemonth = 7 * oneDay;
    const expirationTime = new Date(Date.now() + onemonth);
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    const data = await supabase.from('Studio-Admin').select('UserID,Password,is_verified').eq('UserID',user);
    if(data.data.length === 0){return {message:"Wrong Credentials! Please try again ...",icon:'warning'}}
    if(data.data[0].Password !== password){return {message:'Incorrect Password ...',icon:'error'}}
    if(!data.data[0].is_verified){return {message:"You are not verified! Please ask admin to approve",icon:'warning'}}
    cookies().set('UserID', user,{expires: expirationTime});
    cookies().set('Password', password,{expires: expirationTime});
    return {message:`Login Success as ${user}`,icon:'success'}
}