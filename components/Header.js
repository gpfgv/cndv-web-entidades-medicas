import React from 'react';
import { useQuery, gql} from '@apollo/client';


const OBTENER_USUARIO = gql`
        query obtenerUsuario{
            obtenerUsuario{
                cpf,
                nome
            }
        }
    `;

const Header = () => {

    const { data, loading, error } = useQuery(OBTENER_USUARIO);

    if (loading) return 'Carregando...';

    return (
        <div className="flex justify-end">
            <p className="mr-2">Bem-vindo: Jhony Vidal</p>
            <button type="button">
                Sair
            </button>
        </div>
    );
}

export default Header;