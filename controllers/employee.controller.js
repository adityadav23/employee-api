// const bcrypt = require('bcryptjs')
const Employee = require('../models/employee.model')
const jwt = require('jsonwebtoken')
  
async function updateEmployee(req,res){
  try {
      const employee = await Employee.findByIdAndUpdate(
          {_id: req.params.employeeId},
          req.body,
          {
              new: true,
              runValidators: true
          })
      res.status(200).json({
          status: "success",
          data:{
              employee,
          }
      })
      
  } catch (error) {
     res.status(400).json({
         status: "failed",
         data:{
             msg: error
         }
     })
  }
 }
 
 async function  deleteEmployee(req,res){
     try {
         const employee = await Employee.findOneAndDelete(
            {_id: req.params.employeeId},
            )
 
         if(!employee){
            return res.status(400).json({
                 status: "employee not found to delete",
                 data:{
                     msg: error
                 }
             })
         }
         return res.status(204).json({
             status: "employee deleted",
         })
     } catch (error) {
         res.status(400).json({
             status: "failed",
             data:{
                 msg: error
             }
         })
     }
 }
 
 
 async function  getAllEmployee(req,res){
    //  const features = new APIFeautures(Employee.find(), req.query)

     const allEmployees = await Employee.find();
 
     res.status(200).json({
         status: "success",
         data:{
             allEmployees
         }
     })
 }
 
 

module.exports = {
  updateEmployee,
  deleteEmployee,
  getAllEmployee,

}