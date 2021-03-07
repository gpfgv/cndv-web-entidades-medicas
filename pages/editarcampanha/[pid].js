import React from 'react';
import { useRouter } from 'next/router';
import Layout from "../../components/Layout";
import { useQuery, gql, useMutation } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from "yup";
import Swal from "sweetalert2";

// Query used on update cache on new data added
const OBTENER_CAMPANHA = gql`
    query obtenerCampanha($id: ID) {
      obtenerCampanha(id: $id){
        id
        nome
        idade_inicio
        idade_final
        municipio
        uf
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
            municipio
            uf
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

    const [ atualizarCampanha ] = useMutation(ATUALIZAR_CAMPANHA);

    const schemaValidation = Yup.object({
        nome: Yup.string()
            .required('O nome é obrigatório'),
        idade_inicio: Yup.string()
            .required('Defina a idade inicial do límite de idade'),
        idade_final: Yup.string()
            .required('Defina a idade final do límite de idade'),
        municipio: Yup.string()
            .required('Defina o munícipio da campanha'),
        uf: Yup.string()
            .required('Defina o estado (UF)')
    });

    if(loading) return "Carregando campanha...";

    const { obtenerCampanha } = data;

    const atualizarInfoCampanha = async values => {
        const { nome, idade_inicial, idade_final, municipio, uf } = values;

        try {
            await atualizarCampanha({
                variables: {
                    id,
                    input: {
                        nome,
                        idade_inicial,
                        idade_final,
                        municipio,
                        uf
                    }
                }
            })

            Swal.fire(
                'Atualizado',
                'A campanha foi atualizada corretamente',
                'success'
            )

            router.push('/dashboard');
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
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="municipio">
                                        Município
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id="municipio"
                                           type="text"
                                           placeholder="Município"
                                           onChange={props.handleChange}
                                           onBlur={props.handleBlur}
                                           value={props.values.municipio}
                                    />
                                </div>

                                { props.touched.municipio && props.errors.municipio ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.municipio}</p>
                                    </div>
                                ) : null }

                                <div className="mb-4">
                                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uf">
                                        UF
                                    </label>
                                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                           id="uf"
                                           type="text"
                                           placeholder="UF"
                                           onChange={props.handleChange}
                                           onBlur={props.handleBlur}
                                           value={props.values.uf}
                                    />
                                </div>

                                { props.touched.uf && props.errors.uf ? (
                                    <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                        <p className="font-bold">Error</p>
                                        <p>{props.errors.uf}</p>
                                    </div>
                                ) : null }

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

export default EditarCampanha;