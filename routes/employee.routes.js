const express = require('express')
const router = express.Router()
const {
    updateEmployee,
    deleteEmployee,
    getAllEmployee,
    } = require('../controllers/employee.controller')


router.route('/:employeeId').patch(updateEmployee).delete(deleteEmployee)
router.route('/').get(getAllEmployee)


module.exports = router