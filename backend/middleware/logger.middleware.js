import { logger } from '../services/logger.service.js'

// Middleware function to log information about incoming requests
export async function log(req, res, next) {
    logger.info('Sample Logger Middleware')
    next()
}