const inquirer = require('inquirer');
const app = require("../server");
const db = require("../db/connection");

/* update employee role*/
const update = {
  // update employee's role
  updateEmployeeRole() {
    // Gets employees from the employee table
    let updateSql = `SELECT * FROM employees`;

    db.promise()
      .query(updateSql)
      .then(([answer]) => {
        const updateEmployees = answer.map(({ id, first_name, last_name }) => ({
          name: first_name + " " + last_name,
          value: id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "name",
              message: "Which employee would you like to update?",
              choices: updateEmployees,
            },
          ])
          // push selected choice to array
          .then((eChoice) => {
            const employee = eChoice.name;
            const params = [];
            params.push(employee);

            // map roles title
            let updateSql = `SELECT * FROM roles`;

            db.promise()
              .query(updateSql)
              .then(([answer]) => {
                const newRole = answer.map(({ id, title }) => ({
                  name: title,
                  value: id,
                }));

                // select employees new role
                inquirer
                  .prompt([
                    {
                      type: "list",
                      name: "role",
                      message: "What is the employee's new role?",
                      choices: newRole,
                    },
                  ])
                  // then push selected roles to array
                  .then((roleChoice) => {
                    const role = roleChoice.role;
                    params.push(role);

                    let employee = params[0];
                    params[0] = role;
                    params[1] = employee;

                    let sql = `UPDATE employees SET role_id = ? WHERE id = ?`;

                    db.promise()
                      .query(sql, params)
                      .then(() => {
                        console.log("You have updated the Employee's Role.");
                        app.promptUser();
                      })
                      .catch((error) => console.log(error));
                  });
              });
          });
      });
  },
};

module.exports = update;