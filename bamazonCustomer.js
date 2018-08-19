var mysql = require("mysql");
var inquirer = require("inquirer")
var cTable = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bamazon_db"
})

function startApp() {
    connection.connect(function (err) {
        if (err) throw err;
        displayItems()
    })
}

function displayItems() {
    var choiceArray = []
    connection.query("select * from products", function (err, results) {
        if (err) throw err;
        console.table(results)
        for (let i = 0; i < results.length; i++) {
            choiceArray.push(results[i].product_name)
        }
        // console.log(choiceArray)

        promptCustomer(choiceArray);
    })

}

function promptCustomer(items) {
    inquirer.prompt([{
        type: "list",
        message: "What would you like to buy?",
        choices: items,
        name: "purchasedItem"

    }, {
        type: "input",
        message: "How much would you like to buy?",
        name: "purchasedQuantity",
        validate: function (val) {
            return !isNaN(val) || val.toLowerCase() === "q";
        }

    }]).then(function (answers) {
        // console.log(answers);

        checkAvailablilty(answers.purchasedItem, answers.purchasedQuantity);
    })
}

function checkAvailablilty(item, amount) {
    connection.query("SELECT stock_quanity, price FROM products WHERE product_name=?", [item], function (err, results) {
        if (err) throw err;

        // console.log(results);

        var updatedInventory = results[0].stock_quanity - amount;
        var totalSales = amount * results[0].price;

        if (updatedInventory >= 0) {
            console.log("Congrats! you just bought " + amount + " " + item + " for $" + totalSales);
            updateDB(item, updatedInventory);
        } else {
            console.log("Insufficient quantity!");
        }
    })
}


function updateDB(item, updatedInventory) {
    // update the inventory with the new stock_quantity

    connection.query("update products SET ? WHERE ?", [{
        stock_quanity: updatedInventory
    }, {
        product_name: item
    }], function (err, results) {
        if (err) throw err;

        displayItems();
    })
}

function continuePrompt() {
    // use inquirer to ask user if they want to continue shopping
    // if yes, call displayItems()
    // if not, connection.end()


    inquirer
        .prompt([{
                name: "continueShopping",
                type: "input",
                message: "Do you want to continue shopping?",
                choices: ["yes", "no"]

            },

        ]).then(function (user) {
            if (user.message === "yes") {

              

            }
            displayItems();

        });

}