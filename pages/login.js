import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { gql, useMutation } from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput){
      autenticarUsuario(input: $input) {
        token
      }
    }
`;

const Login = () => {

    // State for messages
    const [ message, saveMessage] = useState(null);

    // Apollo handles state by itself, not necessary to handle ourselves
    const [ autenticatUsuario ] = useMutation(AUTENTICAR_USUARIO);

    const router = useRouter();

    const formik = useFormik({
        initialValues: {
           cpf: '',
           senha: ''
        },
        validationSchema: Yup.object({
            cpf: Yup.string()
                .required('O cpf é obrigatório')
                .min(14, 'O cpf tem que respeitar o seguinte formato: 333.333.333-33')
                .max(14, 'O cpf tem que respeitar o seguinte formato: 333.333.333-33'),
            senha: Yup.string()
                .required('A senha não pode estar em branco')
        }),
        onSubmit: async inputData => {

            const { cpf, senha } = inputData;

            try {
                const { data } = await autenticatUsuario({
                    variables: {
                        input: {
                            cpf,
                            senha
                        }
                    }
                });

                saveMessage('Autenticando...');
                const { token } = data.autenticarUsuario;
                localStorage.setItem('token', token);

                setTimeout(() => {
                    saveMessage(null);
                    router.push('/campanhas');
                }, 2000);

            } catch (error) {
                saveMessage(error.message.replace('GraphQL error: ', ''));

                setTimeout(() => {
                    saveMessage(null);
                }, 3000);
            }
        }
    })

    const showMessage = () => {
        return(
            <div className="bg-white py-2 px-3 w-full my-3 max-w-sm text-center mx-auto">
                <p>{message}</p>
            </div>
        )
    }

    return (
        <>
            <Layout>
                { message && showMessage() }
                <h1 className="text-center text-2xl text-white font-light">e-CNDV</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                       <form
                           className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                           onSubmit={formik.handleSubmit}
                       >
                           <div className="mb-4">
                               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cpf">
                                    CPF
                               </label>
                               <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="cpf"
                                      type="text"
                                      placeholder="CPF"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cpf}
                               />
                           </div>

                           { formik.touched.cpf && formik.errors.cpf ? (
                               <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                   <p className="font-bold">Error</p>
                                   <p>{formik.errors.cpf}</p>
                               </div>
                           ) : null }

                           <div className="mb-4">
                               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="senha">
                                   Senha
                               </label>
                               <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="senha"
                                      type="password"
                                      placeholder="Senha"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.senha}
                               />
                           </div>

                           { formik.touched.senha && formik.errors.senha ? (
                               <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                   <p className="font-bold">Error</p>
                                   <p>{formik.errors.senha}</p>
                               </div>
                           ) : null }

                           <input
                               type="submit"
                               className="bg-blue-900 w-full mt-5 p-2 text-white uppercase hover:bg-gray-900"
                               value="Entrar"
                           />
                       </form>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default Login;