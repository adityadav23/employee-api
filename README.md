# Employee-API


# Add a .env file => 
  Add a MONGO_URI,  JWT_SECRET, JWT_EXPIRE

# Run following scripts =>
  npm install &&  npm start 

# Register employee with body{name, email, age, password}
localhost:5000/api/v1/employee/register

# Login employee with body {email,password}
localhost:5000/api/v1/employee/login

# After getting JWT token one can use below routes

# Get all employees
localhost:5000/api/v1/employee

# Update employee with employeeId
localhost:5000/api/v1/employee/:employeeId

# delete employee with employeeId
localhost:5000/api/v1/employee/:employeeId


