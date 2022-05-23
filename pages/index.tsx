 import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import Header from "../components/Header"
 import {
   MediaRenderer,
   useActiveListings,
   useMarketplace,
 } from "@thirdweb-dev/react";
 import { useRouter } from "next/router";

 const Home: NextPage = () => {
   const router = useRouter();


   const marketplace = useMarketplace(
     "0xF1be533C3b02C11CF06a98fCdCB0968CA0765A88" 
   );

   const { data: listings, isLoading: loadingListings } =
     useActiveListings(marketplace);

  return (
    <>
     <Header/>
      <div className={styles.container}>
        <h1 className={styles.h1}>NFT Marketplace </h1>
        <p className={styles.explain}>
        Découvrir les collections les plus haut de gamme, uniques et exclusives de NFT
           
        </p>

        <hr className={styles.divider} />

        <div style={{ marginTop: 32, marginBottom: 32 }}>
        
        </div> 

        <div className="main">
          {
             loadingListings ? (
              <div>Loading listings...</div>
            ) : (
              <div className={styles.listingGrid}>
                {listings?.map((listing) => (
                  <div
                    key={listing.id}
                    className={styles.listingShortView}
                    onClick={() => router.push(`/listing/${listing.id}`)}
                  >
                    <MediaRenderer
                      src={listing.asset.image}
                      style={{
                        borderRadius: 16,
                        width: "100%",
                        height: "100%",
                      }}
                    />
                    <h2 className={styles.nameContainer}>
                      <Link href={`/listing/${listing.id}`}>
                        <a className={styles.name}>{listing.asset.name}</a>
                      </Link>
                    </h2>

                    <p>
                      <b>{listing.buyoutCurrencyValuePerToken.displayValue}</b>{" "}
                      {listing.buyoutCurrencyValuePerToken.symbol}
                    </p>
                  </div>
                ))}
              </div>
            )
          }
        </div>
        </div>
    </>
  );
};

export default Home;
