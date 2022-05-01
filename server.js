const inquirer = require('inquirer');
const db = require('./db/connection');

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
}

db.connect((err) => {
  if (err) throw err;
  console.log('Database Connected');
  promptUser();
});

exports.promptUser = promptUser;