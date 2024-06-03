'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
const thirtyDays = 30 * 24 * 60 * 60;
export default async function LoginwithSecretKey(EventName,Key){
    noStore();
    const oneDay = 24 * 60 * 60 * 1000;
    const onemonth = 7 * oneDay;
    const expirationTime = new Date(Date.now() + onemonth);
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    const data = await supabase.from('UserEvents').select('Secret_Key').eq('EventName',EventName).eq('Secret_Key',Key);
    
    console.log(data.data[0]);
    if(data.data.length === 0){return {message:"Wrong Key ...",icon:'warning'}}
    if(data.data[0].Secret_Key !== Key){return {message:'Incorrect Key ...',icon:'error'}}
    cookies().set('Secret_Key', Key,{expires: expirationTime});
    return {message:`Success ...`,icon:'success'}
}