import { actionTypes } from "../constants/ActionTypes"

const initialState = {
    count: 0
}

const counterReducer = (state = initialState, action) => {
    switch(action.tye) {
        case actionTypes.ADD:
            let count = {...state.count}
            count = count + 1
            return {
                ...state,
                count
            }
        default:
            return state
    }
}

export default counterReducer