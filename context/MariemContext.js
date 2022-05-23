
import { createContext, useEffect, useState } from 'react'
 import { useAddress, useMetamask, useDisconnect } from "@thirdweb-dev/react"
import { useMoralis,useMoralisQuery  } from 'react-moralis'
import { ethers } from 'ethers'
import {
    dogeAbi,
    daiAbi,
    linkAbi,
    usdcAbi,
    dogeAddress,
    linkAddress,
    daiAddress,
    usdcAddress,
    amazonAbi, 
    amazonCoinAddress, 
  } from '../lib/constants'
export const MariemContext = createContext()

export const MariemProvider = ({ children }) => {
     const address = useAddress();
     const connectWithMetamask = useMetamask();
     const disconnectWallet = useDisconnect(); 
    const [currentAccount, setCurrentAccount] = useState('')
    const [formattedAccount, setFormattedAccount] = useState('')
    const [coinSelect, setCoinSelect] = useState('DOGE')
    const [toCoin, setToCoin] = useState('')
    const [balance, setBalance] = useState('')
  
    const [amount, setAmount] = useState('')
  
    const { isAuthenticated, authenticate, user, logout, Moralis, enableWeb3, isWeb3Enabled } =  useMoralis()
     



    useEffect(async () => {
        if (isAuthenticated) {
          const account = user.get('ethAddress')
          let formatAccount = account.slice(0, 4) + '...' + account.slice(-4)
           setFormattedAccount(formatAccount)
          setCurrentAccount(account)
            const currentBalance = await Moralis.Web3API.account.getNativeBalance({
                chain: 'rinkeby',
                 address: currentAccount,
               })
               const balanceToEth = Moralis.Units.FromWei(currentBalance.balance)
               const formattedBalance = parseFloat(balanceToEth).toFixed(3)
              setBalance(formattedBalance)
        }
      }, [isAuthenticated, enableWeb3])
  
    // useEffect(() => {
    //   if (!currentAccount) return
    //   ;(async () => {
    //     const response = await fetch('/api/createUser', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         walletAddress: currentAccount,
    //       }),
    //     })
  
    // const data = await response.json()
    //   })()
    // }, [currentAccount])
  
    const getContractAddress = () => {
      if (coinSelect === 'DAI') return daiAddress
      if (coinSelect === 'DOGE') return dogeAddress
      if (coinSelect === 'LINK') return linkAddress
      if (coinSelect === 'USDC') return usdcAddress
    }
  
    const getToAddress = () => {
      if (toCoin === 'DAI') return daiAddress
      if (toCoin === 'DOGE') return dogeAddress
      if (toCoin === 'LINK') return linkAddress
      if (toCoin === 'USDC') return usdcAddress
    }
  
    const getToAbi = () => {
      if (toCoin === 'DAI') return daiAbi
      if (toCoin === 'DOGE') return dogeAbi
      if (toCoin === 'LINK') return linkAbi
      if (toCoin === 'USDC') return usdcAbi
    }
  
    //Mint function for the token with send ether to the contract
    const mint = async () => {
      try {
        if (coinSelect === 'ETH') {
          if (!isAuthenticated) return
          await Moralis.enableWeb3()
          const contractAddress = getToAddress()
          const abi = getToAbi()
  
          let options = {
            contractAddress: contractAddress,
            functionName: 'mint',
            abi: abi,
            params: {
              to: currentAccount,
              amount: Moralis.Units.Token('50', '18'),
            },
          }
          sendEth()
          const transaction = await Moralis.executeFunction(options)
          const receipt = await transaction.wait(4)
          console.log(receipt)
          saveTransaction(receipt.transactionHash, amount, receipt.to)
        } else {
          swapTokens()
          saveTransaction(receipt.transactionHash, amount, receipt.to)
        }
      } catch (error) {
        console.error(error.message)
      }
    }
  
    const swapTokens = async () => {
      try {
        if (!isAuthenticated) return
        await Moralis.enableWeb3()
  
        if (coinSelect === toCoin) return
  
        const fromOptions = {
          type: 'erc20',
          amount: Moralis.Units.Token(amount, '18'),
          receiver: getContractAddress(),
          contractAddress: getContractAddress(),
        }
        const toMintOptions = {
          contractAddress: getToAddress(),
          functionName: 'mint',
          abi: getToAbi(),
          params: {
            to: currentAccount,
            amount: Moralis.Units.Token(amount, '18'),
          },
        }
        let fromTransaction = await Moralis.transfer(fromOptions)
        let toMintTransaction = await Moralis.executeFunction(toMintOptions)
        let fromReceipt = await fromTransaction.wait()
        let toReceipt = await toMintTransaction.wait()
        console.log(fromReceipt)
        console.log(toReceipt)
      } catch (error) {
        console.error(error.message)
      }
    }
  
    //Send eth function
    const sendEth = async () => {
      if (!isAuthenticated) return
      const contractAddress = getToAddress()
  
      let options = {
        type: 'native',
        amount: Moralis.Units.ETH('0.01'),
        receiver: contractAddress,
      }
      const transaction = await Moralis.transfer(options)
      const receipt = await transaction.wait()
      console.log(receipt)
      saveTransaction(receipt.transactionHash, '0.01', receipt.to)
    }
  
    // const saveTransaction = async (txHash, amount, toAddress) => {
    //   await fetch('/api/swapTokens', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       txHash: txHash,
    //       from: currentAccount,
    //       to: toAddress,
    //       amount: parseFloat(amount),
    //     }),
    //   })
    // }
  
    const connectWallet = () => {
      authenticate()
    }
  
    const signOut = () => {
      console.log('Logged out')
      logout()
    }
      


















    const [tokenAmount, setTokenAmount] = useState('')
    const [amountDue, setAmountDue] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [etherscanLink, setEtherscanLink] = useState('')
    const [nickname, setNickname] = useState('')
    const [username, setUsername] = useState('')
    const [assets, setAssets] = useState([])
    const [recentTransactions, setRecentTransactions] = useState([])
    const [ownedItems, setOwnedItems] = useState([])
  
   
  
    const {
      data: userData,
      error: userDataError,
      isLoading: userDataIsLoading,
    } = useMoralisQuery('_User')
  
    const {
      data: assetsData,
      error: assetsDataError,
      isLoading: assetsDataIsLoading,
    } = useMoralisQuery('assets')
  
    // useEffect(async () => {
    //   console.log(assetsData)
    //   await enableWeb3()
    //   await getAssets()
    //   await getOwnedAssets()
    // }, [userData, assetsData, assetsDataIsLoading, userDataIsLoading])
  
    //  useEffect(async () => {
    //    if (!isWeb3Enabled) {
    //      await enableWeb3()
    //    }
    //    await listenToUpdates()
  
    //   if (isAuthenticated) {
    //      await getBalance()
    //      const currentUsername = await user?.get('nickname')
    //      setUsername(currentUsername)
    //      const account = await user?.get('ethAddress')
    //      setCurrentAccount(account)
    //      const formatAccount = account.slice(0, 5) + '...' + account.slice(-5)
    //      setFormattedAccount(formatAccount)
    //    } else {
    //      setCurrentAccount('')
    //      setFormattedAccount('')
    //      setBalance('')
    //    }
    //  }, [
    //    isWeb3Enabled,
    //    isAuthenticated,
    //    balance,
    //    setBalance,
    //    authenticate,
    //    currentAccount,
    //    setUsername,
    //    user,
    //    username,
    //  ])
  
    // const connectWallet = async () => {
    //   await enableWeb3()
    //   await authenticate()
    // }
  
    const buyTokens = async () => {
      if (!isAuthenticated) {
        await connectWallet()
      }
  
      const amount = ethers.BigNumber.from(tokenAmount)
      const price = ethers.BigNumber.from('100000000000000')
      const calcPrice = amount.mul(price)
  
      console.log(amazonCoinAddress)
  
      let options = {
        contractAddress: amazonCoinAddress,
        functionName: 'mint',
        abi: amazonAbi,
        msgValue: calcPrice,
        params: {
          amount,
        },
      }
      const transaction = await Moralis.executeFunction(options)
      const receipt = await transaction.wait()
      setIsLoading(false)
      console.log(receipt)
      setEtherscanLink(
        `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
      )
    }
  
    const handleSetUsername = () => {
      if (user) {
        if (nickname) {
          user.set('nickname', nickname)
          user.save()
          setNickname('')
        } else {
          console.log("Can't set empty nickname")
        }
      } else {
        console.log('No user')
      }
    }
  
    const getBalance = async () => {
      try {
        if (!isAuthenticated || !currentAccount) return
        const options = {
          contractAddress: amazonCoinAddress,
          functionName: 'balanceOf',
          abi: amazonAbi,
          params: {
            account: currentAccount,
          },
        }
  
        if (isWeb3Enabled) {
          const response = await Moralis.executeFunction(options)
          console.log(response.toString())
          setBalance(response.toString())
        }
      } catch (error) {
        console.log(error)
      }
    }
  
    const buyAsset = async (price, assets) => {
      try {
        if (!isAuthenticated) return
        console.log('price: ', price)
        console.log('asset: ', assets.name)
        console.log(userData)
  
        const options = {
          type: 'erc20',
          amount: price,
          receiver: amazonCoinAddress,
          contractAddress: amazonCoinAddress,
        }
  
        let transaction = await Moralis.transfer(options)
        const receipt = await transaction.wait()
  
        if (receipt) {
          //You can do this but it's not necessary with Moralis hooks!
          // const query = new Moralis.Query('_User')
          // const results = await query.find()
  
          const res = userData[0].add('ownedAsset', {
            ...assets,
            purchaseDate: Date.now(),
            etherscanLink: `https://rinkeby.etherscan.io/tx/${receipt.transactionHash}`,
          })
  
          await res.save().then(() => {
            alert("You've successfully purchased this asset!")
          })
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  
    const getAssets = async () => {
      try {
        await enableWeb3()
        // const query = new Moralis.Query('Assets')
        // const results = await query.find()
  
        setAssets(assetsData)
      } catch (error) {
        console.log(error)
      }
    }
  
    const listenToUpdates = async () => {
      let query = new Moralis.Query('EthTransactions')
      let subscription = await query.subscribe()
      subscription.on('update', async object => {
        console.log('New Transactions')
        console.log(object)
        setRecentTransactions([object])
      })
    }
  
    const getOwnedAssets = async () => {
      try {
        // let query = new Moralis.Query('_User')
        // let results = await query.find()
  
        if (userData[0]) {
          setOwnedItems(prevItems => [
            ...prevItems,
            userData[0].attributes.ownedAsset,
          ])
        }
      } catch (error) {
        console.log(error)
      }
    }
















  return (
    <MariemContext.Provider
      value={{
       
        address,
         connectWithMetamask,
         disconnectWallet,
        connectWallet,
        currentAccount,
        signOut,
        isAuthenticated,
        formattedAccount,
        setAmount,
        mint,
        setCoinSelect,
        coinSelect,
        balance,
        swapTokens,
        amount,
        toCoin,
        setToCoin,



        buyTokens,
        getBalance,
        balance,
        setTokenAmount,
        tokenAmount,
        amountDue,
        setAmountDue,
        isLoading,
        setIsLoading,
        setEtherscanLink,
        etherscanLink,
        buyAsset,
        currentAccount,
        nickname,
        setNickname,
        username,
        setUsername,
        handleSetUsername,
        assets,
        recentTransactions,
        ownedItems,
      }}
    >
      {children}
    </MariemContext.Provider>
  )
}
