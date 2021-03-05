import React from 'react';
import Layout from "../components/Layout";
import { gql, useQuery } from '@apollo/client';

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
    return (
        <div>
            <Layout>
                <h1 className="text-2xl text-gray-800 font-light">Históricos de Vacinação</h1>
            </Layout>
        </div>
    );
}

export default Historico_Vacinacao;