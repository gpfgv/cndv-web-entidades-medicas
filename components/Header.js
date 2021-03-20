import React from 'react';
import { gql} from '@apollo/client';
import {useRouter} from "next/router";

const OBTENER_USUARIO = gql`
        query obtenerUsuario{
            obtenerUsuario{
                cpf
                nome
                email
            }
        }
    `;

const Header = () => {

    const router = useRouter();

    const closeSession = () => {
        localStorage.removeItem('token');
        router.push('/login');
    }

    return (
        <div className="flex justify-between mb-6">
            <p className="mr-2">Bem-vindo Admin</p>
            <button
                onClick={() => closeSession() }
                type="button"
                className="bg-blue-800 w-full sm:w-auto font-bold uppercase text-xs rounded py-1 px-2 text-white shadow">
                Sair
            </button>
        </div>
    );
}

export default Header;