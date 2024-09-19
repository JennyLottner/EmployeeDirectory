// Action types for managing employee data
export const SET_EMPLOYEES = 'SET_EMPLOYEES'
export const SET_EMPLOYEE = 'SET_EMPLOYEE'
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE'
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE'
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE'

// Action type for managing the employee filter
export const SET_FILTER = 'SET_FILTER'

// Initial state of the employee module
const initialState = {
    employees: [],
    filterTxt: '',
}

// Reducer function to handle employee-related actions
export function employeeReducer(state = initialState, action = {}) {
    let employees
    switch (action.type) {
        case SET_EMPLOYEES: // Sets the employee list with the payload data
            return { ...state, employees: action.employees }

        case REMOVE_EMPLOYEE:  // Removes an employee by filtering them out based on the given ID
            employees = state.employees.filter(employee => employee._id !== action.employeeId)
            return { ...state, employees }

        case ADD_EMPLOYEE: // Adds a new employee to the current list
            employees = [...state.employees, action.employee]
            return { ...state, employees }

        case UPDATE_EMPLOYEE:  // Updates an existing employee based on their ID
            employees = state.employees.map(employee => employee._id === action.employee._id ? action.employee : employee)
            return { ...state, employees: employees }

        //Filter
        case SET_FILTER: // Sets the filter text used to filter the employee list
            return { ...state, filterTxt: action.filterTxt }

        default:  // Default case: return the current state if no actions match
            return state
    }
}