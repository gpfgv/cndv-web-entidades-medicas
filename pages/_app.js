import { ApolloProvider } from "@apollo/client";
import { Provider } from 'next-auth/client';
import apolloClient from "../config/apollo";
import CampanhaState from "../context/campanhas/CampanhaState";

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <Provider session={pageProps.session}>
          <ApolloProvider client={apolloClient}>
                      <CampanhaState>
                          <Component {...pageProps} />
                      </CampanhaState>
          </ApolloProvider>
      </Provider>
  )
}

export default MyApp
