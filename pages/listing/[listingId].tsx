 import {
     MediaRenderer,
     useMarketplace,
     useNetwork,
     useNetworkMismatch,
   } from "@thirdweb-dev/react";
   import {
     AuctionListing,
     ChainId,
     DirectListing,
     ListingType,
     NATIVE_TOKENS,
   } from "@thirdweb-dev/sdk";
   import type { NextPage } from "next";
   import { useRouter } from "next/router";
   import { useEffect, useState } from "react";
   import styles from "../../styles/Home.module.css";
  
   const ListingPage: NextPage = () => {
    
     const router = useRouter();
  
     const { listingId } = router.query as { listingId: string };
  
     const [loadingListing, setLoadingListing] = useState<boolean>(true);
  
     const [bidAmount, setBidAmount] = useState<string>("");
  
     const [listing, setListing] = useState<
       undefined | DirectListing | AuctionListing
     >(undefined);
  
     const marketplace = useMarketplace(
       "0xF1be533C3b02C11CF06a98fCdCB0968CA0765A88" 
     );
  
     const networkMismatch = useNetworkMismatch();
     const [, switchNetwork] = useNetwork();
  
     useEffect(() => {
       if (!listingId || !marketplace) {
         return;
       }
       (async () => {
         const l = await marketplace.getListing(listingId);
  
         setLoadingListing(false);
         setListing(l);
       })();
     }, [listingId, marketplace]);
  
     if (loadingListing) {
       return <div className={styles.loadingOrError}>Loading...</div>;
     }
  
     if (!listing) {
       return <div className={styles.loadingOrError}>Listing not found</div>;
     }
  
     async function createBidOrOffer() {
       try {
         if (networkMismatch) {
           switchNetwork && switchNetwork(4);
           return;
         }
  
         if (listing?.type === ListingType.Direct) {
           await marketplace?.direct.makeOffer(
             listingId, 
             1, 
             NATIVE_TOKENS[ChainId.Rinkeby].wrapped.address, 
             bidAmount 
           );
         }
  
         if (listing?.type === ListingType.Auction) {
           await marketplace?.auction.makeBid(listingId, bidAmount);
         }
  
         alert(
           `${
             listing?.type === ListingType.Auction ? "Bid" : "Offer"
           } created successfully!`
         );
       } catch (error) {
        console.error(error);
         alert(error);
       }
     }
  
     async function buyNft() {
       try {
    
         if (networkMismatch) {
           switchNetwork && switchNetwork(4);
           return;
         }
  
         await marketplace?.buyoutListing(listingId, 1);
         alert("NFT bought successfully!");
       } catch (error) {
         console.error(error);
         alert(error);
      }
     }
  
     return (
       <div className={styles.container} style={{}}>
         <div className={styles.listingContainer}>
           <div className={styles.leftListing}>
             <MediaRenderer
               src={listing.asset.image}
               className={styles.mainNftImage}
             />
           </div>
  
           <div className={styles.rightListing}>
                          <h1>{listing.asset.name}</h1>
             <p>
               Owned by{" "}
               <b>
                 {listing.sellerAddress?.slice(0, 6) +
                   "..." +
                   listing.sellerAddress?.slice(36, 40)}
               </b>
             </p>
  
             <h2>
               <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
               {listing.buyoutCurrencyValuePerToken.symbol}
             </h2>
  
             <div
               style={{
                 display: "flex",
                 flexDirection: "row",
                 gap: 20,
                 alignItems: "center",
               }}
             >
               <button
                 style={{ borderStyle: "none" }}
                 className={styles.mainButton}
                 onClick={buyNft}
               >
                 Buy
               </button>
              
               
                
               </div>
             </div>
           </div>
         </div>
      
     );
   };
  
   export default ListingPage;
  