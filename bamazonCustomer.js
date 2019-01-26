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
    connection.query('SELECT item_id, product_name, department_name, price, stock_quantity FROM bamazon_db.products', function(err, res, fields) {
        if (err) throw err;
        console.table(res);
        console.log("\n")
    });
};

// Function for updating the store database
const storeUpdate = (itemID, quantity, customerTotal) => {
    connection.query('UPDATE bamazon_db.products SET stock_quantity = stock_quantity - ? WHERE item_id = ?', [quantity, itemID], function(err, res, fields) {8
        if (err) throw err;
    });

    connection.query('UPDATE bamazon_db.products SET product_sales = product_sales + ? WHERE item_id = ?', [customerTotal, itemID], function(err, res, fields) {
        if (err) throw err;
    });
};

// Function for checking if an item is in stock
const checkInventory = (itemID, quantity) => {
    connection.query('SELECT * FROM `products` WHERE `item_id` = ?', itemID, function(err, res, fields) {
        if (err) throw err;

        if (quantity <= res[0].stock_quantity) {
            var customerTotal = quantity * res[0].price;

            console.log(`\nYour order for ${quantity} ${res[0].product_name} comes to a total of $${customerTotal}`);

            storeUpdate(itemID, quantity, customerTotal);

            console.log("\nYour order will be placed right away. Thank you for shopping with us!\n");

            connection.end();
        } else if (quantity > res[0].stock_quantity) {
            console.log("\nI'm sorry, but we don't have enough of this item in stock! Please try a different order.\n");
            customerMenu();
        };
    });
};

// Inquirer function ( with variables) for customers
var customerItem;
var customerQuantity;
var customerProduct;

const customerMenu =() => {
    inquirer.prompt([
        {
            name: "customerItem",
            message: "Please enter the ID number for the item you wish to purchase.",
            type: "input"
        }
    ]).then((answer) => {
        customerItem = answer.customerItem;

        inquirer.prompt([
            {
                name: "customerQuantity",
                message: "And how many of this item would you like?",
                type: "input"
            }
        ]).then((answer) => {
            customerQuantity = answer.customerQuantity;

            connection.query('SELECT * FROM `products` WHERE item_id = ?', customerItem, function(err, res, fields) {
                if (err) throw err;
                customerProduct = res[0].product_name;

                inquirer.prompt([
                    {
                        name: "customerConfirm",
                        message: `Your order is for ${customerQuantity} of ${customerProduct}. Is this correct?`,
                        type: "confirm"
                    }
                ]).then((answer) => {
                    if (answer.customerConfirm === true) {
                        checkInventory(customerItem, customerQuantity);
                    } else if (answer.customerConfirm === false) {
                        customerMenu();
                    }
                });
            });
        });
    });
};


// Final interface function
const bamazonStore = () => {
    console.log("\n");
    console.log(`\nHello and welcome to Bamazon! Here is what we have for sale, today:\n`)
    inventory();
    setTimeout(function() {customerMenu()}, 200);
};

bamazonStore();