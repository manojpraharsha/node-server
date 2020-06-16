const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin,Content-Type, Accept, Content-Length, X-Requested-With');
    next();
});

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Static folder
// app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: false })); // support encoded bodies



// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/text', (req, res) => {
    res.send('hello');
});

app.use(cors())
app.post('/freetrialHome', bodyParser.json(), (req, res) => {
    // console.log(res.json(req.body));
    // console.log(req.JSON);
    const output = `
    <p>You have a new Free Trial request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phoneNumber}</li>
    </ul>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'manoj@myanatomy.in', // generated ethereal user
            pass: 'M@npoj43'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"MyAnatomy" <manoj@myanatomy.in>', // sender address
        to: 'manojpraharsha@gmail.com,manojpraharshats@gmail.com', // list of receivers
        subject: 'Free Trial Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else {
            console.log('Message sent: %s', info.messageId);
            res.send({ msg: 'Thank you, We have received your request , We wil get back to you in 24 hours' });
        }

    });
});

app.post('/freetrialCorporate', bodyParser.json(), (req, res) => {
    const output = `
    <p>You have a new Free Trial request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phoneNumber}</li>
      <li>Current Organization: ${req.body.currentOrganization}</li>
    </ul>
  `;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'manoj@myanatomy.in', // generated ethereal user
            pass: 'M@npoj43'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    // setup email data with unicode symbols
    let mailOptions = {
        from: '"MyAnatomy" <manoj@myanatomy.in>', // sender address
        to: 'manojpraharsha@gmail.com,manojpraharshats@gmail.com', // list of receivers
        subject: 'Free Trial Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        else {
            console.log('Message sent: %s', info.messageId);
            res.send({ msg: 'Thank you, We have received your request , We wil get back to you in 24 hours' });
        }

    });
});

app.listen(3000, () => console.log('Server started...'));


// error handler
app.use(function (err, req, res, next) {
    console.error(err.message); // Log error message in our server's console
    if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
    res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
});

app.use(express.static('dist'));