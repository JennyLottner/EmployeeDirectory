import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'
import mongodb from 'mongodb'
const { ObjectId } = mongodb

export const employeeService = {
    remove,
    query,
    getById,
    add,
    update,
}

// Function to query employees based on filter
async function query(filterTxt) {
    try {
        const criteria = {}

        // If filter text is provided and is at least 2 characters long, create a search criteria
        if (filterTxt && filterTxt.length >= 2) {
            const regExp = new RegExp(filterTxt, 'i')
            criteria.$or = [
                { name: regExp },
                { workTitle: regExp }
            ]
        }

        logger.info(criteria)  // Log the search criteria

        // Get the 'employee' collection, find employees matching the criteria, and convert the result to an array
        const collection = await dbService.getCollection('employee')
        const employeeCursor = await collection.find(criteria)
        const employees = await employeeCursor.toArray()
        return employees
    } catch (err) {
        logger.error('cannot find employees', err)
        throw err
    }
}

// Function to get an employee by ID
async function getById(employeeId) {
    try {
        // Get the 'employee' collection and find the employee by ID
        const collection = await dbService.getCollection('employee')
        const employee = collection.findOne({ _id: new ObjectId(employeeId) })
        return employee
    } catch (err) {
        logger.error(`while finding employee ${employeeId}`, err)
        throw err
    }
}

// Function to remove an employee by ID
async function remove(employeeId) {
    try {
        // Get the 'employee' collection and delete the employee by ID
        const collection = await dbService.getCollection('employee')
        await collection.deleteOne({ _id: new ObjectId(employeeId) })
        return employeeId
    } catch (err) {
        logger.error(`cannot remove employee ${employeeId}`, err)
        throw err
    }
}

// Function to add a new employee
async function add(employee) {
    try {
        // Get the 'employee' collection and insert the new employee
        const collection = await dbService.getCollection('employee')
        await collection.insertOne(employee)
        return employee
    } catch (err) {
        logger.error('cannot insert employee', err)
        throw err
    }
}

// Function to update an existing employee
async function update(employee) {
    try {
        // Remove the _id field from the object to avoid updating it, get the 'employee' collection, and update the employee
        const employeeToSave = { ...employee }
        delete employeeToSave._id
        const collection = await dbService.getCollection('employee')
        await collection.updateOne({ _id: new ObjectId(employee._id) }, { $set: employeeToSave })
        return employeeToSave
    } catch (err) {
        logger.error(`cannot update employee ${employee._id}`, err)
        throw err
    }
}