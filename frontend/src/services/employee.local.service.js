import { storageService } from './storage.local.service.js'

const STORAGE_KEY = 'employeeDB'

export const employeeService = {
    query,
    getById,
    save,
    remove,
}

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

async function getById(employeeId) {
    return await storageService.get(STORAGE_KEY, employeeId)
}

async function save(employee) {
    if (employee._id) return await storageService.put(STORAGE_KEY, employee)
    else return await storageService.post(STORAGE_KEY, employee)
}

async function remove(employeeId) {
    return await storageService.remove(STORAGE_KEY, employeeId)
}

async function _loadDemoEmployees() {
    try {
        const response = await fetch('./src/data/demoEmployees.json')
        const demoEmployees = await response.json()
        return demoEmployees
    } catch (err) { console.log(err) }
}