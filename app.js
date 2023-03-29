const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const connectDB = require('./config/db');
const colors = require('colors');
const passport = require('passport');
const session = require('express-session');
// const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');


//#region Initial configs 

dotenv.config({ path: './config/config.env' });
require('./config/passport')(passport)
const PORT = process.env.PORT || 8282;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//#endregion

//#region Routes 

const loginRoutes = require('./routes/authentication/login');
const signupRoutes = require('./routes/authentication/signup');
const dashboardRoutes = require('./routes/dashboard');

//#endregion

//#region Handlebars Configuration

app.engine('hbs', engine({
    extname: '.hbs',
    partialsDir: 'views/partials',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true

    }
}));
app.set('view engine', 'hbs');

//#endregion


//#region Passport middleware / Set User as global var 

//#region Storing Session in DB 

app.use(session({
    secret: 'keyboard cat',
    saveUninitialized: false,
    resave: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 2 * 24 * 60 * 60
    })
}));

//#endregion

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  res.locals.user = req.user || null;
  next();
})

//#endregion


app.use(loginRoutes);
app.use(signupRoutes);
app.use(dashboardRoutes);


app.all('*', (req, res) => {
    // res.status(404).json({ result: 'not found' });
    res.render('layouts/authentication/404', { layout:false, docTitle: 'Page Not Found' });
})


//#region Start Server 
const startServer = async () => {
    //await connectDB();
    app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.underline))
}
startServer();
//#endregion