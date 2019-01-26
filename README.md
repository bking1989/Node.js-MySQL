# Node.js-MySQL
Online store CLI using MySQL and NodeJS

## Table of Contents
-----
- [Summary](#summary)
- [How It Works](#how-it-works)
- [Features](#features)
    - [Customer View](#customer-view)
    - [Manager View](#manager-view)

## Summary
-----
As part of a coding boot camp assignment, we were tasked with designing CLI applications for a fictitious online store called Bamazon. In order to do this, we were expected to create and maintain a product database using [MySQL](https://www.mysql.com/) and connect it to our CLI applications using [NodeJS](https://nodejs.org/en/).

In order to better streamline the process and make it easier to navigate, we were encouraged to use pre-coded modules for NodeJS. These modules are easily accessed and updated through an included package manager for NodeJS called [NPM](https://www.npmjs.com/). The modules that our CLI applications rely upon are [mysql](https://www.npmjs.com/package/mysql) and [inquirer](https://www.npmjs.com/package/inquirer).

There was also a possible third module that we could've used called [cli-table](https://www.npmjs.com/package/cli-table). However, I forwent using this third module and, instead, made CLI applications using JavaScript's built-in feature for showing tabular data, called `console.table()`. You can read more about that [here](https://developer.mozilla.org/en-US/docs/Web/API/Console/table).

## How It Works
-----
As described in the summary section above, all the CLI applications that this assignment used were built on a couple of NPM modules called mysql and inquirer. These two modules laid a foundation for us to write JavaScript code that would (a) give us concise menus to navigate the various features and (b) access the data that we have stored in our Bamazon database that we built using MySQL.

Once the required NPM modules have been installed using NPM, the next step is to choose which CLI application we want to run. For this assignment, we created two. The first CLI application is for the customer to use, while the second CLI application is meant to be used by a manager running the Bamazon warehouse. Each of those CLI applications can be initiated like so, using a Bash terminal.

Customer Application
```bash
node bamazonCustomer.js
```

Manager Application
```
node bamazonmanager.js
```

Each application has a slightly different interface and different features, which we will go over in more detail.

## Features
---
This section will be broken up to cover the two different applications that can be used: the customer application and the manager application.

## Customer View

When you launch into the customer CLI application, you'll be initially be greeted with this opening interface.

![CustomerView_01](https://bking1989.github.io/Node.js-MySQL/images/image_01.png)

The CLI is connected to Bamazon's MySQL-based database using the NPM module, and our application ran the database's information through `console.table()` so that we could see it tabulated and neatly organized for us.

From there, the application is going to take you through a step-by-step process to help you -- the customer -- to build an order to be placed. This prompted process will cover:
- What product the customer wants to order, which is identified by a unique ID number
- How quantity of that item that the customer wants
- Final confirmation of the customer's order

At the end of this process, the CLI application will run the customer's order through an inventory check to make sure there is available stock. If so, the user will be prompted that the order was successfully places, and Bamazon's database will be updated accordingly.

An example of how this process looks can be found below.

![CustomerView_02](https://bking1989.github.io/Node.js-MySQL/images/customerOrder.gif)

## Manager View

The second CLI application that you can use is the one designed for warehouse managers working for Bamazon. When the application is launched, you're greeted with this interface.

![ManagerView_01](https://bking1989.github.io/Node.js-MySQL/images/image_02.png)

From that opening menu, Bamazon managers have four options to choose from:
- View Products for Sale
- View Low Inventory
- Add to Inventory
- Add New Product

Selection "View Products for Sale" will prompt our application to print out a tabulated display of all the information in our database -- including what products are in the system, their unique ID numbers, how many are in stock, and what department has them.

![ManagerView_02](https://bking1989.github.io/Node.js-MySQL/images/image_03.png)

Selecting "View Low Inventory" will prompt the application to scour the database and see if there are any products listed that have five or less items in stock. If everything is in stock and maintained, the application will return a message saying so.

![ManagerView_04](https://bking1989.github.io/Node.js-MySQL/images/image_04.png)

If there are items that are running low, the application will return a table displaying which products are running low.

![ManagerView_05](https://bking1989.github.io/Node.js-MySQL/images/image_05.png)

Selecting "Add to Inventory" will prompt a step-by-step process similar to what we have in the customer application. The interface will request an ID number for the item and a quantity for the size of the order. Upon receiving both, the application will confirm that an order has been placed, and the database will be updated accordingly.

![ManagerView_06](https://bking1989.github.io/Node.js-MySQL/images/addInventory.gif)

Lastly, selecting "Add New Product" will prompt a step-by-step process for the manager to order an entirely new product to add to the warehouse's inventory. This process will cover:
- What the product is called
- What department the product will be placed in
- The price of the new product
- How large of an order will be placed

An animated GIF demonstrating this is included below.

![ManagerView_07](https://bking1989.github.io/Node.js-MySQL/images/addProduct.gif)

Once the order has been successfully placed, the item will show up in the warehouse's inventory. Note that the ID number this item will have will always be new; old ID numbers are not going to be recycled by the MySQL database.

---

Thank you for taking the time to check out my assignment!