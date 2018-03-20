var express 		= require('express'),
	app				= express(),
	bodyparser 		= require('body-parser'),
	bcrypt			= require('bcrypt-nodejs'),
	session			= require('express-session'),
	mongoose		= require('mongoose'),
	request			= require('request'),
	methodOverride  = require('method-override'),
	multer 			= require('multer')
    place 			= require('./models/user'),
    upload      	= multer({ dest: 'public/files' });

	port 			= 80,

	routes 			= require('./routes/route')

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended :true }));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");

mongoose.connect('mongodb://sjv97mhjn:1997@ds161032.mlab.com:61032/busautomation');
// mongoose.connect('mongodb://localhost/busAutomation');

app.use("/", routes);

app.listen(port,function(){
	console.log("Listening On port " + port);
})
