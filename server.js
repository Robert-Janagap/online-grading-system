var express =require( 'express' ),
	http =require( 'http' ),
	path =require( 'path' ),

	app =express(),
	port =process.env.PORT || 3000;

// connect to database

//database
	
//use middleware
//offline mode
app.use( express.static( path.join( __dirname,'/public' ) ) );

// authenticate the user login

//define routes
// server side routes
var teacher = require('./app/routes/teacher.js');
var teacher = require('./app/routes/student.js');

// client side routes
var index = require('./app/routes/index.js');

// page url
//Server side

// client side
app.use( '/',index );
app.use( '/teacher',teacher );
app.use( '/student',teacher );

//server listening
http.createServer( app ).listen( port,function() {

    console.log( 'the server now listen at port ' +port );

} );
