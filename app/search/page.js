'use server'
import SignIn from "../components/SignIn/page";
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers'
import { GetAllEvents,GetAllEventsAsSuperAdmin } from "./components/Search/search";
import { createClient } from '@supabase/supabase-js'
import Search from "./components/Search/searchpage";
export default async function Home() {
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
    if(data.data[0].Password == Password.value){
      if(UserID.value === 'superAIadmin' && Password.value ==='AdminSuper@123'){
        const res = await GetAllEventsAsSuperAdmin();
        return <Search AllEventData={res} SuperAdmin={true}/>
      }else{
      const AllEventData = await GetAllEvents();
      return <Search AllEventData={AllEventData} SuperAdmin={false}/>
      }
    }
    return <SignIn/>
  }
}
