import { employeeService } from './employee.service.js'
import { logger } from '../../services/logger.service.js'

// Handle GET requests to retrieve a list of employees with optional filtering
export async function getEmployees(req, res) {
    try {
        const filterTxt = req.query.txt
        logger.debug('Getting employees:', filterTxt)

        const employees = await employeeService.query(filterTxt)
        res.json(employees)
    } catch (err) {
        logger.error('Failed to get employees', err)
        res.status(400).send({ err: 'Failed to get employees' })
    }
}

// Handle GET requests to retrieve a single employee by ID
export async function getEmployeeById(req, res) {
    try {
        const employeeId = req.params.id
        const employee = await employeeService.getById(employeeId)
        res.json(employee)
    } catch (err) {
        logger.error('Failed to get employee', err)
        res.status(400).send({ err: 'Failed to get employee' })
    }
}

// Handle POST requests to add a new employee
export async function addEmployee(req, res) {
    try {
        const employee = req.body
        const addedEmployee = await employeeService.add(employee)
        res.json(addedEmployee)
    } catch (err) {
        logger.error('Failed to add employee', err)
        res.status(400).send({ err: 'Failed to add employee' })
    }
}

// Handle PUT requests to update an existing employee
export async function updateEmployee(req, res) {
    try {
        const employee = req.body
        const updatedEmployee = await employeeService.update(employee)
        res.json(updatedEmployee)
    } catch (err) {
        logger.error('Failed to update employee', err)
        res.status(400).send({ err: 'Failed to update employee' })
    }
}

// Handle DELETE requests to remove an employee by ID
export async function removeEmployee(req, res) {
    try {
        const employeeId = req.params.id
        const removedId = await employeeService.remove(employeeId)
        res.send(removedId)
    } catch (err) {
        logger.error('Failed to remove employee', err)
        res.status(400).send({ err: 'Failed to remove employee' })
    }
}