import { ApolloProvider } from "@apollo/client";
import apolloClient from "../config/apollo";
import CampanhaState from "../context/campanhas/CampanhaState";

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <ApolloProvider client={apolloClient}>
        <CampanhaState>
            <Component {...pageProps} />
        </CampanhaState>
      </ApolloProvider>
  )
}

export default MyApp
