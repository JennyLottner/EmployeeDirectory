import express from 'express'
import { log } from '../../middleware/logger.middleware.js'
import { getEmployees, getEmployeeById, addEmployee, updateEmployee, removeEmployee } from './employee.controller.js'

const router = express.Router()

router.get('/', log, getEmployees)
router.get('/:id', getEmployeeById)
router.post('/', addEmployee)
router.put('/:id', updateEmployee)
router.delete('/:id', removeEmployee)

export const employeeRoutes = router