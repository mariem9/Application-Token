import {MariemContext} from '../context/MariemContext'
import React, { useContext } from "react";
import styles from "../styles/Home.module.css";
import Image from 'next/image'
import Link from 'next/link'
import  Swap  from '../pages/Swap'
import Shop from '../pages/Shop'
export default function Header2() {
    const {
        connectWallet,
         signOut,
         currentAccount,
         isAuthenticated,
         formattedAccount,
         swapTokens,
      } = useContext(MariemContext)
    
  

  return (
    <div className={styles.header}>
      <div className={styles.left}>
      <Link href="/">
        <div style={{cursor:"pointer"}}>
          <Image src={'/logo copy.png'} height={40} width={40} />
          <div style={{fontSize:20,color:"#C42BB8"}}>APP</div>
        </div>
        </Link>
      </div>
      
         
           <a style={{fontSize:18,color:"white"}} href='/Swap' >Swap </a>
           
        <div >
        <a style={{fontSize:18,color:"white"}} href='/Shop' > Shop </a>
        </div>

        <div >
        <a style={{fontSize:18,color:"white"}} href='' > More </a>
            </div>
        
            <div className={styles.right}>
      
            {isAuthenticated && (
          <>
            <div >{formattedAccount}</div>
            <div  className={styles.secondaryButton} onClick={() => signOut()}>
              Logout
            </div>
          </>
        )}

        {!isAuthenticated && (
          <div   className={styles.mainButton} onClick={() => connectWallet()}>
            Login
          </div>
         )} 
      </div>
    </div>
  );
}