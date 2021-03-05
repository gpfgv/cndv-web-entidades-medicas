import React from 'react';
import Layout from "../components/Layout";
import { gql, useQuery } from '@apollo/client';

const OBTENER_CAMPANHAS = gql`
    query obtenerCampanhas{
        obtenerCampanhas{
            id
            nome
            idade_inicio
            idade_final
            municipio
            uf
        }
    }
`;

const Campanhas = () => {
    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Campanhas</h1>
            </Layout>
        </div>
    );
}

export default Campanhas;