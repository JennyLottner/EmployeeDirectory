import { httpService } from './http.service.js'

const BASE_URL = 'employee/'  // Base URL for employee-related API endpoints

export const employeeService = {
    query,
    getById,
    save,
    remove,
}

// Fetches a list of employees from the server, optionally filtered by the provided text
async function query(filterTxt = '') {
    return httpService.get(BASE_URL, {txt: filterTxt})
}

// Retrieves a single employee by ID from the server
async function getById(employeeId) {
    return httpService.get(BASE_URL + employeeId)
}

// Saves an employee to the server
// If the employee has an ID, it updates the existing record; otherwise, it creates a new record
async function save(employee) {
    if (employee._id) return httpService.put(BASE_URL + employee._id, employee)
    else return httpService.post(BASE_URL, employee)
}

// Removes an employee by ID from the server
async function remove(employeeId) {
    return httpService.delete(BASE_URL + employeeId)
}
