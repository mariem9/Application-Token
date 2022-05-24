// import React, { useContext, useEffect } from 'react'
// import { MariemContext } from '../context/MariemContext'

import Cards from './Cards'
import Featured from './Featured'
import Header3 from './Header3'

const Main = () => {
  const styles = {
    container: `w-screen h-screen flex flex-col`,
    recentTitle: `text-2xl font-bold text-center mb-[20px] text-center mt-[40px]`,
    recentTransactionsList: `flex flex-col`,
    transactionCard: `flex justify-between mb-[20px] p-[30px] bg-[#42667e] text-white rounded-xl shadow-xl font-bold gap-[20px] text-xl`,
  }
  // const { recentTransactions } = useContext(MariemContext)

  return (
    <div className={styles.container}>
      <Header3 />
       <Featured /> 
      <Cards />
      {/* {recentTransactions.length > 0 && (
        <h1 className={styles.recentTitle}>Recent Transaction</h1>
      )}
      {recentTransactions &&
        recentTransactions.map((transaction, index) => {
          console.log(transaction)
          return (
            <div key={index} className={styles.recentTransactionsList}>
              <div className={styles.transactionCard}>
                <p>From: {transaction.attributes.from_address}</p>
                <p>To: {transaction.attributes.to_address} </p>
                <p>
                  Hash:{' '}
                  <a
                    target={'_blank'}
                    rel='noopener noreferrer'
                    href={`https://rinkeby.etherscan.io/tx/${transaction.attributes.hash}`}
                  >
                    {transaction.attributes.hash.slice(0, 10)}
                  </a>
                </p>
                <p>Gas: {transaction.attributes.gas}</p> */}
              {/* </div> */}
            {/* </div>
          )
        })} */}
    </div>
  )
}

export default Main
