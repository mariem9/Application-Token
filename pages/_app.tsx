 import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { MariemProvider } from "../context/MariemContext";
import { MoralisProvider } from 'react-moralis'
import "../styles/globals.css";
import { ModalProvider } from 'react-simple-hook-modal'
function MyApp({ Component, pageProps }) {
  return (
    
     <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
<MoralisProvider
    
      serverUrl='https://c0smvt5l81wn.usemoralis.com:2053/server'
      appId='HUEpcBuWsZlMXyOrQ2kSZTqCFGp5UqNE3fjbLlOX'
    >
      <MariemProvider>
      <ModalProvider>
      <Component {...pageProps} />
      </ModalProvider>
      </MariemProvider>
      </MoralisProvider>
     </ThirdwebProvider>
   
  );
}

export default MyApp;