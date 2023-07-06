import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CoinMarketProvider } from '../context/context'
import { ThirdwebProvider } from "@thirdweb-dev/react";

function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <ThirdwebProvider >
    <CoinMarketProvider>
      <Component {...pageProps} />
    </CoinMarketProvider>
    </ThirdwebProvider>
  
  )
}

export default MyApp
