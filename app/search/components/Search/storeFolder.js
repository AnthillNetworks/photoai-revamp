"use server"
import { cookies } from 'next/headers'
import { createClient } from '@supabase/supabase-js'

export default async function Storefolder (folderName,searchValue) {
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
    const cookieStore = cookies();
    const UserID = cookieStore.get('UserID');
    const DycUserID = UserID.value;
    let name_ = `${DycUserID}-${searchValue}`
    

    const foldersQuery = await supabase.from('UserEvents').select('Folders').eq("EventName", `${name_}`);
    let existingFolders = foldersQuery.data[0].Folders;

    if (existingFolders.includes(folderName)) {
        return "Folder Already Exists"
    } else {
        existingFolders.push(folderName);
        const data = await supabase.from('UserEvents').update({ 'Folders': existingFolders  }).eq('EventName',`${name_}`).select('Folders');
        return data  
    }
}
