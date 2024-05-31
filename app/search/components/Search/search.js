'use server'
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
export async function GetAllEvents(){
    noStore();
    const cookieStore = cookies();
    const UserID = cookieStore.get('UserID');
    let Data = await supabase.from('UserEvents').select('*').order('EventID', { ascending: false }).eq('UserID',`${UserID.value}`);
    return Data.data;
}
export async function GetAllEventsAsSuperAdmin(){
    noStore();
    const cookieStore = cookies();
    const UserID = cookieStore.get('UserID');
    let Data = await supabase.from('UserEvents').select('*').order('EventID', { ascending: false });
    return Data.data;
}
export async function SearchEvents(text){
    noStore();
    const cookieStore = cookies();
    const UserID = cookieStore.get('UserID');
    let Data = await supabase.from('UserEvents').select('*').order('EventID', { ascending: false }).eq('UserID',`${UserID.value}`).ilike('EventName', `%${text}%`);
    return Data.data
}