import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from "../components/Layout";
import { useFormik } from 'formik';
import { signIn } from 'next-auth/client';
import * as Yup from 'yup';

const Login = () => {
    // State for messages
    const [ message, saveMessage ] = useState(null);
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
           cnpj: '',
           senha: ''
        },
        validationSchema: Yup.object({
            cnpj: Yup.string().required('O cnpj é obrigatório')
                .min(14, 'O cnpj precisa ter 14 dígitos sem pontos ou símbolos'),
            senha: Yup.string()
                .required('A senha não pode estar em branco')
        }),
        onSubmit: async inputData => {

            const { cnpj, senha } = inputData;

            /// TODO Temporary until we have authentication with CNPJ
            if(cnpj == '07346574000165' && senha == 'cndv123456789'){
                const result = await signIn('credentials',{
                   redirect: false,
                   cnpj: cnpj,
                   password: senha
                });
                console.log(result);
                if (!result.error) {
                    setTimeout(() => {
                        saveMessage(null);
                        //router.replace('/campanhas/dashboard')
                        router.replace('/');
                    }, 2000);
                }
            }else{
                setTimeout(() => {
                    saveMessage("Por favor verifique os dados de acesso!");
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
                <h1 className="text-center text-2xl text-white font-light">CNDV</h1>

                <div className="flex justify-center mt-5">
                    <div className="w-full max-w-sm">
                       <form
                           className="bg-white rounded shadow-md px-8 pt-6 pb-8 mb-4"
                           onSubmit={formik.handleSubmit}
                       >
                           <div className="mb-4">
                               <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cnpj">
                                    CNPJ
                               </label>
                               <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                      id="cnpj"
                                      type="text"
                                      placeholder="CNPJ"
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values.cnpj}
                               />
                           </div>

                           { formik.touched.cnpj && formik.errors.cnpj ? (
                               <div className="my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
                                   <p className="font-bold">Error</p>
                                   <p>{formik.errors.cnpj}</p>
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