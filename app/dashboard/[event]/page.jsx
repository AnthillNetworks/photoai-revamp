'use server'
import SignIn from "@/app/components/SignIndashboard/page";
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import Dashboard from "./dash";
export default async function DashBoard({ params }){
    noStore();
    const cookieStore = cookies();
    const UserID = cookieStore.get('UserID');
    const Password = cookieStore.get('Password');
    const Secret_Key = cookieStore.get('Secret_Key');
    if(Secret_Key !== undefined){
      return <Dashboard event={params.event.split("%20").join(" ")}/>
    }else if(UserID === undefined || Password === undefined){
      return <SignIn event={params.event}/>
    }else{
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
      const data = await supabase.from('Studio-Admin').select('UserID,Password,is_verified').eq('UserID',UserID.value);
      if(data.data.length === 0){return <SignIn event={params.event}/>}
      if(data.data[0].Password == Password.value){return <Dashboard event={params.event.split("%20").join(" ")}/>}
      return <SignIn event={params.event}/>
    }
}