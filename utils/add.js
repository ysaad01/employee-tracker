const inquirer = require('inquirer');
const app = require("../server");
const db = require("../db/connection");
const { response } = require('express');

const add = {
  // add dept
  addDept() {
    inquirer
      .prompt([
        {
          name: "newDept",
          type: "input",
          message: "What is the name of the New Dept that you'd like to add?",
          validate: function validateInput(input) {
            return input !== "";
          },
        },
      ])
      // take user input and add new dept to database
      .then((answer) => {
        let sql = `INSERT INTO departments (dept_name) VALUES (?)`;

        db.promise()
          .query(sql, answer.newDept)
          .then(() => {
            console.log("The Dept has been added!");
            app.promptUser();
          });
      });
  },

  addRole() {
    // select department names and add create option
    const sql = "SELECT * FROM departments";

    db.promise()
      .query(sql)
      .then(([response]) => {
        let deptNamesArray = [];
        response.forEach((departments) => {
          deptNamesArray.push(departments.dept_name);
        });
        deptNamesArray.push("Create Department");

        inquirer
          .prompt([
            {
              name: "departmentName",
              type: "list",
              message: "Which department is this new role in?",
              choices: deptNamesArray,
            },
          ])
          .then((answer) => {
            // create a new department
            if (answer.departmentName === "Create Department") {
              add.addDepartment();
            }
            // else finish role
            else {
              addRoleResume(answer);
            }
          });

        const addRoleResume = (departmentsData) => {
          inquirer
            .prompt([
              {
                name: "newRole",
                type: "input",
                message: "What is the name of this new role?",
                validate: function validateInput(input) {
                  return input !== "";
                },
              },
              {
                name: "salary",
                type: "input",
                message: "What is the salary of this new role?",
                validate: function validateInput(input) {
                  return input !== "";
                },
              },
            ])
            .then((answer) => {
              let createdRole = answer.newRole;
              let departmentsId;

              response.forEach((departments) => {
                if (departmentsData.departmentsName === departments.dept_name) {
                  departmentsId = departments.id;
                }
              });

              // Add role to db
              let sql = `INSERT INTO roles (title, salary, dept_id) VALUES (?, ?, ?)`;
              let criteria = [createdRole, answer.salary, departmentsId];

              db.promise()
                .query(sql, criteria)
                .then(() => {
                  console.log("New role has been added!");
                  app.promptUser();
                })
                .catch((error) => console.log(error));
            });
        };
      });
  },

  // add employee
  addEmployee() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: "Enter the employee's first name? (Required)",
          validate: function validateName(input) {
            return input !== "";
          },
        },
        {
          type: "input",
          name: "lastName",
          message: "Enter the employee's last name? (Required)",
          validate: function validateName(input) {
            return input !== "";
          },
        },
      ])
      .then((answer) => {
        const newEmployee = [answer.firstName, answer.lastName];

        // select employee's roles:
        const roleSql = `SELECT roles.id, roles.title FROM roles`;

        db.promise()
          .query(roleSql)
          .then(([data]) => {
            const roles = data.map(({ id, title }) => ({
              name: title,
              value: id,
            }));
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "role",
                  message: "Select the employee's role?",
                  choices: roles,
                },
              ])
              .then((roleChoice) => {
                const role = roleChoice.role;
                newEmployee.push(role);

                // select employee's manager:
                const managerSql = `SELECT * FROM employees`

                db.promise()
                  .query(managerSql)
                  .then(([data]) => {
                    const managers = data.map(
                      ({ id, first_name, last_name }) => ({
                        name: first_name + " " + last_name,
                        value: id,
                      })
                    );
                    inquirer
                      .prompt([
                        {
                          type: "list",
                          name: "manager",
                          message: "Select the employee's manager?",
                          choices: managers,
                        },
                      ])
                      .then((managerChoice) => {
                        const manager = managerChoice.manager;
                        newEmployee.push(manager);

                        // add newEmployee to db:
                        const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
                            VALUES (?, ?, ?, ?)`;

                        db.promise()
                          .query(sql, newEmployee)
                          .then(() => {
                            console.log("New employee has been added!");
                            app.promptUser();
                          })
                          .catch((error) => console.log(error));
                      });
                  });
              });
          });
      });
  },
};

module.exports = add; 