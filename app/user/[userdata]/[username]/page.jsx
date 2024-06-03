'use server'
// import { FetchUserData } from "./userfetch"
import MasonryLayout from "./userpho";
export default async function UserData({ params }){
    return(
        <>
        <MasonryLayout event={params.userdata} username={params.username}/>
        </>
    )
}