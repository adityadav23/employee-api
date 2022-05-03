const Employee = require('../models/employee.model')

async function register(req, res){

        // upload to db
        const employee = await Employee.create({...req.body})
        //generating token
        const token = employee.createJWT()
    
        res.status(201).json({
          employee,
           token,
          })
    
}

async function login(req, res){
    const { email, password } = req.body
    //validating email and password provided
      if (!email || !password) {
        throw new Error('Please provide email and password')
      }
      //find employee in db
      const employee = await Employee.findOne({ email })
      //if employee doesn't exist
      if (!employee) {
        throw new Error('Invalid Credentials')
      }
      //check if password is correct
      const isPasswordCorrect = await employee.comparePassword(password)
      //if password incorrect
      if (!isPasswordCorrect) {
        throw new Error('Invalid Credentials')
      }
      //create jwt token using instance method after successful authentication
      const token = employee.createJWT()
      res.status(200).json({ employee: { name: employee.name }, token })
}

module.exports = {
    login,
    register,
}