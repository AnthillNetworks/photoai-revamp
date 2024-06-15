"use server"
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

export default async function GetCustomerDetailsByName (CusName) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    const cookieStore = cookies();
    const UserID = cookieStore.get('UserID');
    
    const data = await supabase.from('CustomerName').select('Mobile').eq("Customer_Name", `${CusName}`);
    return data    

}
