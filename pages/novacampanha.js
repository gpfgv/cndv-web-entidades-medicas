import React from 'react';
import Layout from '../components/Layout';

const NovaCampanha = () => {
 return (
     <Layout>
        <h1 className="text-2xl text-gray-800 font-light">Nova Campanha</h1>

        <div className="flex justify-center mt-5">
            <div className="w-full max-w-lg">
                <form
                    className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nome">
                            Nome
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="nome"
                               type="text"
                               placeholder="Nome"
                               /*onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               value={formik.values.cpf}*/
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idade_inicio">
                            Idade Início
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="idade_inicio"
                               type="text"
                               placeholder="Idade Início"
                            /*onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cpf}*/
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idade_final">
                            Idade Final
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="idade_final"
                               type="text"
                               placeholder="Idade Final"
                            /*onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cpf}*/
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="municipio">
                            Município
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="municipio"
                               type="text"
                               placeholder="Município"
                            /*onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cpf}*/
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="uf">
                            UF
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                               id="uf"
                               type="text"
                               placeholder="UF"
                            /*onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.cpf}*/
                        />
                    </div>
  {/*                  <div className="mb-4">
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