'use server'
import { redirect } from 'next/navigation'
import HomePage from "./Components/Home/page"
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
export default async function CRM(){
    noStore();
    const cookieStore = cookies();
    const UserID = cookieStore.get('UserID');
    const Password = cookieStore.get('Password');
    if(UserID === undefined || Password === undefined){
      redirect(`/`)
    }else{
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
      const data = await supabase.from('Studio-Admin').select('UserID,Password,is_verified,Is_Prime_User').eq('UserID',UserID.value);
      if(data.data.length === 0){redirect(`/`)}
      if(data.data[0].Password == Password.value && data.data[0].Is_Prime_User){return <HomePage UserID={UserID.value}/>}
      redirect(`/`)
    }
}