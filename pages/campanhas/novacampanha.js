import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import AddCidade from "../../components/campanhas/AddCidade";
import CampanhaContext from "../../context/campanhas/CampanhaContext";
import {getSession} from "next-auth/client";

const NOVA_CAMPANHA = gql`
mutation novaCampanha($input: CampanhaInput) {
  novaCampanha(input: $input) {    
    nome
    idade_inicio
    idade_final
    cidade
    uf
    descricao
  }
}
`;

// Query used on update cache on new data added
const OBTENER_CAMPANHAS = gql`
    query obtenerCampanhas{
        obtenerCampanhas{
            id
            nome
            idade_inicio
            idade_final
            municipio
            uf
            descricao
        }
    }
`;

const NovaCampanha = () => {

    // Use context and extract functions and values
    const campanhaContext = useContext(CampanhaContext);
    const { cidade } = campanhaContext;

    const router = useRouter();

    const [ novaCampanha ] = useMutation(NOVA_CAMPANHA, {
        refetchQueries: [{
            query: gql`
                query obtenerCampanhas{
                    obtenerCampanhas{
                        id
                        nome
                        idade_inicio
                        idade_final
                        cidade
                        uf
                        descricao
                    }
                }
            `,
        }],
    });

    const validarCampanha = () => {
        //console.log('vacina sim');
        return cidade.length === 0 ? "opacity-50 cursor-not-allowed": "";
    }

    const createNovaCampanha = () => {
        console.log(cidade.cidade);

        // TODO call novaCampanha Mutation
    }

    const formik = useFormik({
        initialValues: {
            nome: '',
            idade_inicio: '',
            idade_final: '',
            uf: '',
            descricao: '',
        },
        validationSchema: Yup.object({
            nome: Yup.string()
                .max(30, "Deve ter no máximo 30 caracteres o título")
                .required('O nome é obrigatório'),
            idade_inicio: Yup.string()
                .required('Defina a idade inicial do límite de idade'),
            idade_final: Yup.string()
                .required('Defina a idade final do límite de idade'),
            uf: Yup.string()
                .required('Defina o estado (UF)')
        }),
        onSubmit: async inputData => {

            const { nome, idade_inicio, idade_final, uf, descricao } = inputData;

            try {
                const { data } = await novaCampanha({
                    variables: {
                        input: {
                            nome,
                            idade_inicio,
                            idade_final,
                            cidade: cidade.cidade, // Data comes from useReducer in CampanhaState
                            uf,
                            descricao
                        }
                    }
                });
                router.push('/');
            } catch (error) {
                console.log(error);
            }
        }
    })


    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">Nova Campanha</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">

                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                                Nome
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                   id="nome"
                                   type="text"
                                   placeholder="Nome"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.nome}
                            />
                        </div>

                        { formik.touched.nome && formik.errors.nome ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.nome}</p>
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
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.idade_inicio}
                            />

                            <input className="shadow appearance-none border rounded ml-3 w-1/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                   id="idade_final"
                                   type="number"
                                   min="1"
                                   placeholder="Idade Final"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.idade_final}
                            />
                        </div>

                        { formik.touched.idade_inicio && formik.errors.idade_inicio ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.idade_inicio}</p>
                            </div>
                        ) : null }

                        { formik.touched.idade_final && formik.errors.idade_final ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.idade_final}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="municipio">
                                Município
                            </label>
                                <AddCidade />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uf">
                                UF
                            </label>
                            <select
                                name="uf"
                                value={formik.values.uf}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
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

                        { formik.touched.uf && formik.errors.uf ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.uf}</p>
                            </div>
                        ) : null }

                        <div className="mb-4">
                                <label htmlFor="descricao">Descrição</label>
                                <textarea
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name="descricao" value={formik.values.descricao} onChange={formik.handleChange} rows="6" placeholder="Coloque aqui sua descrição" />

                        </div>

                        <input
                            type="submit"
                            className={`bg-blue-900 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900 ${ validarCampanha()}`}
                            value="Adicionar"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    )
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

export default NovaCampanha;