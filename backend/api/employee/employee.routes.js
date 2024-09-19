import express from 'express'
import { log } from '../../middleware/logger.middleware.js'
import { getEmployees, getEmployeeById, addEmployee, updateEmployee, removeEmployee } from './employee.controller.js'

// Create an Express router instance
const router = express.Router()

router.get('/', log, getEmployees)  // Route for GET requests to retrieve a list of employees with optional filtering
router.get('/:id', getEmployeeById) // Route for GET requests to retrieve a single employee by ID
router.post('/', addEmployee)       // Route for POST requests to add a new employee
router.put('/:id', updateEmployee)  // Route for PUT requests to update an existing employee
router.delete('/:id', removeEmployee) // Route for DELETE requests to remove an employee by ID

// Export the router with the defined routes
export const employeeRoutes = router