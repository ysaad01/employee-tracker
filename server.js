const inquirer = require('inquirer');
const db = require('./db/connection');

const list = require('./utils/list');
const add = require('./utils/add');
const update = require('./utils/update');

const promptUser = () => {
  inquirer.prompt([
    {
      type: "list",
      name: "choices",
      message: "Please select a task",
      choices: [
        "View all Departments",
        "View all Roles",
        "View all Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update an Employee",
        "Exit"
      ]
    }
  ])
    .then((answers) => {
      const { choices } = answers
      // shows all depts
      if (choices === 'View all Departments') {
        list.listAllDepartments();
      }
      if (choices === 'View all Roles') {
        list.listAllRoles();
      }
      if (choices === 'View all Employees') {
        list.listAllEmployees();
      }
      if (choices === 'Add a Department') {
        add.addDept();
      }
      if (choices === 'Add a Role') {
        add.addRole();
      }
      if (choices === 'Add an Employee') {
        add.addEmployee();
      }
      if (choices === 'Update an Employee') {
        update.updateEmployeeRole();
      }
      if (choices === 'Exit') {
        db.end();
      }
  })
}

db.connect((err) => {
  if (err) throw err;
  console.log("**********************");
  console.log("*                    *");
  console.log("*  Employee Tracker  *");
  console.log("*                    *");
  console.log("**********************");
  promptUser();
});

exports.promptUser = promptUser;