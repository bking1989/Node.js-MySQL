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

// "View Products for Sale" function
const showStore = () => {
    connection.query('SELECT * FROM bamazon_db.products', function(err, res, fields) {
        if (err) throw err;
        console.log("");
        console.table(res);
    });

    connection.end();
};

// "View Low Inventory" function
const showLow = () => {
    connection.query('SELECT * FROM bamazon_db.products WHERE stock_quantity <= 5; ', function(err, res, fields) {
        if (err) throw err;

        if (res[0] == null) {
            console.log(`\nEverything appears to be in stock!\n`);
        } else {
            console.log("");
            console.table(res);
            console.log("");
        };
    });

    connection.end();
};

// "Add to Inventory" function
const restock = () => {
    var restockID;
    var restockQuantity;
    var restockName;

    inquirer.prompt([
        {
            name: "restock1",
            type: "input",
            message: "What is the ID number of the item you would like to restock?"
        }
    ]).then((answer) => {
        restockID = parseInt(answer.restock1);

        inquirer.prompt([
            {
                name: "restock2",
                type: "input",
                message: "How big of an order?"
            }
        ]).then((answer) => {
            restockQuantity = parseInt(answer.restock2);

            connection.query('UPDATE `products` SET stock_quantity = stock_quantity + ? WHERE item_id = ?', [restockQuantity, restockID], function(err, res, fields) {
                if (err) throw err;
            });

            connection.query('SELECT * FROM `products` WHERE item_id = ?', restockID, function(err, res, fields) {
                if (err) throw err;

                restockName = res[0].product_name;

                console.log(`\nAn order has been placed for ${restockQuantity} of the item ${restockName}. Thank you for your diligence!`);
            });

            connection.end();
        });
    });
};

// "Add New Product" function
const newProduct = () => {
    var newName;
    var newDept;
    var newPrice;
    var newQuantity;

    inquirer.prompt([
        {
            name: "newName",
            type: "input",
            message: "What is the name of the requested product?"
        }
    ]).then((answer) => {
        newName = answer.newName;

        inquirer.prompt([
            {
                name: "newDept",
                type: "input",
                message: "Which department will the product be sold in?"
            }
        ]).then((answer) => {
            newDept = answer.newDept;

            inquirer.prompt([
                {
                    name: "newPrice",
                    type: "input",
                    message: "How much will the product sell for?"
                }
            ]).then((answer) => {
                newPrice = answer.newPrice;

                inquirer.prompt([
                    {
                        name: "newQuantity",
                        type: "input",
                        message: "How large of an order would you like?"
                    }
                ]).then((answer) => {
                    newQuantity = answer.newQuantity;

                    connection.query('INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES(?, ?, ?, ?)', [newName, newDept, newPrice, newQuantity], function(err, res, fields) {
                        if (err) throw err;
                        console.log(`\nProduct order successful! ${newName} has been added to the inventory.`);
                    });

                    connection.end();
                });
            });
        });
    });
};

// Initial Inquirer function
const openingMenu = () => {
    inquirer.prompt([
        {
            name: "openingMenu",
            message: "\nWelcome to the Bamazon Manager Application!\n\n",
            type: "list",
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
        }
    ]).then((answer) => {
        console.log(answer.openingMenu);

        switch(answer.openingMenu) {
            case "View Products for Sale":
            showStore();
            break;

            case "View Low Inventory":
            showLow();
            break;

            case "Add to Inventory":
            restock();
            break;

            case "Add New Product":
            newProduct();
            break;
        };
    });
};

openingMenu();