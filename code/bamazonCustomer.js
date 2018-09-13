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
1
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


        // display the products table

        for (var i = 0; i < res.length; i++){
            console.log("ID: " + res[i].item_id + " || " + "Product: " + res[i].product_name + " || " + "Department: " + res[i].department_name + " || " + "Price:" + res[i].price + " || " + "Quantity: " +  res[i].stock_quantity);
            console.log("_________________________________________________________________________________________________________");
        }
        
        // ask the user what he wants to purhcase and how many units.
        console.log(" ");
        inquirer.prompt([
            {
                name: "item_id",
                type: "input",
                message: "What item ID would you like to purchase today?",
                validate: (value) => {
                    if(isNaN(value) == false && parseInt(value) <= res.length && parseInt(value) > 0){
                        return true;
                      } else{
                        return false;
                    }
                }
                  
            },
            {
                name: "qty",
                type: "input",
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
            let itemPurchase = (ans.item_id)-1;
            let qtyPurchase = parseInt(ans.qty);
            let total = parseFloat(((res[itemPurchase].price)*qtyPurchase).toFixed(2));

            // if stock qty is more or equal of hows much user wants to buy  - update db
            if(res[itemPurchase].tock_quantity >= qtyPurchase){
                connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity: (res[itemPurchase].stock_quantity - qtyPurchase)},{item_id: ans.item_id}],
                function(err,result){
                    if(err) throw err;
                    console.log("Thank you for your purchase. \nYour total amount is: $" + total.toFixed(2) + "\nYour item(s) will be shipped to you within 2 business days.");
                });
            } else {
                console.log("Sorry, not enough units in stock.");
            }

            reprompt();
        })

   
    });
};

function reprompt(){
    inquirer.prompt([{
        type: "confirm",
        name: "reply",
        message: "Would you like to purchase another item?"
    }]).then(function(ans){
        if(ans.reply){
            startGame();
        }else{
            console.log("Thank you, come back again!");
        }
    });
}

startGame();
        
        