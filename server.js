var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user = 'aniketaditya',
    database = 'aniketaditya',
    host = 'db.imad.hasura-app.io',
    port = '5432',
    password = process.env.DB_PASSWORD
}

var app = express();
app.use(morgan('combined'));

function createTemplate (data) {
    var title = data.title;
    var subtitle = data.subtitle;
    var date = data.date;
    var heading = data.heading;
    var author = data.author;
    var content = data.content;
    var htmlTemplate = 
    
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
app.get('/index.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/about.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about.html'));
});

app.get('/contact.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'contact.html'));
});

app.get('/post1.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'post1.html'));
});

app.get('/css/my-blog.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/css', 'my-blog.css'));
});

app.get('/js/contact_me.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', 'contact_me.js'));
});

app.get('/mail/contact_me.php', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/mail', 'contact_me.php'));
});

app.get('/js/jqBootstrapValidation.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', 'jqBootstrapValidation.js'));
});

app.get('/js/my-blog.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/js', 'my-blog.js'));
});

app.get('/vendor/bootstrap/css/bootstrap.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/vendor/bootstrap/css', 'bootstrap.css'));
});

app.get('/vendor/bootstrap/js/bootstrap.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/vendor/bootstrap/js', 'bootstrap.js'));
});

app.get('/vendor/font-awesome/css/font-awesome.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/vendor/font-awesome/css', 'font-awesome.css'));
});

app.get('/vendor/jquery/jquery.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/vendor/jquery', 'jquery.js'));
});

app.get('/img/about-bg.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'about-bg.jpg'));
});

app.get('/img/contact.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'contact.jpg'));
});

app.get('/img/home-bg.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'home-bg.jpg'));
});

app.get('/img/image.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'image.jpg'));
});

app.get('/img/technology.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'technology.jpg'));
});

app.get('/img/contact_me.jpg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/img', 'contact_me.jpg'));
});

app.get('/vendor/bootstrap/fonts/glyphicons-halflings-regular.ttf', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/vendor/bootstrap/fonts/', 'glyphicons-halflings.ttf'));
});

app.get('/vendor/bootstrap/fonts/glyphicons-halflings-regular.svg', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/vendor/bootstrap/fonts/', 'glyphicons-halflings.svg'));
});

app.get('/vendor/font-awesome/fonts/fontawesome-webfont.ttf', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/vendor/font-awesome/fonts' , 'fontawesome-webfont.ttf'));
});

app.get('/vendor/font-awesome/fonts/fontawesome-webfont.woff', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/vendor/font-awesome/fonts' , 'fontawesome-webfont.woff'));
});
  app.get('/vendor/font-awesome/fonts/fontawesome-webfont.woff', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui/vendor/font-awesome/fonts' , 'fontawesome-webfont.woff2'));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
