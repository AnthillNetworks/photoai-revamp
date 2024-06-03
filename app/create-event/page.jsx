'use server'
import SignIn from "../Components/SignIn/page";
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import Event from "./components/page";
export default async function CreateEvent(){
    noStore();
    const cookieStore = cookies();
    const UserID = cookieStore.get('UserID');
    const Password = cookieStore.get('Password');
    if(UserID === undefined || Password === undefined){
      return <SignIn/>
    }else{
      const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
      const data = await supabase.from('Studio-Admin').select('UserID,Password,is_verified').eq('UserID',UserID.value);
      if(data.data.length === 0){return <SignIn/>}
      if(data.data[0].Password == Password.value){return <Event UserId={UserID.value}/>}
      return <SignIn/>
    }
}
