export const SET_EMPLOYEES = 'SET_EMPLOYEES'
export const SET_EMPLOYEE = 'SET_EMPLOYEE'
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE'
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE'
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE'

export const SET_FILTER = 'SET_FILTER'

const initialState = {
    employees: [],
    filterTxt: '',
}

export function employeeReducer(state = initialState, action = {}) {
    let employees
    switch (action.type) {
        //Employees
        case SET_EMPLOYEES:
            return { ...state, employees: action.employees }

        case REMOVE_EMPLOYEE:
            employees = state.employees.filter(employee => employee._id !== action.employeeId)
            return { ...state, employees }

        case ADD_EMPLOYEE:
            employees = [...state.employees, action.employee]
            return { ...state, employees }

        case UPDATE_EMPLOYEE:
            employees = state.employees.map(employee => employee._id === action.employee._id ? action.employee : employee)
            return { ...state, employees: employees }

        //Filter
        case SET_FILTER:
            return { ...state, filterTxt: action.filterTxt }

        default:
            return state
    }
}