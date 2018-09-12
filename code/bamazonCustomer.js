// required dependecies
var inquirer = require('inquirer');
var mysql = require('mysql');

// define mySQL connection parameters
var connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: 'root',

    password: '1234',

    database: 'bamazon'
})

connection.connect(function(err){
    if(err){
        throw err;
    }
    console.log('Connected as id: ' + connection.threadId);
})

function startGame(){
    connection.query('SELECT * FROM products', function(err, res){
        if(err) throw err;
        console.log("-_-_-_-_-_-_-_-_-_-_ Welcome To Bamazon -_-_-_-_-_-_-_-_-_-_")
        console.log("_________________________________________________________________________________________________________")

        for (var i = 0; i < res.length; i++){
            console.log("ID: " + res[i].item_id + " || " + "Product: " + res[i].product_name + " || " + "Department: " + res[i].department_name + " || " + "Price:" + res[i].price + " || " + "Quantity: " +  res[i].stock_quantity);
            console.log("_________________________________________________________________________________________________________");
        }

        console.log(" ");
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the ID of the product you would like to purchase today?",
                validate: function(value){
                    if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
                        return true;
                      } else{
                        return false;
                      }
                }
            },
            {
                type: "input",
                name: "qty",
                message: "How many units would you like to purchase today?",
                validate: function(value){
                    if(isNaN(value)){
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        ]).then(function(ans){
            const itemPurchase = (ans.id) -1;
            const qtyPurchase = parseInt(ans.qty);
            const grandTotal = parseFloat(((res[itemPurchase].price)* qtyPurchase).toFixed(2));
        })

        // checking if quantity is sufficient
        if(res[itemPurchase].stock_quantity >= qtyPurchase){
            // after purchase is complete - update table products
            connection.query("UPDATE products SET ? WHERE ?", [
                {stock_quantity: (res[itemPurchase].stock_quantity - qtyPurchase)},
                {item_id: ans.id}
            ], function(err, result){
                if(err) throw err;
                console.log("Your total is $" + grandTotal.toFixed(2) + ". Your item(s) will arrive withing 3 business days.");
                console.log('Thank you for shopping with us!');
                console.log("\n---------------------------------------------------------------------\n");
            
            });
        } else {
            console.log('Sorry, there is not enough product in stock.');
			console.log('Please modify your order.');
			console.log("\n---------------------------------------------------------------------\n");
        }
        promptAgain();
    })
}
function promptAgain(){
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase something else?"
    }]).then(function(ans){
        if(ans.reply){
            startGame();
        }else {
            console.log("See you soon!");
        }
    });
}
startGame();


