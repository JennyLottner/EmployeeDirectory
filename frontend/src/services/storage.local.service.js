import { utilService } from "./util.service"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    saveToStorage
}

// Retrieves all entities of a specified type from local storage
function query(entityType) {
    var entities = _loadFromStorage(entityType)
    return Promise.resolve(entities)
}

// Retrieves a single entity by ID from local storage
async function get(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const entity = entities.find(entity => entity._id === entityId)
        if (!entity) {
            throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        }
        return entity
    } catch (err) {
        console.log(err)
        throw err
    }
}

// Adds a new entity to the local storage after generating a unique ID
async function post(entityType, newEntity) {
    try {
        newEntity = { ...newEntity }
        newEntity._id = utilService.makeId()

        const entities = await query(entityType)
        entities.push(newEntity)
        saveToStorage(entityType, entities)
        return newEntity
    } catch (err) {
        console.error(err)
        throw err
    }
}

// Updates an existing entity in the local storage
async function put(entityType, updatedEntity) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        if (idx < 0) throw new Error(`Update failed, cannot find entity with id: ${updatedEntity._id} in: ${entityType}`)
        entities.splice(idx, 1, updatedEntity)
        saveToStorage(entityType, entities)
        return updatedEntity
    } catch (err) {
        console.error(err)
        throw err
    }
}

// Removes an entity from the local storage
async function remove(entityType, entityId) {
    try {
        const entities = await query(entityType)
        const idx = entities.findIndex(entity => entity._id === entityId)
        if (idx < 0) throw new Error(`Remove failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        entities.splice(idx, 1)
        saveToStorage(entityType, entities)
    } catch (err) {
        console.error(err)
        throw err
    }
}

// Saves data to local storage under a specified key
function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null)
}

// Loads data from local storage for a specified key
function _loadFromStorage(key) {
    let data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

// Removes data from local storage for a specified key
function _removeFromStorage(key) {
    localStorage.removeItem(key)
}