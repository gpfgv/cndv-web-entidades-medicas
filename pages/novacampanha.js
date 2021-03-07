import React from 'react';
import Layout from '../components/Layout';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';

const NOVA_CAMPANHA = gql`
mutation novaCampanha($input: CampanhaInput) {
  novaCampanha(input: $input) {
    id
    nome
    idade_inicio
    idade_final
    municipio
    uf
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
        }
    }
`;

const NovaCampanha = () => {

    const router = useRouter();

    const [ novaCampanha ] = useMutation(NOVA_CAMPANHA);

    // Using Apollo Cache mechanism insted of refreshing
    // However as our insert query resolver and MySQL does not r
    /* const [ novaCampanha ] = useMutation(NOVA_CAMPANHA, {
        update(cache, { data: { novaCampanha }}) {
            // Obtain object from cache that we want to update
            const { obtenerCampanhas } = cache.readQuery({ query: OBTENER_CAMPANHAS });

            // Re write cache, never write/modified directly as it inmutable
            cache.writeQuery({
                query: OBTENER_CAMPANHAS,
                data: {
                    obtenerCampanhas: [...obtenerCampanhas, novaCampanha]
                }
            })
        }
    });
    */
     const formik = useFormik({
         initialValues: {
             nome: '',
             idade_inicio: '',
             idade_final: '',
             municio: '',
             uf: ''
         },
         validationSchema: Yup.object({
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
         }),
         onSubmit: async inputData => {

             const { nome, idade_inicio, idade_final, municipio, uf } = inputData;

             try {
                const { data } = await novaCampanha({
                    variables: {
                        input: {
                            nome,
                            idade_inicio,
                            idade_final,
                            municipio,
                            uf
                        }
                    }
                });
                    router.push('/campanhas');
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
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                   id="municipio"
                                   type="text"
                                   placeholder="Município"
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.municipio}
                            />
                        </div>

                        { formik.touched.municipio && formik.errors.municipio ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.municipio}</p>
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
                                   onChange={formik.handleChange}
                                   onBlur={formik.handleBlur}
                                   value={formik.values.uf}
                            />
                        </div>

                        { formik.touched.uf && formik.errors.uf ? (
                            <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                <p className="font-bold">Error</p>
                                <p>{formik.errors.uf}</p>
                            </div>
                        ) : null }

                        {/*<div className="mb-4">
                            <label className="block">
                                <span className="text-gray-700">Select</span>
                                <select className="form-select block w-full mt-1">
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </select>
                            </label>
                        </div>*/}
                        <input
                            type="submit"
                            className="bg-blue-900 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                            value="Adicionar"
                        />

                    </form>
                </div>
            </div>
         </Layout>
     )
}
export default NovaCampanha;