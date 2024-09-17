import { httpService } from './http.service.js'

const BASE_URL = 'employee/'

export const employeeService = {
    query,
    getById,
    save,
    remove,
}

async function query(filterTxt = '') {
    return httpService.get(BASE_URL, filterTxt)
}

async function getById(employeeId) {
    return httpService.get(BASE_URL + employeeId)
}

async function save(employee) {
    if (employee._id) return httpService.put(BASE_URL + employee._id, employee)
    else return httpService.post(BASE_URL, employee)
}

async function remove(employeeId) {
    return httpService.delete(BASE_URL + employeeId)
}

async function _loadDemoEmployees() {
    try {
        const response = await fetch('./src/data/demoEmployees.json')
        const demoEmployees = await response.json()
        return demoEmployees
    } catch (err) { console.log(err) }
}
