const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const employeeSchema = new mongoose.Schema({
    name:{
        type: String,
        require: [true, 'Please provide name!'],
        minLength: 3,
        maxlength: 50,
    },
    email:{
      type: String,
      required: [true,'Please provide email!!'],
      match: [
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          'Please provide a valid email',
        ],
        unique: true,
      },
    department:{
      type:String,
      default: 'HR',
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      minlength: 3,
    },
    age:{
      type:Number,
      required:[true, "Please provide your age!"]
    },

  })
    
employeeSchema.pre('save', async function(next){
          const salt = await bcrypt.genSalt(10)
          this.password = await bcrypt.hash(this.password,salt)
          next()
  })
// this method creates a jwt
 employeeSchema.methods.createJWT = function(){
    return jwt.sign({
      email: this.email,
      name: this.name,
      },
       process.env.JWT_SECRET,
          {
           expiresIn:process.env.JWT_LIFETIME
          })
      }
 //This method checks if provided password is correct 
 employeeSchema.methods.comparePassword = async function(candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword,this.password)
     return isMatch
}
module.exports = mongoose.model('Employee',employeeSchema )