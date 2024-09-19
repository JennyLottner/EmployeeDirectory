import { combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { employeeReducer } from './reducers/employee.reducer'

// Combines all reducers into a single root reducer
const rootReducer = combineReducers({
    employeeModule: employeeReducer,
})

// Creates the Redux store with optional Redux DevTools support, and exposes the store globally for debugging
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
export const store = createStore(rootReducer, composeEnhancers())

window.gStore = store