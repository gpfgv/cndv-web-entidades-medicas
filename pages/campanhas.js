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

    const { data, loading, error } = useQuery(OBTENER_CAMPANHAS);
    console.log(data)

    if (loading) return 'Carregando...';

    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Campanhas</h1>

                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                    <tr className="text-white">
                        <th className="w-1/6 py-2">Nome</th>
                        <th className="w-1/6 py-2">Idade início</th>
                        <th className="w-1/6 py-2">Idade final</th>
                        <th className="w-1/6 py-2">Muninípio</th>
                        <th className="w-1/6 py-2">UF</th>
                        <th className="w-1/6 py-2">Editar</th>
                    </tr>
                    </thead>
                    <tbody className="bg-white">
                    {data.obtenerCampanhas.map(campanha => (
                        <tr key={campanha.id}>
                            <td className="border px-4 py-2">{campanha.nome}</td>
                            <td className="border px-4 py-2">{campanha.idade_inicio}</td>
                            <td className="border px-4 py-2">{campanha.idade_final}</td>
                            <td className="border px-4 py-2">{campanha.municipio}</td>
                            <td className="border px-4 py-2">{campanha.uf}</td>
                            <td className="border px-4 py-2">Editar</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Layout>
        </div>
    );
}

export default Campanhas;