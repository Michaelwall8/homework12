// =====================================================================================================================
// =====================================\ Employee Tracker - Homework 12 /==============================================
// =====================================================================================================================

// Require npm
const mysql = require('mysql2/promise')
const inquirer = require('inquirer');
const consoleT = require('console.table');

// Require local modules
const db = require('./modules/generate_db.js');
const cnv = require('./modules/convert_ID.js');

// Connection var
let connnection

// Space between lines
const space = '\n \n'

// inquirer menu const
const view_employees = 'View Employees';
const view_employees_by_manager = 'View Employees by Manager'
const view_departments = 'View Departments';
const view_roles = 'View Roles';
const view_budgets = 'View Budgets';
const add_department = 'Add Department';
const add_role = 'Add Role';
const add_employee = 'Add Employee';
const update_employee_role = 'Update Employee Role';
const update_employee_manager = 'Update Employee Manager';
const delete_employee = 'Delete Employee';
const delete_department = 'Delete Department';
const delete_role = 'Delete Role\n';

// Principal Function to trigger the application.
main()

// ------------------------------\ Setup /------------------------------------ \\
// This function controls the flow of the main functions: connect and userMenu, when the app runs.
async function main () { 
  try {
    await connect()
    console.log(db.welcome) 
    await userMenu()
  } catch (err) {
    console.error(err)
  } finally {
    connection.end()
  }
}

// Stablish the connection between MySQL database and the Javascript file.
async function connect () {
  connection = await mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',   // ================ Remember to add your PASSWORD here!
    database: 'employees_db'
  })
  // Confirms the connection, printing a message on the screen.
  console.log(`\x1b[95m >>> Connected to MySQL as id: ${connection.threadId} <<< \x1b[39m`)
}

// ------------------------------\ Prompt Menu /---------------------------------- \\
// This functions Displays the main menu following the same order as the choices array.
async function userMenu() {
  await inquirer.prompt({
      name: "action",
      type: "list",
      pageSize: 13,
      message: db.main,
      choices: [
          new inquirer.Separator(db.views),
          new inquirer.Separator(),
          view_employees,
          view_employees_by_manager,
          view_departments,
          view_roles,
          view_budgets,
          
      ]

  }).then(async function (answer) {
    // Depending on your CHOICE, this function will run the corresponding action.
      switch (answer.action) {
        // All different options waiting to be call.
          case view_employees:
              await viewEmployees();
              break;
          case view_employees_by_manager:
              await viewEmployeesByManager();
              break;    
          case view_departments:
              await viewDepartments();
              break;
          case view_roles:
              await viewRoles();
              break;
          case view_budgets:
              await viewBudgets();
              break;
         
      };
  });
}; 

// ------------------------------------------------\ Async Functions /--------------------------------------------------- 

// -------------------------\ VIEW /------------------------ \\
// Display updated Employees list.
async function viewEmployees () {

  // Gets the database using "MySQL syntax" and returns an array with the requested objects inside.
  const [rows] = await connection.query('SELECT e.id, e.first_name, e.last_name, role.title, department.name AS department, role.salary, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee e INNER JOIN role ON e.role_id = role.id  INNER JOIN department ON role.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id')
  console.log(space)
  
  // Console table helps to display the array return from the query organize and clean.
  console.table(rows)
  console.log('\n')

  // Go back to main menu.
  await userMenu();
}

// Display updated Employees list by Manager
async function viewEmployeesByManager() {

// Local prompt questions.
await inquirer.prompt(
    {
      type: 'list',  
      message: 'Choose the Manager',
      name: 'manager',
      choices: await db.namesGenerator()
    }
).then(async function ({ manager }) {

    // Gets the database using "MySQL syntax" and returns an array with the requested objects inside.
    const [rows] = await connection.query(`SELECT e.id, e.first_name, e.last_name, role.title, CONCAT(m.first_name, " ", m.last_name) AS manager FROM employee e INNER JOIN role ON e.role_id = role.id INNER JOIN department ON role.department_id = department.id LEFT JOIN employee m ON m.id = e.manager_id WHERE m.id = ${await cnv.getEmployeeId(manager)}`)
    console.log(space)

    // Console table helps to display the array return from the query organize and clean.
    console.table(rows)
    console.log('\n')

    // Go back to main menu.
    await userMenu()
})
}

// Display updated Departments list.
async function viewDepartments() {

  // Gets the database using "MySQL syntax" and returns an array with the requested objects inside.
  const [rows] = await connection.query('SELECT * FROM department')
  console.log(space)

  // Console table helps to display the array return from the query organize and clean.
  console.table(rows)
  console.log('\n')

  // Go back to main menu.
  await userMenu();
};

// Display updated Roles list.
async function viewRoles() {

  // Gets the database using "MySQL syntax" and returns an array with the requested objects inside.
  const [rows] = await connection.query('SELECT role.id, title, salary, department.name AS department FROM role INNER JOIN department ON role.department_id = department.id')
  console.log(space)

  // Console table helps to display the array return from the query organize and clean.
  console.table(rows)
  console.log('\n')

  // Go back to main menu.
  await userMenu();
};

// Display updated Budgets list, organized by departments.
async function viewBudgets() {

// Gets the database using "MySQL syntax" and returns an array with the requested objects inside.
const [rows] = await connection.query('SELECT department.id, name, SUM(role.salary) total_budget FROM department INNER JOIN role ON department.id = role.department_id INNER JOIN employee ON role.id = employee.role_id GROUP BY department.id')
console.log(space)

// Console table helps to display the array return from the query organize and clean.
console.table(rows)
console.log('\n')

// Go back to main menu.
await userMenu();
};

