'use server';
import React from 'react';
import { createClient } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from "next/headers";
import axios from 'axios';
import { resolveStyleConfig } from '@chakra-ui/react';
export default async function sendsmscrm(name,cname,status,full,bal,Mobile) {
    try {
        noStore();
        const UserID = cookies();
        const User_Name = UserID.get('UserID').value;
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
        const Whatsapp_ = await supabase.from('Studio-Admin').select('WhatsApp_API,Phone_No,Is_Whatsapp_Verified').eq('UserID', User_Name);
        const WhatUrl = Whatsapp_.data[0].WhatsApp_API;
        if(Whatsapp_.data[0].Is_Whatsapp_Verified){
            const Text = `${WhatUrl}&phone=${Mobile}&text=customer_page_ut&priority=wa&stype=normal&Params=${name},${cname},${status},₹${full},₹${bal},₹${full-bal},${User_Name}`
            await hitAPI(Text);
        }else{
            const Text = `${WhatUrl}&number=91${Mobile}&type=text&message=%0AHello ${name},%0A%0AWe hope this message finds you well. We wanted to provide you with an update on your ${cname} event with us. Here are the details:%0A%0AStatus: ${status}%0ATotal Amount: ₹${full}%0AAmount Paid: ₹${bal}%0ABalance Due: ₹${full-bal}%0A%0AShould you have any questions or need further assistance, please don't hesitate to reach out.%0A%0ABest Regards,%0A${User_Name}`;
            await hitAPI(Text);
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}

async function hitAPI(Text) {
    console.log(Text.split(' ').join('%20'));
        try {
            const response = await axios.get(Text.split(' ').join('%20'));
            if (response.ok) {
                return true
            } else {
                console.log(`API hit failed for number`);
                return `API hit failed for number ${response}`
            }
        } catch (error) {
            console.error(`Error while making API request`);
            return `Error while making API request`
        }
}

export async function sendsmscrmofcustomer(name,bal,Mobile) {
    try {
        noStore();
        const UserID = cookies();
        const User_Name = UserID.get('UserID').value;
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
        const Whatsapp_ = await supabase.from('Studio-Admin').select('WhatsApp_API,Phone_No,Is_Whatsapp_Verified').eq('UserID', User_Name);
        const WhatUrl = Whatsapp_.data[0].WhatsApp_API;
        if(Whatsapp_.data[0].Is_Whatsapp_Verified){
            const text = `${WhatUrl}&phone=${Mobile}&text=account_message_ut&priority=wa&stype=normal&Params=${name},₹${bal},${User_Name}`
            await hitAPI(text);
        }else{
            const Text = `${WhatUrl}&number=91${Mobile}&type=text&message=%0AHello ${name},%0A%0AWe hope this message finds you well. We like to provide you with an update regarding your account with us.%0A%0AThe current outstanding balance to be settled is ₹${bal}.%0A%0AShould you have any queries or require further clarification, please feel free to get in touch with us.%0A%0ABest Regards,%0A${User_Name}`;
            await hitAPI(Text);
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        return false;
    }
}
export async function sendsmscrmofcustomersetelement(name,bal,Mobile,eventname,full) {
    try {
        noStore();
        const UserID = cookies();
        const User_Name = UserID.get('UserID').value;
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
        const Whatsapp_ = await supabase.from('Studio-Admin').select('WhatsApp_API,Phone_No,Is_Whatsapp_Verified').eq('UserID', User_Name);
        const WhatUrl = Whatsapp_.data[0].WhatsApp_API;
        if(Whatsapp_.data[0].Is_Whatsapp_Verified){
            const text = `${WhatUrl}&phone=${Mobile}&text=account_message_ut&priority=wa&stype=normal&Params=${name},₹${full-bal},${User_Name}`
            await hitAPI(text);;
        }else{
            const Text = `${WhatUrl}&number=91${Mobile}&type=text&message=%0A Hello ${name},%0A%0AWe hope this message finds you well. We'd like to provide you with an update regarding your account for ${eventname} event with us. %0A%0AThe current outstanding balance to be settled for ${eventname} event is ₹${full-bal}%0A%0AShould you have any queries or require further clarification, please feel free to get in touch with us. %0A%0ABest Regards,%0A${User_Name}`;
            await hitAPI(Text);;
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}

export async function sendgreatingmessages(SendingData,ArrayOfNumbers) {
    try {
        noStore();
        const UserID = cookies();
        const User_Name = UserID.get('UserID').value;
        const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_KEY);
        const Whatsapp_ = await supabase.from('Studio-Admin').select('WhatsApp_API,Phone_No,Is_Whatsapp_Verified').eq('UserID', User_Name);
        const WhatUrl = Whatsapp_.data[0].WhatsApp_API;
        let hits = 0;
        for(let a = 0;a<ArrayOfNumbers.length;a++){
            
            if(Whatsapp_.data[0].Is_Whatsapp_Verified){
                // const text = `${WhatUrl}phone=${ArrayOfNumbers[a][0]}&text=${SendingData.Greeting_Name},%0A%0A${SendingData.Desc}&media_url=${SendingData.Photo}&priority=wa&stype=normal&Params=${ArrayOfNumbers[a][1]}`
                const text = `${WhatUrl}phone=${ArrayOfNumbers[a][0]},%0A%0A${SendingData.Desc}&media_url=${SendingData.Photo}&priority=wa&stype=normal&Params=${ArrayOfNumbers[a][1]}`
                await hitAPI(text);
                hits++
            }else{
                const Text = `${WhatUrl}&number=91${ArrayOfNumbers[a][0]}&image&message=Hi ${ArrayOfNumbers[a][1]},%0A%0A${SendingData.Desc}&media_url=${SendingData.Photo}`;
                const res = await hitAPI(Text);
                if (res) {
                    hits++
                }
                else {
                    return res
                }
            }

            if (hits % 5 === 0) {
                console.log("Reached 5 hits. Waiting for 5 Seconds...");
                await new Promise(resolve => setTimeout(resolve, 5000));
            }
        }
        return true;
    } catch (error) {
        console.error('Error:', error);
        return error;
    }
}