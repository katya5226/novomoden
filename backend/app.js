var bodyParser = require('body-parser');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var multer = require('multer');
var cors = require('cors');
var logger = require('morgan');
var login = require('./routes/loginroutes');
var fileUpload = require('express-fileupload');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/loginroutes');
var signupRouter = require('./routes/signuproutes');
var sessionRouter = require('./routes/sessionroutes');
var photosRouter = require('./routes/photos');
var allPhotosRouter = require('./routes/allphotos');
var uploadListingRouter = require('./routes/uploadListing');
var deleteListingRouter = require('./routes/deleteListing');
var editListingRouter = require('./routes/editListing');
var fillformRouter = require('./routes/fillform');
var cartListingsRouter = require('./routes/cartListings');

var conversationsRouter = require('./routes/chat/fetchconversations');
var messagesRouter = require('./routes/chat/fetchmessages');
var allunreadRouter = require('./routes/chat/fetchallunread');
var unreadRouter = require('./routes/chat/fetchunread');
var firstnameRouter = require('./routes/chat/firstname');
var newmessageRouter = require('./routes/chat/newmessage');

var forgotPassRouter = require('./routes/password/forgotpassword');
var passwordResetRouter = require('./routes/password/passwordreset');
var resetPassRouter = require('./routes/password/resetpass');
var ticketRouter = require('./routes/support/ticketroutes');
var reclamationRouter = require('./routes/support/reclamation');
var techsupportRouter = require('./routes/support/techsupportroutes');
var searchRouter = require('./routes/search');
var confirmsignupRouter = require('./routes/confirmsignup');
var profileRouter = require('./routes/profileroutes');
var walletRouter = require('./routes/userwallet');
var paymentcheckRouter = require('./routes/paymentcheck');
var paymentStatusRouter = require('./routes/paymentstatus');
var resendConfirmRouter = require('./routes/resendconfirmemail');
var purchaseProtectionRouter = require('./routes/intervalchecks/purchaseProtection');
var reminderRouter = require('./routes/intervalchecks/reminders');
var placeorderRouter = require('./routes/order/placeorder');
var sessionorderRouter = require('./routes/order/sessionorder');
var orderstatusRouter = require('./routes/order/orderstatus');
var userordersRouter = require('./routes/order/userorders');
var usersoldRouter = require('./routes/order/usersold');
var createhookRouter = require('./routes/createhook');

var router = express.Router();

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var options = {
    host: 'localhost',
    port: 3306,
    user: 'sessions',
    password: 'pejtu3Kurac.',
    database: 'sessionbase'
};

var sessionStore = new MySQLStore(options);

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/loginroutes', loginRouter);
app.use('/signuproutes', signupRouter);
app.use('/sessionroutes', sessionRouter);
app.use('/photos', photosRouter);
app.use('/uploads', express.static('uploads'));
app.use('/allphotos', allPhotosRouter);
app.use('/uploadListing', uploadListingRouter);
app.use('/deleteListing', deleteListingRouter);
app.use('/editListing', editListingRouter);
app.use('/fillform', fillformRouter);
app.use('/cartListings', cartListingsRouter);
app.use('/fetchconversations', conversationsRouter);
app.use('/fetchmessages', messagesRouter);
app.use('/fetchallunread', allunreadRouter);
app.use('/fetchunread', unreadRouter);
app.use('/firstname', firstnameRouter);
app.use('/newmessage', newmessageRouter);
app.use('/forgotpassword', forgotPassRouter);
app.use('/passwordreset', passwordResetRouter);
app.use('/resetpass', resetPassRouter);
app.use('/ticketroutes', ticketRouter);
app.use('/reclamation', reclamationRouter);
app.use('/techsupportroutes', techsupportRouter);
app.use('/search', searchRouter);
app.use('/confirmsignup', confirmsignupRouter);
app.use('/profileroutes', profileRouter);
app.use('/userwallet', walletRouter);
app.use('/paymentcheck', paymentcheckRouter);
app.use('/paymentstatus', paymentStatusRouter);
app.use('/resendconfirmemail', resendConfirmRouter);
app.use('/placeorder', placeorderRouter);
app.use('/sessionorder', sessionorderRouter);
app.use('/orderstatus', orderstatusRouter);
app.use('/userorders', userordersRouter);
app.use('/usersold', usersoldRouter);
app.use('/purchaseprotection', purchaseProtectionRouter);
app.use('/reminders', reminderRouter);
//app.use('/createhook', createhookRouter);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


const port = process.env.PORT || 4007;
app.listen(port, () => console.log(`Listening on port ${port}`));

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//var http = require('http');
module.exports = app;
//var server = http.createServer(app);
//server.listen(4007);