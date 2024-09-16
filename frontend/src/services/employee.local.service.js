import { storageService } from './storage.local.service.js'

const STORAGE_KEY = 'employeeDB'

export const employeeService = {
    query,
}

async function query() {
    try {
        let employees = await storageService.query(STORAGE_KEY)
        if (!employees) {
            employees = await _loadDemoEmployees()
            storageService.saveToStorage(STORAGE_KEY, employees)
        }
        return employees
    } catch (err) { console.log(err)}
}

async function _loadDemoEmployees() {
    try {
        const response = await fetch('./src/data/demoEmployees.json')
        const demoEmployees = await response.json()
        return demoEmployees
    } catch (err) { console.log(err)}
}