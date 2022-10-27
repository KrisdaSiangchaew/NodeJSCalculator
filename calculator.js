const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Send 'Hello World' to the root route as the response
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
    // console.log(__dirname + "/index.html")
    // res.send("Hello!")
});

app.get("/bmicalculator", function(req, res) {
    res.sendFile(__dirname +"/bmiCalculator.html");
});

app.post("/bmicalculator", function(req, res) {
    var weight = Number(req.body.weight);
    var height = Number(req.body.height);
    var result = weight / (height * height);

    res.send(`Your BMI is ${result}.`);
});

app.post("/", function(req, res) {
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);
    var result = num1 + num2;

    res.send(`Result of ${num1} + ${num2} is ${result}.`);
});

// Start the server at specified port
app.listen(port, function() {
    console.log(`Start server on port ${port}`);
});