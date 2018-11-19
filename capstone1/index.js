var express = require('express');
var app = express();

var server = require('http').Server(app);

// require socket.io
const socket = require('./socket.io/socket.js')(server);

const passport = require('passport');
const passportfb = require('passport-facebook').Strategy;

const session = require('express-session');

const mongoose = require('mongoose');


const User = require('./model/user.model.js');
const Word = require('./model/words.model.js');

var path = require('path');
var bodyParser = require('body-parser');
var port = 5000;


mongoose.connect('mongodb://localhost/capstone1');
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.use(session({
	secret: "asdasdasd"
}))
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function(req, res)  {
	res.render('index');
});
app.get('/waitingpage', function(req , res) {
	res.render('wordexplain');
});
app.get('/watingpage/chat', function(req, res) {
	res.render('chat');
});
app.get('/login', function(req, res) {
	res.render('login')
});
// fb route
app.get('/auth/fb', passport.authenticate('facebook', {scope:['email']}));


//chuyen huong ve index

app.get('/auth/fb/cb', passport.authenticate('facebook', {
	failureRedirect: '/login', successRedirect:'/' 
}) );

app.use('/assets', express.static(path.join(__dirname, 'public')));

server.listen(port, function() {
	console.log('listen server port' +port);
});

passport.use(new passportfb(
	{
		clientID: "147792326172060",
		clientSecret: "af38f25b7a2d0760e2d2ed93ad8b4b80",
		callbackURL: "https://b58527d9.ngrok.io/auth/fb/cb",
		profileFields: ['email','displayName']
	},
	(accessToken, refreshToken, profile, done) => {
		console.log(profile);
		User.findOne({id: profile._json.id}, (err, user) => {
			if(err) return done(err);
			if(user) return done(null, user);
			const newUser = new User({
				id: profile._json.id,
				name: profile._json.name,
				email: profile._json.email
			});
			newUser.save((err)=>{
				return done(null, newUser);
			})
		});
	}
));
passport.serializeUser((user, done)=>{
	done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findOne({id}, function (err, user) {
    done(err, user);
  });
});

