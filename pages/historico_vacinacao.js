import React from 'react';
import Layout from "../components/Layout";
import { gql, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

const OBTENER_HISTORICO_VACINACAO = gql`
   query obtenerHistoricoVacinacao($cpf: String!){
      obtenerHistoricoVacinacao(cpf: $cpf){
           id
           cpf
           tipo_vacina_descricao
           dt_aplicacao        
           tipo_dose_descricao
           lote
           codigo
           nome_aplicador
           reg_profissional
           unidade_saude
      }
    }
`;

const Historico_Vacinacao = () => {

    const router = useRouter();

    const { data, loading, error } = useQuery(OBTENER_HISTORICO_VACINACAO);
    if (loading) return 'Carregando...';

   /* if(!data) {
        return router.push('/login');
    }*/

    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Históricos de Vacinação</h1>

                <table className="table-auto shadow-md mt-10 w-full w-lg">
                    <thead className="bg-gray-800">
                        <tr className="text-white">
                            <th className="w-1/8 py-2">CPF</th>
                            <th className="w-1/8 py-2">Tipo Vacina</th>
                            <th className="w-1/8 py-2">Data Aplicação</th>
                            <th className="w-1/8 py-2">Tipo Dose</th>
                            <th className="w-1/8 py-2">Lote</th>
                            <th className="w-1/8 py-2">Código</th>
                            <th className="w-1/8 py-2">Unidade Saúde</th>
                            <th className="w-1/8 py-2">Editar</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {data.obtenerHistoricoVacinacao.map(historico => (
                            <tr key={historico.cpf}>
                                <td className="border px-4 py-2">{historico.cpf}</td>
                                <td className="border px-4 py-2">{historico.tipo_vacina_descricao}</td>
                                <td className="border px-4 py-2">{historico.dt_aplicacao}</td>
                                <td className="border px-4 py-2">{historico.tipo_dose_descricao}</td>
                                <td className="border px-4 py-2">{historico.lote}</td>
                                <td className="border px-4 py-2">{historico.codigo}</td>
                                <td className="border px-4 py-2">{historico.unidade_saude}</td>
                                <td className="border px-4 py-2">Editar</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Layout>
        </div>
    );
}

export default Historico_Vacinacao;