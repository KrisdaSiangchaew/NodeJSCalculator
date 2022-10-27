# Read me
Make a basic server-side calculator app via NodeJS with nodemon, express, and body-parser dependencies. 

# Do initial setup
Via the terminal create a working directory, cd into it, and initialize npm package in that working directory.

> mkdir Calculator\
> cd Calculator\
> npm init

A file called *_package.json_* file will be created after npm init.  We then type the following in the terminal to install needed dependencies:

> npm install express\
> npm install nodemon --save-dev\
> npm install body-parser

- *_express_* dependency helps simplify web server creation.
- *_nodemon_* helps restart the server every time there is a change to the code. (We will save this under dev dependencies.)
- *_body-parser_* helps pass content from html file to the server.

When completed the *_package.json_* file should look like this.

>{\
  "name": "calculator",\
  "version": "1.0.0",\
  "description": "",\
  "main": "calculator.js",\
  "scripts": {\
    "start": "node ./calculator.js",\
    "dev": "nodemon ./calculator.js",\
    "test": "echo \"Error: no test specified\" && exit 1"\
  },\
  "author": "",\
  "license": "ISC",\
  "dependencies": {\
    "body-parser": "^1.20.1",\
    "express": "^4.18.2"\
  },\
  "devDependencies": {\
    "nodemon": "^2.0.20"\
  }\
  }

# Create our server Javascript file

In the terminal, create a _calculator.js_ file 

> touch calculator.js

Edit _calculator.js_ to use express; set base route; and tell express to listen to a port and show message in the console when it starts up.

>  const express = require('express');\
>  const app = express();\
>
>  app.get("/", function(req, res) {\
    res.send("Hello World");\
  });
> 
>  const port = 3000;\
>  app.listen(port, function() {\
    console.log(\`Start listening on port ${port}.\`)\
  });


# Start the server
Add scripts in _package.json_ for different server start conditions.

>  "scripts": {\
    "start": "node ./calculator.js",\
    "dev": "nodemon ./calculator.js",\
    "test": "echo \"Error: no test specified\" && exit 1"\
  },

Use terminal to lauch a script that will start the server with nodemon.
>  npm run dev

# Create Html file that will interact with our server
Create a *_index.html_* file. It will contain a form that has *_post_* method. In the form there are 2 text variables named *_num1_* and *_num2_* and a button named *_submit_*.

><body>
    <H1>Calculator</H1>
    <form action="/" method="post">
        <input type="text" name="num1" placeholder="First number">
        <input type="text" name="num2" placeholder="Second number">
        <button type="submit" name="submit">Calculate</button>
    </form>
</body>


# Eanble Get to show html file
Edit *_calculator.js_* so that when root page is served, it will display an html file instead of showing greeting message.

Current _app.get_:

>app.get("/", function(req, res) {\
    res.send("Hello, World!")\
  });

Modify it to:

>app.get("/", function(req, res) {\
    res.sendFile(__dirname + "/index.html");\
});

# Enable Post to read inputs from html file

Edit *_calculator.js_* to use *_body-parser_* and attach it to express.

>const bodyParser = require('body-parser');\
>app.use(bodyParser.urlencoded({ extended: true }));

Then add post call to *_calculator.js_* so that it can accept post request. 

>app.post("/", function(req, res) {\
    var num1 = Number(req.body.num1);\
    var num2 = Number(req.body.num2);\
    var result = num1 + num2;\
    res.send(\`Result of ${num1} + ${num2} is ${result}.\`);\
});

# Bonus: BMI calculator

Add html file *_bmiCalculator.html_*.  This file will be hooked to the _/bmicalculator_ route.

><body>
    <H1>BMI Calculator</H1>
    <form action="/bmicalculator", method="post">
        <input type="text" name="weight" placeholder="Weight (kg)">
        <input type="text" name="height" placeholder="Height (m)">
        <button type="submit" name="submit">Calculate BMI</button>
    </form>
</body>

We then add the following code to _calculator.js_ to get and post the content of the form in _bmiCalculator.html_.

>app.get("/bmicalculator", function(req, res) {\
    res.sendFile(__dirname +"/bmiCalculator.html");\
});
>
>app.post("/bmicalculator", function(req, res) {\
    var weight = Number(req.body.weight);\
    var height = Number(req.body.height);\
    var result = weight / (height * height);\
>
>    res.send(`Your BMI is ${result}.`);\
});
