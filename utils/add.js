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
};

module.exports = add; 