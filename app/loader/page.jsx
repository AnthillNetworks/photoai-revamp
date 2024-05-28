'use client'
import Styles from "./page.module.css"
export default function Loader(){
    return(
        <>
        <div className={Styles.loader}>
            <img src="/svg/Spinner.svg" alt="spinner" />
        </div>
        </>
    )
}