var express =require( 'express' ),
    http =require( 'http' ),
    path =require( 'path' ),
    mongoose =require( 'mongoose' ),
    bodyParser =require( 'body-parser' ),
    passport = require('passport'),
    localStrategy = require('passport-local').Strategy,
    cookieParser = require('cookie-parser'),
    session = require('express-session'),

    app =express(),
    port =process.env.PORT || 3000;

// connect to database
mongoose.connect('mongodb://127.0.0.1/gradingSystem');
//database
var users = mongoose.model('users', require('./app/models/dbUser.js'));

//use middleware
app.use( express.static( path.join( __dirname,'/public' ) ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended :true } ) );
app.use(session({
    secret: 'This is the secret',
    resave: false,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

// authenticate the user login
passport.use(new localStrategy(function(username, password, done){

        users.findOne({username: username, password: password}, function(err, user){
            if(user){
                return done(null, user);
            }
            return done(null, {loginErr: 'wrong username or password'});
        });
    }

));
passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(user, done){
    done(null, user);
});
//define routes
// server side routes
var teacher = require('./app/routes/teacher.js');
var student = require('./app/routes/student.js');

// client side routes
var index = require('./app/routes/index.js');

app.post('/login', passport.authenticate('local'), function(req, res){
    res.json(req.user);
});

// page url
//Server side

// client side
app.use( '/',index );
app.use( '/teacher',teacher );
app.use( '/student',student );




//server listening
http.createServer( app ).listen( port,function() {

    console.log( 'the server now listen at port ' +port );

} );
