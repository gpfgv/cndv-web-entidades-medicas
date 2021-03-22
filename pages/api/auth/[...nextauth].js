import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import apolloClient from "../../../config/apollo";
import {gql, useQuery, useMutation} from "@apollo/client";

const OBTENER_USUARIO = gql`
        query obtenerUsuario($token: String!){
          obtenerUsuario(token: $token) {
            cpf
            nome
            email
          }
        }
    `;

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput){
      autenticarUsuario(input: $input) {
        token
      }
    }
`;

export default NextAuth({
    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `jwt` is automatically set to `true` if no database is specified.
        jwt: true,

        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days

        // Seconds - Throttle how frequently to write to database to extend a session.
        // Use it to limit write operations. Set to 0 to always update the database.
        // Note: This option is ignored if using JSON Web Tokens
        updateAge: 24 * 60 * 60, // 24 hours
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                try {
                   /*
                     TODO fix this once we set CNPJ authentication for CNDV Admin Simulador
                     const response = await apolloClient.mutate({mutation: AUTENTICAR_USUARIO,
                        variables: {
                            input: {
                                cpf: '111.111.111-11',
                                senha: '123456'
                            }
                        }
                    });
                    const { token } = response.data.autenticarUsuario;
                    const { data, loading, error } = await apolloClient.query({ query: OBTENER_USUARIO,
                        variables: {
                            token
                        }
                    });
                    if (error) {
                        return { email: error, name: 'nometeste' }
                    }
                    return { email: data.obtenerUsuario.email, name: data.obtenerUsuario.cpf }*/
                    return { email: 'mrjhonyvidal@gmail.com', name: '07346574000165' }
                } catch (error) {
                    throw new Error('GraphQL error:' + error);
                }
            }
        })
    ]
})