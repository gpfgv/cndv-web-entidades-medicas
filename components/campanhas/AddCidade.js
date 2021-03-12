import React, {useEffect, useState, useContext } from 'react';
import Select from 'react-select';
import { gql, useQuery } from '@apollo/client';
import CampanhaContext from "../../context/campanhas/CampanhaContext";

const OBTENER_CIDADES = gql`
    query obtenerCidades{
        obtenerCidades{ 
            uf,
            cidade
        }
    }
`;

const AddCidade = () => {

    const [ cidade, setCidade ] = useState([]);

    // Context of cidade
    const cidadeContext = useContext(CampanhaContext);
    const { addCidade } = cidadeContext;
    const { data, loading, error } = useQuery(OBTENER_CIDADES);

    useEffect(() => {
      // Pass function to CampanhaState on every change
      addCidade(cidade)
    }, [cidade]);

    if ( loading ) return null;

    const { obtenerCidades } = data;

    const selectCidade = cidades => {
        setCidade(cidades);
    }

    return (
        <Select
            options={ obtenerCidades }
            isMulti={false}
            onChange={(option) => selectCidade(option)}
            getOptionValue={ options => options.cidade }
            getOptionLabel={ options => options.cidade }
            placeholder="Selecione a cidade"
            noOptionsMessage={() => "Nenhum resultado encontrado"}
        />
    );
}

export default AddCidade;