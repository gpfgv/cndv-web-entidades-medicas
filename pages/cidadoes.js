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

    const { data, loading, error } = useQuery(OBTENER_CIDADOES);

    if (loading) return 'Carregando...';

    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Cidadões</h1>

                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                    <tr className="text-white">
                        <th className="w-1/7 py-2">Nome</th>
                        <th className="w-1/7 py-2">Email</th>
                        <th className="w-1/7 py-2">CPF</th>
                        <th className="w-1/7 py-2">Data Nascimento</th>
                        <th className="w-1/7 py-2">Tipo Sanguineo</th>
                        <th className="w-1/7 py-2">Cidade</th>
                        <th className="w-1/7 py-2">Editar</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {data.obtenerCidadoes.map(cidadao => (
                        <tr key={cidadao.cpf}>
                            <td className="border px-4 py-2">{cidadao.nome}</td>
                            <td className="border px-4 py-2">{cidadao.email}</td>
                            <td className="border px-4 py-2">{cidadao.cpf}</td>
                            <td className="border px-4 py-2">{cidadao.dt_nascimento}</td>
                            <td className="border px-4 py-2">{cidadao.id_tipo_sanguineo}</td>
                            <td className="border px-4 py-2">{cidadao.cidade}</td>
                            <td className="border px-4 py-2">Editar</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Layout>
        </div>
    );
}

export default Cidadoes;