import React, { createContext, useState, useContext, useEffect } from 'react';
import {useRouter} from "next/router";
import {gql, useMutation} from "@apollo/client";

const OBTENER_USUARIO = gql`
        query obtenerUsuario{
            obtenerUsuario{
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

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [ loading, setLoading ] = useState(true);
    const router = useRouter();
    // Apollo handles state by itself, not necessary to handle ourselves
    const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO);

    useEffect(() => {
        async function loadUserFromLocalStorage(){
            const token = localStorage.getItem('token');
            if(token) {
                if (loading) return 'Carregando...';
                if(!data) {
                    setUser(data.obtenerUsuario);
                }
            }
            setLoading(false);
        }
        loadUserFromLocalStorage();
    }, []);

    const login = async (email, password) => {
        try {
            const { data } = await autenticarUsuario({
                variables: {
                    input: {
                        cpf,
                        senha
                    }
                }
            });

            saveMessage('Autenticando...');
            const { token } = data.autenticarUsuario;


            /* const { data: token } = await api.post('auth/login', { email, password })
            if (token) {
                console.log("Got token")
                Cookies.set('token', token, { expires: 60 })
                api.defaults.headers.Authorization = `Bearer ${token.token}`
                const { data: user } = await api.get('users/me')
                setUser(user)
                console.log("Got user", user)
            }*/
            localStorage.setItem('token', token);
            const { userData, loading, error } = useQuery(OBTENER_USUARIO);

            if (loading) return 'Carregando...';

            if(userData) {
                setUser(user);

                setTimeout(() => {
                    saveMessage(null);
                    router.push('/campanhas/dashboard');
                }, 2000);
            }else{
              router.push('/login');
            }
        } catch (error) {
            saveMessage(error.message.replace('GraphQL error: ', ''));

            setTimeout(() => {
                saveMessage(null);
            }, 3000);
        }
    }

    const logout = () => {
        localStorage.removeItem('token');
        //setUser(null)
        router.push('/login');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, loading, logout }}>
            { children }
        </AuthContext.Provider>
    )
}

export const ProtectRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    /*if (loading || (!isAuthenticated)) {
        return <LoadingScreen />;
    }*/
    return children;
}

export const useAuth = () => useContext(AuthContext);