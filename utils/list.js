require("console.table");
const app = require("../server");
const db = require("../db/connection");

const list = {
  // all departments list
  listAllDepartments() {
    const sql = `SELECT id AS "ID", dept_name FROM departments`;

    db.promise()
      .query(sql)
      .then(([response]) => {
        console.table(response);
        app.promptUser();
      })
      .catch((error) => console.log(error));
  },
  
  /* all roles list */
  listAllRoles() {
    const sql = `SELECT id, title AS titles, salary FROM roles`;

    db.promise()
      .query(sql)
      .then(([response]) => {
        console.table(response);
        app.promptUser();
      })
      .catch((error) => console.log(error));
  },

  /* all employees list */
  listAllEmployees() {
    const sql = `SELECT e.id, e.first_name, e.last_name, title, dept_name AS department, salary,
                  CONCAT (m.first_name, ' ', m.last_name) as manager
                  FROM employees e
                  LEFT JOIN employees m ON e.manager_id = m.id
                  LEFT JOIN roles r ON e.role_id = r.id
                  LEFT JOIN departments d ON d.id = dept_id;`;

    db.promise()
      .query(sql)
      .then(([response]) => {
        console.table(response);
        app.promptUser();
      })
      .catch((error) => console.log(error));
  },
};

module.exports = list;