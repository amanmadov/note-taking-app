const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const methodOverride = require('method-override')
const { engine } = require('express-handlebars');
const connectDB = require('./config/db');
const colors = require('colors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const authRoutes = require('./routes/authentication/auth');
const loginRoutes = require('./routes/authentication/login');
const signupRoutes = require('./routes/authentication/signup');
const dashboardRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/user');
const noteRoutes = require('./routes/note');


//#region Initial configs 

dotenv.config({ path: './config/config.env' });
require('./config/passport')(passport);
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Method override
app.use(
    methodOverride ((req, res) => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            let method = req.body._method;
            delete req.body._method;
            return method;
        }
    })
)

//#endregion

//#region Handlebars Configuration

app.engine('hbs', engine({
    extname: '.hbs',
    partialsDir: 'views/partials',
    helpers: require('./utils/helper'),
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

app.use((req, res, next) => {
    res.locals.user = req.user || null;
    next();
});

//#endregion

//#region Routes 

// app.use(authRoutes);
app.use(loginRoutes);
app.use(signupRoutes);
app.use(dashboardRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/note', noteRoutes);

//#endregion


app.all('*', (req, res) => {
    // res.status(404).json({ result: 'not found' });
    res.render('layouts/authentication/404', { layout:false, docTitle: 'Page Not Found' });
});


//#region Start Server 
const startServer = async () => {
    await connectDB();
    app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.underline));
};
startServer();
//#endregion