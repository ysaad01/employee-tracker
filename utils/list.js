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
};

module.exports = list;