var express = require('express');
var handlebars = require('express-handlebars');
var sql = require('mssql'); //sql is link for mssql module
var app = express();
//app.disable('x-powered-by');

app.engine('hbs',handlebars({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine','hbs');

app.use(require('body-parser').urlencoded({extended: false}));

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

//Holds info for the sql server info with the tables and data
var dbconfig = {
	server: "localhost\\OWNER",
	database: "forumDB",
	username: "admin",
	password: "adminpass",
	port: "1433"
};

//handles the different render of pages on the layout
app.get('/',function(req,res){
	res.render('home');
});
app.get('/forum',function(req,res){
	res.render('forum');
});
app.get('/signup',function(req,res){
	res.render('signup');
});
app.get('/login',function(req,res){
	res.render('login');
});
app.get('/submit',function(req,res){
	console.log('submitted');
	signup();
	res.render('home');
})


//lets app knows what port to listen to
app.listen(app.get('port'),function(){
	console.log('Server Started!');
});

//the following fuctions are to be called when acces to the sql server is nessecary
//this function will populate the main forum page with links to individual forum threads
function loadforums(){
	var conn = new sql.Connection(dbconfig);
	var req = new sql.Request(conn);

	conn.connect(function(err){
		if (err) {
			console.log(err);
			return;
		}
	});
}

//this function will load the actual page with the full forum info and comments
function loadThread(){
	
}
//this function is to add new user info into the sql server and allow for future logins
function signup(){

}