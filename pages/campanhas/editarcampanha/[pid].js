import React from 'react';
import { useRouter } from 'next/router';
import Layout from "../../../components/Layout";
import { useQuery, gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from "yup";
import Swal from "sweetalert2";
import {getSession} from "next-auth/client";

// Query used on update cache on new data added
const OBTENER_CAMPANHA = gql`
    query obtenerCampanha($id: ID) {
      obtenerCampanha(id: $id){
        id
        nome
        idade_inicio
        idade_final
        cidade
        uf
        descricao
      }
    }
`;

const ATUALIZAR_CAMPANHA = gql`
    mutation atualizarCampanha($id: ID!, $input: CampanhaInput){
        atualizarCampanha(id: $id, input: $input){
            id
            nome
            idade_inicio
            idade_final
            cidade
            uf
            descricao
        }
    }
`;

const EditarCampanha = () => {

    const router = useRouter();
    const { query: { id } } = router;

    const { data, loading, error } = useQuery(OBTENER_CAMPANHA, {
        variables: {
            id
        }
    });

    const [ atualizarCampanha ] = useMutation(ATUALIZAR_CAMPANHA, {
        refetchQueries: [{
            query: gql`
                query obtenerCampanha($id: ID) {
                  obtenerCampanha(id: $id){
                    id
                    nome
                    idade_inicio
                    idade_final
                    cidade
                    uf
                    descricao
                  }
                }
        `, variables: { id }
        }]
    });

    const schemaValidation = Yup.object({
        nome: Yup.string()
            .required('O nome é obrigatório'),
        idade_inicio: Yup.string()
            .required('Defina a idade inicial do límite de idade'),
        idade_final: Yup.string()
            .required('Defina a idade final do límite de idade'),
        cidade: Yup.string()
            .required('Defina o munícipio da campanha'),
        uf: Yup.string()
            .required('Defina o estado (UF)'),
        descricao: Yup.string()
    });

    if(loading) return "Carregando campanha...";

    const { obtenerCampanha } = data;

    const atualizarInfoCampanha = async values => {
        const { nome, idade_inicio, idade_final, cidade, uf, descricao } = values;

        try {
            await atualizarCampanha({
                variables: {
                    id,
                    input: {
                        nome,
                        idade_inicio,
                        idade_final,
                        cidade,
                        uf,
                        descricao
                    }
                }
            })

            Swal.fire(
                'Atualizado',
                'A campanha foi atualizada corretamente',
                'success'
            )

            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Editar Campanha</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <Formik
                        validationSchema={ schemaValidation }
                        enableReinitialize
                        initialValues={ obtenerCampanha }
                        onSubmit={(inputValues) => {
                            atualizarInfoCampanha(inputValues);
                        }}
                    >
                        {props => {

                          return (
                            <form
                                className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                                onSubmit={props.handleSubmit}
                            >
                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                                        Nome
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 uppercase text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id="nome"
                                           type="text"
                                           placeholder="Nome"
                                           onChange={props.handleChange}
                                           onBlur={props.handleBlur}
                                           value={props.values.nome}
                                    />
                                </div>

                                { props.touched.nome && props.errors.nome ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.nome}</p>
                                    </div>
                                ) : null }

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold" htmlFor="idade_inicio">
                                        Límite de idade:
                                    </label>
                                    <input className="shadow appearance-none border rounded w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id="idade_inicio"
                                           type="number"
                                           min="1"
                                           placeholder="Idade Início"
                                           onChange={props.handleChange}
                                           onBlur={props.handleBlur}
                                           value={props.values.idade_inicio}
                                    />

                                    <input className="shadow appearance-none border rounded ml-3 w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id="idade_final"
                                           type="number"
                                           min="1"
                                           placeholder="Idade Final"
                                           onChange={props.handleChange}
                                           onBlur={props.handleBlur}
                                           value={props.values.idade_final}
                                    />
                                </div>

                                { props.touched.idade_inicio && props.errors.idade_inicio ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.idade_inicio}</p>
                                    </div>
                                ) : null }

                                { props.touched.idade_final && props.errors.idade_final ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.idade_final}</p>
                                    </div>
                                ) : null }

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cidade">
                                        Cidade
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id="cidade"
                                           type="text"
                                           placeholder="Município"
                                           onChange={props.handleChange}
                                           onBlur={props.handleBlur}
                                           value={props.values.cidade}
                                    />
                                </div>

                                { props.touched.cidade && props.errors.cidade ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.cidade}</p>
                                    </div>
                                ) : null }

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uf">
                                        UF
                                    </label>
                                    <select
                                        name="uf"
                                        id="uf"
                                        value={props.uf}
                                        onChange={props.handleChange}
                                        onBlur={props.handleBlur}
                                        className="shadow border rounded bg-white w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    >
                                        <option value="" label="Selecione o UF" />
                                        <option value="AC" label="ACRE" />
                                        <option value="AL" label="ALAGOAS" />
                                        <option value="AM" label="AMAZONAS" />
                                        <option value="AP" label="AMAPÁ" />
                                        <option value="BA" label="BAHIA" />
                                        <option value="CE" label="CEARÁ" />
                                        <option value="DF" label="DISTRITO FEDERAL" />
                                        <option value="ES" label="ESPÍRITO SANTO" />
                                        <option value="GO" label="GOIÁS" />
                                        <option value="MA" label="MARANHÃO" />
                                        <option value="MG" label="MINAS GERAIS" />
                                        <option value="MS" label="MATO GROSSO DO SUL" />
                                        <option value="MT" label="MATO GROSSO" />
                                        <option value="PA" label="PARÁ" />
                                        <option value="PB" label="PARAÍBA" />
                                        <option value="PE" label="PERNAMBUCO" />
                                        <option value="PI" label="PIAUÍ" />
                                        <option value="PR" label="PARANÁ" />
                                        <option value="RJ" label="RIO DE JANEIRO" />
                                        <option value="RN" label="RIO GRANDE DO NORTE" />
                                        <option value="RO" label="RONDÔNIA" />
                                        <option value="RR" label="RORAIMA" />
                                        <option value="RS" label="RIO GRANDE DO SUL" />
                                        <option value="SC" label="SANTA CATARINA" />
                                        <option value="SE" label="SERGIPE" />
                                        <option value="SP" label="SÃO PAULO" />
                                        <option value="TO" label="TOCANTINS" />
                                    </select>
                                </div>

                                { props.touched.uf && props.errors.uf ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.uf}</p>
                                    </div>
                                ) : null }

                                <div className="mb-4">
                                    <label htmlFor="descricao">Descrição</label>
                                    <textarea
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        name="descricao" rows="6" value={props.values.descricao} onChange={props.handleChange} placeholder="Coloque aqui sua descrição">{props.values.descricao}</textarea>
                                </div>

                                <input
                                    type="submit"
                                    className="bg-blue-900 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                                    value="Editar"
                                />
                            </form>
                          )
                        }}
                    </Formik>
                </div>
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const session = await getSession({ req: context.req });

    if(!session) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
}

export default EditarCampanha;