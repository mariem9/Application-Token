import React, { useState, useContext, useEffect } from 'react'
import Card from './Card'
import { MariemContext } from '../context/MariemContext'

const Cards = () => {
  const styles = {
    container: `h-full w-full flex flex-col ml-[40px] -mt-[40px]`,
    title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
    cards: `flex items-center  flex-wrap gap-[60px]`,
  }
  const { assets } = useContext(MariemContext)

  return (
    <div className={styles.container}>
      <div className={styles.title}>New Release</div>
      <div className={styles.cards}>
        <div className={styles.cards}>
          {assets.map(item => {
            let assets = item.attributes

            return <Card key={item.id} item={item.attributes} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Cards
