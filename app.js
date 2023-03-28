const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const connectDB = require('./config/db');
const colors = require('colors');



//#region Initial configs 

dotenv.config({ path: './config/config.env' });
const PORT = process.env.PORT || 8282;
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

//#endregion

//#region Routes 

const loginRoutes = require('./routes/authentication/login');

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


app.use(loginRoutes);


app.all('*', (req, res) => {
    res.render('layouts/authentication/404', { docTitle: 'Page Not Found' });
})


//#region Start Server 
const startServer = async () => {
    //await connectDB();
    app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.underline))
}
startServer();
//#endregion