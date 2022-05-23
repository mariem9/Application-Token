import React, { useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import { MariemContext } from '../context/MariemContext'

  const styles = {
    container: ` w-[60%] flex flex-col border-[#d6d7d9] border-2 rounded-lg shadow-lg`,
    top: `flex w-full h-[100px] bg-[#f0f1f3] p-[20px] pr-[120px] gap-[80px]`,
    topHeaderText: `text lg text-left flex items-center`,
    topHeaderEndText: `text lg flex items-center  flex-row p-[20px]`,
    content: `flex flex-col w-full h-[400px] gap-[20px] p-[20px] flex-1`,
    date: `text-xl font-bold`,
    item: `flex flex-row gap-[5px] w-full`,
    nameContainer: `flex flex-col justify-end`,
    itemName: `text-mg font-bold flex ml-[5px]`,
    buyAgainBtn: `bg-[#ffd713] font-bold rounded-full p-[3px] h-[30px] w-[150px] cursor-pointer text-[#3a2802] text-center mb-[3px] mt-[5px]`,
    etherscanBtn: `font-bold rounded-full h-[30px] w-[100px] cursor-pointer text-[#3a2802] text-center border-2 border-[#ffd713] flex justify-center items-center`,
  }

  const Transaction = ({ item }) => {
  const { username } = useContext(AmazonContext)

  return (
    <>
      {item.map((assets, index) => {
        return (
          <div className={styles.container} key={index}>
            <div className={styles.top}>
              <div className='flex w-full gap-[80px]'>
                <div className={styles.topHeaderText}>
                  ORDER PLACED <br />
                  {moment(assets.purchaseDate).format('MMMM Do YYYY')}
                </div>
                <div className={styles.topHeaderText}>
                  TOTAL <br />
                  {assets.price} AC
                </div>
                <div className={styles.topHeaderText}>
                  SHIP TO <br />
                  {username}
                </div>
              </div>
            </div>
            <div className={styles.content}>
              <div className={styles.date}>
                Bought on {moment(assets.purchaseDate).format('MMMM Do')}
              </div>
              <div className={styles.item}>
                <Image
                  className='object-cover'
                  src={assets.src}
                  alt='item'
                  height={100}
                  width={100}
                />
                <div className={styles.nameContainer}>
                  <div className={styles.itemName}>{assets.name}</div>
                  <div className='flex flex-row items-center justify-center gap-4'>
                    <div className={styles.buyAgainBtn}>Buy it Again</div>
                    <Link href={`${assets.etherscanLink}`}>
                      <a target='_blank' rel='noopener'>
                        <div className={styles.etherscanBtn}>Etherscan</div>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Transaction
