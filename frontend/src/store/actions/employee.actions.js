import { employeeService } from '../../services/employee.service'
import { ADD_EMPLOYEE, REMOVE_EMPLOYEE, SET_FILTER, SET_EMPLOYEES, UPDATE_EMPLOYEE } from "../reducers/employee.reducer"
import { store } from "../store"

export async function loadEmployees() {
    try {
        const { filterTxt } = store.getState().employeeModule
        const employees = await employeeService.query(filterTxt)
        store.dispatch({ type: SET_EMPLOYEES, employees })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function loadEmployeeById(employeeId) {
    try {
        const employee = await employeeService.getById(employeeId)
        return employee
    } catch (err) {
        console.log(err)
        throw err
    }
}

export function setEmployeeFilter(filterTxt = '') {
    store.dispatch({ type: SET_FILTER, filterTxt })
    return Promise.resolve(filterTxt)
}

export async function removeEmployee(employeeId) {
    try {
        await employeeService.remove(employeeId)
        store.dispatch({ type: REMOVE_EMPLOYEE, employeeId })
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function saveEmployee(employee) {
    try {
        const employeeToSave = await employeeService.save(employee)
        const type = employee._id ? UPDATE_EMPLOYEE : ADD_EMPLOYEE
        store.dispatch({ type, employee: employeeToSave })
        return employeeToSave
    } catch (err) {
        console.log(err)
        throw err
    }
}