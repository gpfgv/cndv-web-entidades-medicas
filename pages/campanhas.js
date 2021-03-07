import React from 'react';
import Layout from "../components/Layout";
import Campanha from "../components/Campanha";
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

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

    const router = useRouter();
    const { data, loading, error } = useQuery(OBTENER_CAMPANHAS);

    if (loading) return 'Carregando...';

    /*if(!data) {
        return router.push('/login');
    }*/

    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Campanhas</h1>
                <Link href="/novacampanha">
                    <a className="bg-blue-800 py-2 px-5 mt-5 inline-block text-white rounded text-sm hover:bg-gray-800 mb-3 uppercase font-bold">Nova Campanha</a>
                </Link>

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
                        <Campanha
                            key={campanha.id}
                            campanha={campanha}
                        />
                    ))}
                    </tbody>
                </table>
            </Layout>
        </div>
    );
}

export default Campanhas;