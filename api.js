const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.port || 3000
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use('/api/employee', router)
app.listen(port, () => {
  console.log('The server is listening on port ', port)
})


// List of employees
let employees = [
  {
    id: 1,
    firstName: "Jalpesh",
    lastName: "Vadgama",
    designation: "Technical Architect"
  }
]

router.get('/', (req, res) => {
  res.json(employees)
})

router.get('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id)
  const currentEmployee = employees.filter(employee => employee.id === employeeId)[0]
  if (currentEmployee) {
    res.json(currentEmployee)
  } else {
    res.sendStatus(404)
  }
})

router.post('/', (req, res) => {
  const employee = req.body
  const isValid = isValidEmployee(employee)
  if (isValid) {
    employees.push(employee)
    res.send(employee)
  } else {
    res.sendStatus(500)
  }
})

router.put('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id)
  const currentEmployee = employees.filter(employee => employee.id === employeeId)[0]
  if (currentEmployee) {
    let employee = req.body
    const isValid = isValidEmployee(employee)
    if (isValid) {
      currentEmployee.firstName = employee.firstName
      currentEmployee.lastName = employee.lastName
      currentEmployee.designation = employee.designation
      res.sendStatus(204)
    } else {
      res.sendStatus(500)
    }
  } else {
    res.sendStatus(404)
  }
})

router.delete('/:id', (req, res) => {
  const employeeId = parseInt(req.params.id)
  const currentEmployee = employees.filter(employee => employee.id === employeeId)[0]
  if (currentEmployee) {
    employees = employees.filter(employee => employee.id !== employeeId)
    res.sendStatus(204)
  } else {
    res.sendStatus(404)
  }
})

// Validation for employee
function isValidEmployee(employee) {
  if (!employee.id) {
    return false
  }
  if (!employee.firstName) {
    return false
  }
  if (!employee.lastName) {
    return false
  }
  if (!employee.designation) {
    return false
  }
  return true
}
