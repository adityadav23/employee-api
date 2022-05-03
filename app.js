const express = require('express')

const auth = require('./middleware/authentication')

const employeeRouter = require('./routes/employee.routes')
const employeeAuthRouter = require('./routes/employeeAuth.routes')

const app = express()

app.use(express.json())

app.use('/api/v1/employee', employeeAuthRouter)
app.use('/api/v1/employee', auth, employeeRouter)

module.exports =  app