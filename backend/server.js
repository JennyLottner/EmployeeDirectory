import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

import { logger } from './services/logger.service.js'
import { employeeRoutes } from './api/employee/employee.routes.js'

// Create an HTTP server using the Express application
const app = express()
const server = http.createServer(app)

// Middleware cookies or JSON
app.use(cookieParser())
app.use(express.json())

// Configure CORS (Cross-Origin Resource Sharing)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve('public')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:3000',
            'http://127.0.0.1:5173',
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:5175',
        ],
        credentials: true
    }
    app.use(cors(corsOptions))
}

// Connect API routes to the server
app.use('/api/employee', employeeRoutes)

app.get('/**', (req, res) => {               // other url's
    res.sendFile(path.resolve('public/index.html'))
})

// Start the server and listen on the specified port
const port = process.env.PORT || 3030
server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})