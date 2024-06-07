'use server'
import SignIn from "./components/SignIn/page";
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'
import Welcome from "./components/welcome/page";
export default async function Home() {
  noStore();
  const cookieStore = cookies();
  const UserID = cookieStore.get('UserID');
  const Password = cookieStore.get('Password');
  if(UserID === undefined || Password === undefined){
    return <SignIn/>
  }else{
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    const data = await supabase.from('Studio-Admin').select('UserID,Password,is_verified,Is_Prime_User,Logo').eq('UserID',UserID.value);
    if(data.data.length === 0){return <SignIn/>}
    const DataBasePassword = data.data[0].Password;
    if(DataBasePassword == Password.value){return <Welcome is_PrimeUser={data.data[0].Is_Prime_User} UserID={data.data[0].UserID} Logo={data.data[0].Logo}/>}
    return <SignIn/>
  }
}
