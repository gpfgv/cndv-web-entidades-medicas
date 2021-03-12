import React from 'react';
import Swal from 'sweetalert2';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';

const ELIMINAR_CAMPANHA = gql`
    mutation eliminarCampanha($id: ID!) {
      eliminarCampanha(id: $id)
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
            cidade
            uf
        }
    }
`;

const Campanha = ({ campanha }) => {

    const [ eliminarCampanha ] = useMutation( ELIMINAR_CAMPANHA, {
        update(cache) {
            // Obtain a copy of object from cache
            const { obtenerCampanhas } = cache.readQuery({ query: OBTENER_CAMPANHAS});

            // Rewrite cache
            cache.writeQuery({
               query: OBTENER_CAMPANHAS,
               data: {
                   obtenerCampanhas: obtenerCampanhas.filter(campanhaAtual => campanhaAtual.id !== campanha.id)
               }
            })
        }
    } );
    const { nome, idade_inicio, idade_final, cidade, uf } = campanha;

    const confirmarEliminarCampanha = id => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "A remoção é definitiva",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, remover campanha!'
        }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    // Eliminate from ID
                    const { data } = await eliminarCampanha({
                        variables: {
                            id
                        }
                    });

                    Swal.fire(
                        'Campanha eliminada!',
                        data.eliminarCampanha,
                        'success'
                    )
                } catch (error) {
                    console.log(error);
                }
            }
        })
    }

    const editarCampanha = id => {
        Router.push({
            pathname: "/campanhas/editarcampanha/[id]",
            query: { id }
        })
    }

    return (
        <tr>
            <td className="border px-4 py-2">{campanha.nome}</td>
            <td className="border px-4 py-2">{campanha.idade_inicio}</td>
            <td className="border px-4 py-2">{campanha.idade_final}</td>
            <td className="border px-4 py-2">{campanha.cidade}</td>
            <td className="border px-4 py-2">{campanha.uf}</td>
            <td className="border px-4 py-2">
                <button
                    type="button"
                    className="py-2"
                    onClick={() => confirmarEliminarCampanha(campanha.id) }
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
                <button
                    type="button"
                    className="py-2"
                    onClick={() => editarCampanha(campanha.id) }
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                </button>
            </td>
        </tr>
    );
}

export default Campanha;