import { employeeService } from './employee.service.js'
import { logger } from '../../services/logger.service.js'

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