import "../styles/globals.css"
import { BingoProvider } from "../contexts/BingoContext"

function MyApp({ Component, pageProps }) {
  return (
    <BingoProvider>
      <Component {...pageProps} />
    </BingoProvider>
  )
}

export default MyApp
