var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config = {
    user : 'aniketaditya',
    database : 'aniketaditya',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    password : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
var path = require('path');

app.use(express.static(__dirname + '/ui'));

function createTemplate (data) {
    var title = data.title;
    var subtitle = data.subtitle;
    var date = data.date;
    var heading = data.heading;
    var author = data.author;
    var content = data.content;
    var htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">

    <head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>
    ${title}
    </title>

    <!-- Bootstrap Core CSS -->
    <link href="/vendor/bootstrap/css/bootstrap.css" rel="stylesheet">

    <!-- Theme CSS -->
    <link href="/css/my-blog.css" rel="stylesheet">

    <!-- Custom Fonts -->
    <link href="/vendor/font-awesome/css/font-awesome.css" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Lora:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans:300italic,400italic,600italic,700italic,800italic,400,300,600,700,800' rel='stylesheet' type='text/css'>

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
        <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>

<body>

    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-custom navbar-fixed-top">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                    <span class="sr-only">Toggle navigation</span>
                    Menu <i class="fa fa-bars"></i>
                </button>
                <a class="navbar-brand" href="index.html">Home</a>
            </div>

            <!-- Collect the nav links, forms, and other content for toggling -->
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li>
                        <a href="index.html">Home</a>
                    </li>
                    <li>
                        <a href="about.html">About</a>
                    </li>
                    <li>
                        <a href="post1.html">Sample Post</a>
                    </li>
                    <li>
                        <a href="contact.html">Contact</a>
                    </li>
                </ul>
            </div>
            <!-- /.navbar-collapse -->
        </div>
        <!-- /.container -->
    </nav>

    <!-- Page Header -->
    <!-- Set your background image for this header on the line below. -->
    <header class="intro-header" style="background-image: url('img/technology.jpg')">
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <div class="post-heading">
                        <h1>${heading}</h1>
                        <h2 class="subheading">${subtitle}</h2>
                        <span class="meta">Posted by <a href="#">${author}</a> on ${date.toDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    </header>

    <!-- Post Content -->
    <article>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <p>${content}</p>
                </div>
            </div>
        </div>
    </article>

    <hr>

    <!-- Footer -->
    <footer>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-lg-offset-2 col-md-10 col-md-offset-1">
                    <ul class="list-inline text-center">
                        <li>
                            <a href="https://twitter.com/aniket_aditya">
                                <span class="fa-stack fa-lg">
                                    <i class="fa fa-circle fa-stack-2x"></i>
                                    <i class="fa fa-twitter fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="https://www.facebook.com/aniket.aditya">
                                <span class="fa-stack fa-lg">
                                    <i class="fa fa-circle fa-stack-2x"></i>
                                    <i class="fa fa-facebook fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/aniketaditya">
                                <span class="fa-stack fa-lg">
                                    <i class="fa fa-circle fa-stack-2x"></i>
                                    <i class="fa fa-github fa-stack-1x fa-inverse"></i>
                                </span>
                            </a>
                        </li>
                    </ul>
                    <p class="copyright text-muted">Copyright &copy; Aniket Aditya 2016</p>
                </div>
            </div>
        </div>
    </footer>

    <!-- jQuery -->
    <script src="/vendor/jquery/jquery.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="/vendor/bootstrap/js/bootstrap.js"></script>

    <!-- Contact Form JavaScript -->
    <script src="/js/jqBootstrapValidation.js"></script>
    <script src="/js/contact_me.js"></script>

    <!-- Theme JavaScript -->
    <script src="/js/my-blog.min.js"></script>

</body>

</html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/index.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/articles/:articleName',function (req,res) {
    pool.query("SELECT * FROM article WHERE title = $1", [req.params.articleName], function(err,result) {
        if(err){
            res.status(500).send(err.toString());
    } else {
        if(result.rows.length === 0)
        {
            res.status(404).send('Article not found');
        } else {
            var articleData = result.rows[0];
            res.send(createTemplate(articleData));
        }
    }
    });
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
