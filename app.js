const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const connectDB = require('./config/db');


//#region Initial configs 

dotenv.config({ path: './config/config.env' });
connectDB();
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//#endregion)


//#region Logging 

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

//#endregion

//#region Handlebars Config 

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
  })
)
app.set('view engine', '.hbs')

//#endregion

//#region Static Folder Setup 

app.use(express.static(path.join(__dirname, 'public')))

//#endregion

//#region Routes 

app.get('/', (req, res) => {
    res.send('Home');
})

//#endregion

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
