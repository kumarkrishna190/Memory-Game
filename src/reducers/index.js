import { combineReducers } from "redux"

import counterReducer from "./CounterReducer"
import authReducer from "./AuthReducer"

const rootReducer = combineReducers({
    counterReducer: counterReducer,
    authReducer: authReducer
})

export default rootReducer