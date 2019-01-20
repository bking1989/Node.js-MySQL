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

// Function for producing a list of the products
const inventory = () => {
    connection.query('SELECT * FROM bamazon_db.products', function(err, res, fields) {
        if (err) throw err;
        console.table(res);
    });
};

// Function for updating the store database
const storeUpdate = (itemID, quantity) => {
    connection.query('UPDATE bamazon_db.products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [quantity, itemID], function(err, res, fields) {
        if (err) throw err;
    });
};

// Function for checking if an item is in stock
const checkInventory = (itemID, quantity) => {
    connection.query('SELECT * FROM `products` WHERE `item_id` = ?', itemID, function(err, res, fields) {
        if (err) throw err;

        if (quantity <= res[0].stock_quantity) {
            var customerTotal = quantity * res[0].price;

            console.log(`\nYour order for ${quantity} ${res[0].product_name} comes to a total of $${customerTotal}\n`);

            storeUpdate(itemID, quantity);

            console.log("\nYour order will be placed right away. Thank you for shopping with us!\n");

            connection.end();
        } else if (quantity > res[0].stock_quantity) {
            console.log("\nI'm sorry, but we don't have enough of this item in stock! Please try a different order.\n");
            customerMenu1();
        };
    });
};

// Inquirer function ( with variables) for customers
var customerItem = "";
var customerQuantity = "";

const customerMenu1 = () => {
    inquirer.prompt([
        {
            name: "customerMenu1",
            message: "Please enter the ID number for the item you wish to purchase.",
            type: "input"
        }
    ]).then((answer) => {
        customerItem = answer.customerMenu1;
        customerMenu2();
    });
};

const customerMenu2 = () => {
    inquirer.prompt([
        {
            name: "customerMenu2",
            message: "And how many of this item would you like?",
            type: "input"
        }
    ]).then((answer) => {
        customerQuantity = answer.customerMenu2;
        customerOrder();
    });
};

const customerOrder = () => {
    inquirer.prompt([
        {
            name: "customerConfirm",
            message: `Your order is for ${customerQuantity} of item # ${customerItem}. Is this correct?`,
            type: "confirm"
        }
    ]).then((answer) => {
        if (answer.customerConfirm === true) {
            checkInventory(customerItem, customerQuantity);
        } else if (answer.customerConfirm === false) {
            customerMenu1();
        }
    });
};

// Final interface function
const bamazonStore = () => {
    console.log("\n");
    console.log(`\nHello and welcome to Bamazon! Here is what we have for sale, today:\n`)
    inventory();
    customerMenu1();
};

bamazonStore();