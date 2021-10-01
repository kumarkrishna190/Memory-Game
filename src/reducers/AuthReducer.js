import { actionTypes } from "../constants/ActionTypes"

import { map } from "lodash"

const initialState = {
    user: {}
}

const authReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.UPDATE_USER:
            let user = {...state.user}
            map(action.payload, (item, idx) => {

            })
            return {
                ...state,
                user
            }
        default:
            return state
    }
}

export default authReducer