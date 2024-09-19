import { storageService } from './storage.local.service.js'

const STORAGE_KEY = 'employeeDB'  // Key used to identify employee data in local storage

export const employeeService = {
    query,
    getById,
    save,
    remove,
}

// Retrieves a list of employees, optionally filtered by text
// If no employees are found in storage, loads demo data and saves it
async function query(filterTxt = '') {
    try {
        let employees = await storageService.query(STORAGE_KEY)
        if (!employees) {
            employees = await _loadDemoEmployees()
            storageService.saveToStorage(STORAGE_KEY, employees)
        }
        if (filterTxt && filterTxt.length >=2) {
            const regExp = new RegExp(filterTxt, 'i')
            employees = employees.filter(employee =>
                regExp.test(employee.name) || regExp.test(employee.workTitle)
            )
        }
        return employees
    } catch (err) { console.log(err) }
}

// Retrieves a single employee by ID from local storage
async function getById(employeeId) {
    return await storageService.get(STORAGE_KEY, employeeId)
}

// Saves an employee to local storage 
// If the employee has an ID, it updates the existing record; otherwise, it creates a new record
async function save(employee) {
    if (employee._id) return await storageService.put(STORAGE_KEY, employee)
    else return await storageService.post(STORAGE_KEY, employee)
}

// Removes an employee by ID from local storage
async function remove(employeeId) {
    return await storageService.remove(STORAGE_KEY, employeeId)
}

// Loads demo employee data from a local JSON file if no employees are found in storage
async function _loadDemoEmployees() {
    try {
        const response = await fetch('./src/data/demoEmployees.json')
        const demoEmployees = await response.json()
        return demoEmployees
    } catch (err) { console.log(err) }
}