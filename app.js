const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const multer = require('multer');
const session = require('express-session');
const MySQLStore=require('express-mysql-session')(session);


const db = require('./utils/database');
const sync_db = require('./utils/sync_database');
const errorController = require('./controllers/error');

const app = express();

require('dotenv').config();


//photo file storage 
const photo_storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if (file.fieldname == 'criminal_photo') {
            callback(null, 'public/images/criminals');
        }
        else if (file.fieldname == 'police_photo') {

            callback(null, 'public/images/polices');
        }
    },
    filename: (req, file, callback) => {
        callback(null, new Date().getTime() + '.jpg');
    }
});

const imageFileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {

        callback(null, true);
    }
    else {
        callback(null, false);
    }
}

const sessionStore=new MySQLStore({createDatabaseTable:true},db);

app.set('view engine', 'ejs');
app.set('views', 'views');

sync_db.sync();

app.use(compression());     //compress assets while sending response
app.use(morgan('dev'));     //logging requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: photo_storage, fileFilter: imageFileFilter }).any());
app.use(express.static(path.join(__dirname, 'public')))       //for using static file
app.use(session({
    secret: 'y@lg@@ry@lg@@r',
    resave: false,
    saveUninitialized: false,
    store:sessionStore,
}));
app.use((req,res,next)=>{
    res.locals.isAuthenticated=req.session.isLoggedIn;
    res.locals.isAdmin=req.session.isAdmin;

    next();
})

//Routes
const admin_routes = require('./routes/admin');
const police_routes = require('./routes/police');
const criminal_routes = require('./routes/criminal');
const crime_routes = require('./routes/crime');
const auth_routes = require('./routes/auth');

app.use('/admin', admin_routes);
app.use('/police', police_routes);
app.use('/criminal', criminal_routes);
app.use('/crime', crime_routes);
app.use('/auth', auth_routes);

app.get('/favicon.ico', (req, res, next) => {
    res.send('No icon present');
});


app.get('/', (req, res, next) => {
    res.render('home', {
        page_title: "Home",
        path: '/'
    });
});

app.get('/500', errorController.get_error_500);

app.use(errorController.get_error_404);

// app.use((error, req, res, next) => {
//     console.log('---500 Error---');
//     errorController.get_error_500(req, res, next);
// })


const port = process.env.PORT;
app.listen(port, () => {
    console.log('Listening on ' + port);
});

