import {MariemContext} from '../context/MariemContext'
import React, { useContext } from "react";
import styles from "../styles/Home.module.css";
import Image from 'next/image'
import Link from 'next/link'
import  Swap  from '../pages/Swap'
import Shop from '../pages/Shop'
export default function Header() {
  const {
    address,
    connectWithMetamask,
    disconnectWallet,
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
        {address ? (
          <>
            <a
              className={styles.secondaryButton}
              onClick={() =>disconnectWallet()}
            >
              Disconnect Wallet
            </a>
            <p style={{ marginLeft: 8, marginRight: 8, color: "grey" }}>|</p>
            <p>{address.slice(0, 6).concat("...").concat(address.slice(-4))}</p>
          </>
        ) : (
          <a
            className={styles.mainButton}
            onClick={() =>  connectWithMetamask()}
          >
            Connect Wallet
          </a>
        )}
      </div>
      </div>
  );
}