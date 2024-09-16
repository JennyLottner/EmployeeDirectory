import { utilService } from "./util.service"

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    saveToStorage
}

function query(entityType) {
    var entities = _loadFromStorage(entityType)
    return Promise.resolve(entities)
}

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

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) || null)
}

function _loadFromStorage(key) {
    let data = localStorage.getItem(key)
    return data ? JSON.parse(data) : null
}

function _removeFromStorage(key) {
    localStorage.removeItem(key)
}