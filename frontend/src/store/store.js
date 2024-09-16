import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { employeeReducer } from './reducers/employee.reducer'

const rootReducer = combineReducers({
    employeeModule: employeeReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store