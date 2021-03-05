import React from 'react';
import Layout from "../components/Layout";
import { gql, useQuery } from '@apollo/client';

const OBTENER_CIDADOES = gql`
    query obtenerCidadoes{
        obtenerCidadoes{
            cpf
            rg
            nome
            dt_nascimento
            email
            contato
            id_tipo_sanguineo
            doador
            endereco
            numero
            complemento
            bairro
            cidade
            uf
            pais
            cep
        }
    }
`;

const Cidadoes = () => {
    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Históricos de Vacinação</h1>
            </Layout>
        </div>
    );
}

export default Cidadoes;