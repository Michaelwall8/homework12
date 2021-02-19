// ----------------------- \ convert to ID / ----------------------------
// The porpuse of these functions is to convert the input "strings" from users,
// to the corresponding ID "integer" inside the database.

// Department
async function getDepartmentId (department){

  // Gets the database using "MySQL syntax" and returns an array with the requested objects inside.
  const [dpasID] = await connection.query('SELECT id, name FROM department')
  
  // Finds the matching department inside the obj and returns it.
  const dpasList = dpasID.find(dpa => {
      return dpa.name == department
  })
  // console.log(dpasList)

  // Returns the department id number
  return dpasList.id
}

// Employee
async function getEmployeeId(manager){

  // Gets the database using "MySQL syntax" and returns an array with the requested objects inside.
  const [emplsID] = await connection.query('SELECT id, first_name, last_name FROM employee')
  
  // Finds the matching employee full name inside the obj and returns it.
  const emplsList = emplsID.find(empl => {
      return `${empl.first_name} ${empl.last_name}` == manager
  })
  // console.log(mngsList)

  // Returns the employee id number
  return emplsList.id
}

// Role
async function getRoleId(role){

  // Gets the database using "MySQL syntax" and returns an array with the requested objects inside.
  const [rlsID] = await connection.query('SELECT id, title FROM role')
  
  // Finds the matching role inside the obj and returns it.
  const rlsList = rlsID.find(rl => {
      return rl.title == role
  })
  // console.log(rlsList)

  // Returns the role id number
  return rlsList.id
}


// Export data to be use as 'cnv'
module.exports = {
getDepartmentId: getDepartmentId,
getRoleId: getRoleId,
getEmployeeId: getEmployeeId
};