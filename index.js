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

