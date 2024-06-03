"use server"
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

export default async function GetEventData (eventName) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    
    const foldersQuery = await supabase.from('UserEvents').select('DigitalInvite').eq("EventName", `${eventName}`);
    return foldersQuery.data[0]["DigitalInvite"][0];
}

export async function GetLogo () {
    const cookieStore = cookies();
    const UserID = cookieStore.get('UserID');
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    const data = await supabase.from('Studio-Admin').select('Logo').eq('UserID',UserID.value);
    return data.data[0].Logo;
}

