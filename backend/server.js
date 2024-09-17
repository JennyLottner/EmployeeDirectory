import http from 'http'
import path from 'path'
import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'

import { logger } from './services/logger.service.js'
import { employeeRoutes } from './api/employee/employee.routes.js'

// create server
const app = express()
const server = http.createServer(app)

app.use(cookieParser())
app.use(express.json())

// cors url validation
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

// connect routes to server
// app.use('/api/employee', employeeRoutes)

app.get('/**', (req, res) => {               // other url's
    res.sendFile(path.resolve('public/index.html'))
})

// connect server to port
const port = process.env.PORT || 3030
server.listen(port, () => {
    logger.info('Server is running on port: ' + port)
})