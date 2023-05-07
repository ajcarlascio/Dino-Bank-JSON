'use strict';
//author: Anthony Carlascio
const HTTP_PORT = process.env.PORT || 3000;
var http = require('http');
var fs = require('fs')
var express = require("express");
var bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
var path = require("path");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.engine("hbs", exphbs({ extname: "hbs" }));                              

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static('views/images')); 
//Post the login page
app.get("/", (req, res) => {

    res.render('loginpage', {layout: false});
});
//
app.post("/", (req, res) => {
    
    var userObj = JSON.parse(fs.readFileSync('./user.json'));
    var inputdata1 = req.body.username;
    var inputdata2 = req.body.password;

    userObj.hasOwnProperty(inputdata1) || res.render('loginpage', {layout: false , data : {errormessage1 : "Invalid Username"}})
    //userObj.hasOwnProperty(inputdata2) || res.render('loginpage', {layout: false , data : {errormessage2 : "Invalid Password"}})
    userObj[inputdata1] === inputdata2 || res.render('loginpage', {layout: false , data : {errormessage2 : "Invalid Password"}})
    
    //userObj.user[inputdata1].username === inputdata1 || res.render('loginpage', {layout: false , data : {errormessage1 : "Invalid Username"}})
    //userObj.user[inputdata1].password === inputdata2 || res.render('loginpage', {layout: false , data : {errormessage2 : "Invalid Password"}})
    //
    if (userObj.hasOwnProperty(inputdata1)){
        
        if (userObj[inputdata1] === inputdata2) {
        //do some stuff maybe


    res.render('userpage', {
        layout: false,
        data  : {user : inputdata1}
        //pass some data to display username
    });

    }
}
});

var server = app.listen(HTTP_PORT, function () {
    console.log(`Listening on port ${HTTP_PORT}`);
});

/*{
  "user": [
    {
      "username" : "george.tsang@senecacollege.ca", 
      "password" : "web322m1a"
    },
    {
      "username" : "john@beatles.uk", 
      "password" : "lennonj!"
    },
    {
      "username" : "paul@beatles.uk", 
      "password" : "mccartney"
    },
    {
      "username" : "mick@rollingstones.uk", 
      "password" : "jaggerm!"
    }
  ]
}


//When successful show the banking page
/*app.get("/banking", (req, res) => {


    res.render('userpage', {
        //pass some data to display username
    });
});

/*app.get("/", (req, res) =>
{
    res.send(
        `<div>
        <h1>Welcome to your online bank</h1>
        <hr />
        <form class="login" id="bankLogin" method="post" action="/user" target="userID">
            <article class="container">
                <br /><br /><br /><br /><br /><br /><br /><br />
                <input id="username" name="username" type="text" required placeholder="Enter Username here" value="" />
                <br />
                <input id="password" name="password" type="password" required placeholder="Enter Password here" value="" />
                <br />
                <button id="login" type="submit" value="submit">Submit</button>
                <br />
            </article>
            </form>
            </div>`
        );
});

app.post("/", (req, res) => {
    var userObj = JSON.parse(fs.readFileSync('./user.json'));
    var inputdata1 = req.body.username;
    var inputdata2 = req.body.password;

    userObj.hasOwnProperty(inputdata1) || console.log("Not a registered username.");
    userObj.hasOwnProperty(inputdata2) || console.log("Invalid password");

    if (userObj.hasOwnProperty(inputdata1) && userObj.hasOwnProperty(inputdata2)) {
      //do some stuff
        
    }
});

app.post("/user", (req, res) => {
    res.send(`
                <form class="userID" id="userID" method="post" action="/l">
                    <article>
                        <h1>Online<br />Banking<br />System</h1>
                        <hr />
                    </article>
                    <h2></h2>

                    <nav class="menu">
                        <h2>Menu</h2>
                        <br />
                        <input id="accountNo" maxlength="10" placeholder="Account Number" />
                        <br />
                        <input id="balance" name="options" type="radio" value="balance" onclick="fSelect()" />
                        <label for="balance">Balance</label>
                        <br />
                        <input id="deposit" name="options" type="radio" value="deposit" onclick="fSelect()" />
                        <label for="deposit">Deposit</label>
                        <br />
                        <button class="bSubmit" type="submit">Submit</button>
                    </nav>

                    
                </form>`
    );
});*/


/*fs.readFile("./user.json", "utf-8", (err, data) => {
    if (err) throw err;

    var userObj = JSON.parse(data);
    var inputdata1 = req.body.username;
    var inputdata2 = req.body.password;

    userObj.hasOwnProperty(inputdata1) || console.log("Not a registered username.");
    userObj.hasOwnProperty(inputdata2) || console.log("Invalid password");

    if (userObj.hasOwnProperty(inputdata1) && userObj.hasOwnProperty(inputdata2)) {
        http.createServer(function (req, res) {
            fs.readFile('UserPage.html', function (err, data) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        }).listen(3000);

        //res.send(`<h2></h2>`)
    }*/


    