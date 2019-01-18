const inquirer = require("inquirer");
const mysql = require("mysql");

// MySQL connection information
const connection = mysql.createConnection({
    host : "localhost",
    port: 3306,
    user : "root",
    password : "Brad5740!",
    database : "bamazon_db"
});

// Function for formatting database information
const outputFormat = (res) => {
    res.forEach(function(item) {
        console.log(`[ Item # ${item.item_id} - ${item.product_name} - $${item.price} - ${item.stock_quantity} available ]\n`);
    });
};

// Function for producing a list of the products
const inventory = () => {
    connection.query('SELECT * FROM bamazon_db.products', function(err, res, fields) {
        if (err) throw err;
        console.log("----------\n");
        outputFormat(res);
        console.log("----------");
    });

    connection.end();
};

// Inquirer function for customers
const customerMenu = () => {
    inquirer.prompt([
        {
            name: "customerMenu",
            message: "Please enter the ID number for the item you wish to purchase.",
            type: "input"
        }
    ]).then((answer) => {
        console.log(answer);
    });
};

// Final interface function
const bamazonStore = () => {
    console.log(`\nHello and welcome to Bamazon! Here is what we have for sale, today:\n`)
    inventory();
    // customerMenu();
};

bamazonStore();