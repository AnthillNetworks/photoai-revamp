"use server"
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

export default async function StoreKey (SecretKey,searchValue) {
    console.log(SecretKey,searchValue);
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    const cookieStore = cookies();
    const UserID = cookieStore.get('UserID');
    const DycUserID = UserID.value;
    let name_ = `${DycUserID}-${searchValue}`
    const res = await supabase.from('UserEvents').update({ 'Secret_Key': SecretKey  }).eq('EventName',`${name_}`).select('Secret_Key');
    console.log(res);
    return "Success"
}
