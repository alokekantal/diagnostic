/**
 * Created by siddhartha on 16/7/17.
 */
var path        = require("path");
var express     = require("express");
var bodyParser  = require("body-parser");
var mongoose    = require("mongoose");
var ejs         = require('ejs');
var cookieParser= require('cookie-parser');
var passport    = require('passport');
var session     = require('express-session');

var diagnosticTestRouter = require('./modules/DiagnosticTest');
var diagnosticLabRoutes  = require('./modules/DiagnosticLab');
var bookingModule        = require('./modules/DiagnosticTestBooking');
var reportModule         = require('./modules/Report');
var reviewModule         = require('./modules/Review');
var userModule           = require('./modules/User');
var accessRoleModule     = require('./modules/AccessRole');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'views/pages'));
app.use("/", express.static(path.join(__dirname, 'views/static')));
app.use(cookieParser());
app.use(session({secret: 'library'}));
require('./config/passport')(app);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://lignio:admin@ds161042.mlab.com:61042/ligniodb', { useMongoClient: true });

mongoose.connection.on('error',function (err) {
    console.log('\n******* Mongoose default connection error *******');
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('\n*********** Mongoose default connection disconnected ************');
});



var port  = process.env.PORT || 3000;
app.use('/api/diagnosticLab', diagnosticLabRoutes);
app.use('/api/diagnosticTest', diagnosticTestRouter);
app.use('/api/booking', bookingModule);
app.use('/api/diagnosticReport', reportModule);
app.use('/api/review', reviewModule);
app.use('/api/user', userModule);
app.use('/api/accessRole', accessRoleModule);

app.get("/", function (req, res) {
    res.render("signIn/index", {
        title: "Lignio | Diagnostic Lab Dashboard",
        heading: "RB Diagnostic Center",
        bookings: 21,
        reports: 45,
        sampleCollection: 34,
        rescheduledBookings: 10
    });
});

app.get("/diagnosticLab", function (req, res) {
    res.render("diagnosticLab/index", {
        title: "Lignio | Diagnostic Lab Dashboard",
        heading: "RB Diagnostic Center",
        bookings: 21,
        reports: 45,
        sampleCollection: 34,
        rescheduledBookings: 10
    });
});

app.get("/booking", function (req, res) {
    res.render("diagnosticLab/bookingsList", {
        title: "Lignio | Profile Page"
    });
});

app.get("/booking/new", function (req, res) {
    res.render("booking/newBooking", {
        title: "Lignio | Profile Page"
    });
});

app.get("/diagnosticTests", function (req, res) {
    res.render("diagnosticTest/diagnosticTests", {
        title: "Lignio | Profile Page"
    });
});

app.get("/diagnosticTests/new", function (req, res) {
    res.render("diagnosticTest/newDiagnosticTest", {
        title: "Lignio | Profile Page"
    });
});

app.get("/profile", function (req, res) {
    res.render("diagnosticLab/diagnosticLabProfile", {
        title: "Lignio | Profile Page"
    });
});

app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
});

app.use(function (req, res, next) {
  res.status(500).send("Something went wrong..Please try again!")
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
    mongoose.connection.close(function () {
        console.log('********* Mongoose default connection disconnected through app termination *******');
        process.exit(0);
    });
});

app.listen(port, function() {
    console.log("App listening at "+ port);
});
