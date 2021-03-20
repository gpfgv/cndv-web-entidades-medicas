import { ApolloProvider } from "@apollo/client";
import apolloClient from "../config/apollo";
import CampanhaState from "../context/campanhas/CampanhaState";
import {AuthProvider, ProtectRoute} from "../context/auth/AuthProvider";

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
      <ApolloProvider client={apolloClient}>
          <AuthProvider>
              <ProtectRoute>
                  <CampanhaState>
                      <Component {...pageProps} />
                  </CampanhaState>
              </ProtectRoute>
          </AuthProvider>
      </ApolloProvider>
  )
}

export default MyApp
