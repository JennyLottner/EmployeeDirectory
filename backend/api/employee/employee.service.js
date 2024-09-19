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

async function query(filterTxt) {
    try {
        const criteria = {}

        if (filterTxt && filterTxt.length >=2) {
            const regExp = new RegExp(filterTxt, 'i')
            criteria.$or = [
                { name: regExp },
                { workTitle: regExp }
            ]
        }

        logger.info(criteria)

        const collection = await dbService.getCollection('employee')
        const employeeCursor = await collection.find(criteria)
        const employees = await employeeCursor.toArray()
        return employees
    } catch (err) {
        logger.error('cannot find employees', err)
        throw err
    }
}

async function getById(employeeId) {
    try {
        const collection = await dbService.getCollection('employee')
        const employee = collection.findOne({ _id: new ObjectId(employeeId) })
        return employee
    } catch (err) {
        logger.error(`while finding employee ${employeeId}`, err)
        throw err
    }
}

async function remove(employeeId) {
    try {
        const collection = await dbService.getCollection('employee')
        await collection.deleteOne({ _id: new ObjectId(employeeId) })
        return employeeId
    } catch (err) {
        logger.error(`cannot remove employee ${employeeId}`, err)
        throw err
    }
}

async function add(employee) {
    try {
        const collection = await dbService.getCollection('employee')
        await collection.insertOne(employee)
        return employee
    } catch (err) {
        logger.error('cannot insert employee', err)
        throw err
    }
}

async function update(employee) {
    try {
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