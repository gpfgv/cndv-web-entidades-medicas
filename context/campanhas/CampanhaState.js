import React, { useReducer } from 'react';
import CampanhaContext from "./CampanhaContext";
import CampanhaReducer from "./CampanhaReducer";

import {
    SELECIONAR_CIDADE
} from '../../types';

const CampanhaState = ({children}) => {

    const initialState = {
        cidade: {}
    }

    const [ state, dispatch ] = useReducer(CampanhaReducer, initialState);

    // Modify cidade when selected in SelectComboBox
    const addCidade = cidade => {

        dispatch({
            type: SELECIONAR_CIDADE,
            payload: cidade
        });
    }

    return (
        <CampanhaContext.Provider value={{
           cidade: state.cidade,
           addCidade
        }}>{children}
        </CampanhaContext.Provider>
    )
}

export default CampanhaState;
