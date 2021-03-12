import {
    SELECIONAR_CIDADE
} from '../../types/index';

export default (state, action) => {
    switch(action.type){

        case SELECIONAR_CIDADE:
            return {
                ...state,
                cidade: action.payload
            }

        default:
            return state;
    }
}