import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from "node-fetch";
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'https://blooming-wildwood-50755.herokuapp.com',
    fetch
});

const authLink = setContext((_, {headers}) => {

    const token = localStorage.getItem('token')

    return {
        headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : ''
        }
    }
});

const apolloClient = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: httpLink
});

const securityApolloClient = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    link: authLink.concat( httpLink )
});

export default apolloClient;