const inquirer = require("inquirer");
const mysql = require("mysql");

// MySQL connection information
const connection = mysql.createConnection({
    host : "localhost",
    port: 3306,
    user : "root",
    password : "Brad5740!",
    // password : "AUBootcamp2019",
    database : "bamazon_db"
});

// Initial menu function
const supervisorMenu = () => {
    inquirer.prompt([
        {
            name: "openingMenu",
            type: "list",
            message: `Welcome to the Bamazon Supervisor application! What would you like to do today?\n\n`,
            choices: ["View Product Sales by Department", "Create New Department"]
        }
    ]).then((answer) => {
        console.log(answer);
    });
};

supervisorMenu();