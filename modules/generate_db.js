
//------------------------------------------------------\ Database /------------------------------------------------------------- \\
// ini Arrays to display updated choices 
const nameList = [];
const rolesList = [];
const departmentsList = [];

// --------------------------------------------\ Arrays Generators /--------------------------------------------------------------
// The porpuse of these functions is to generate all the Arrays and render them inside the Choices List prompt.

// NAMES
async function namesGenerator() {

  // Gets the database using "MySQL syntax" and returns an array with the requested objects inside.
  const [names] = await connection.query('SELECT first_name, last_name FROM employee')
  
  // Loops the array and creates a new one with all full names.
  names.forEach(employeeName => {
      const fullName = employeeName.first_name + ' ' + employeeName.last_name
      nameList.push(fullName)
  });

  // console.log(nameList) // =========== Names List Check

  // Returns all full employee names objects in an array,
  // so it can render the list inside the prompt when is called
  return nameList
}

// ROLES
async function rolesGenerator() {

  // Gets the database using "MySQL syntax" and returns an array with the requested objects inside.
  const [roles] = await connection.query('SELECT title FROM role')
  
  // Convert obj to arr
  roles.forEach(role => {
      rolesList.push(role.title)
  });
  // console.log(rolesList) // =========== Roles List Check

  // Returns all roles in an array,
  // so it can render the list inside the prompt when is called.
  return rolesList
}

// DEPARTMENTS
async function departmentsGenerator() {

  // Gets the database using "MySQL syntax" and returns an array with the requested objects inside.
  const [departments] = await connection.query('SELECT name FROM department')
  
  // Convert obj to arr
  departments.forEach(department => {
      departmentsList.push(department.name)
  });
  // console.log(departmentsList) // =========== Departments List Check

  // Returns all departments in an array,
  // so it can render the list inside the prompt when is called
  return departmentsList
}

// ----------------------------\ Text /------------------------- \\

// Text art 
const welcome = `\x1b[96mWELCOME!\x1b[39m`

const goodbye = ` \x1b[96mGOODBYE!\x1b[39m`
// Menu separators
const main = `  \x1b[96m>>> What would you like to do? <<<\x1b[39m`

const views = `
   \x1b[93m-- VIEWS --\x1b[39m`

const add = `
    \x1b[93m-- ADD --\x1b[39m`

const  updates = `
\x1b[93m  -- UPDATES --\x1b[39m`

const deletes = `
\x1b[93m  -- DELETES --\x1b[39m` 

const exit = `  \x1b[91m>> Exit <<\x1b[39m`


// Export data to be use as 'db'
module.exports = {
  namesGenerator: namesGenerator,
  rolesGenerator: rolesGenerator,
  departmentsGenerator: departmentsGenerator,
  welcome: welcome,
  goodbye: goodbye,
  views: views,
  add: add,
  updates: updates,
  deletes: deletes,
  main: main,
  exit: exit
};