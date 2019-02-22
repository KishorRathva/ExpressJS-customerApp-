var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var expressValidator = require('express-validator');
var mongojs = require('mongojs');
var db = mongojs('customerapp', ['users']);
var ObjectId =  mongojs.ObjectId ;
var app = express();

// var logger = (req,res,next) => {
//     console.log('Logging ... ');
//     next();
// }

// app.use(logger);

//View Engine 
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
//Body Parser Middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false }));

//Set static Path 
app.use(express.static(path.join(__dirname,'public')));
app.use(expressValidator());


//Global vars

app.use((req,res,next)=>{
    res.locals.errors = null ;
    next();
});
var users = [
    {   
        id : 1 ,
        first_name : 'john',
        last_name:'Doe',
        email:'johndoe@gmail.com'
    },
    {   
        id : 2 ,
        first_name : 'kishor',
        last_name:'Rathva',
        email:'kishorrathva@gmail.com'
    },
    {   
        id : 3 ,
        first_name : 'nts',
        last_name:'eys',
        email:'ntseys@gmail.com'
    }
]

app.get('/',(req,res) => {
    // find everything
    db.users.find(function (err, docs) {
       
        res.render('index',{
            title:'Customers',
            users: docs
        });
    })
    
});

app.post('/users/add',(req,res) => {

    req.checkBody('first_name','First Name is Required').notEmpty();
    req.checkBody('last_name','Last Name is Required').notEmpty();
    req.checkBody('email','Email is Required').notEmpty();
    
    var errors = req.validationErrors();

    if(errors){
        res.render('index',{
            title:'Customers',
            users: users,
            errors:errors
        });
    }else{
        var newUser = {
            first_name: req.body.first_name,
            last_name:req.body.last_name,
            email:req.body.email
        }

        db.users.insert(newUser,(err,result) => {
            if(err){
                console.error(err);
            }
            res.redirect('/')
        });

        // console.log('SUCCESS')
    }
    
});

app.delete('/users/delete/:id', (req,res) => {
    console.log(req.params.id);
    db.users.remove({_id : ObjectId(req.params.id)},(err,result) => {
        if(err){
            console.log(err);
        }
        res.redirect('/')
    })
});
app.listen(3000, () => {
    console.log('Server Started on Port 3000....');
})

