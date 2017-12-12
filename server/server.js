var pg = require('pg');
var Sequelize=require ('sequelize');
var app  = require('express')();// Express App include
var path = require('path');
var http = require('http').Server(app); // http server
var env = app.get('env') == 'development' ? 'dev' : app.get('env');
pg.defaults.ssl = process.env.DATABASE_URL != undefined;
var port = process.env.PORT || 4000;
var bodyParser = require("body-parser"); // Body parser for fetch posted data

app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json()); // Body parser use JSON data
var express = require('express');
var router = express.Router();

var sequelize = new Sequelize('postgres', 'postgres', 'Rajkumar@123', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
//     dialectOptions:{
//     ssl:true
// }
    // DATABASE_URL:'postgres://fnykiielutjcbx:25236de90eda0295f5f26480a2a5686ce817d6bc8f7b3e88ac0c9809367a42cd@ec2-54-235-90-107.compute-1.amazonaws.com:5432/ddoekvsmvbt4bm'
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
 app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// });
  app.get('/Get',function(req,res){
    
   var data = {
        "Data":""
    };
     sequelize.query("SELECT * FROM persondetails", { type: sequelize.QueryTypes.SELECT})
  .then(function(persondetails,err,rows,fields) {
    // We don't need spread here, since only the results will be returned for select queries
    //if(rows.length!=0){
    if(persondetails){
    
           data["Data"] = persondetails;
            // data["Data"] = rows;
            res.json({"err" : false, "message" : "success",data});
           // res.json(data);
        }
  });
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.post('/Post',function(req,res){
 console.log('Hi');
  console.log(req.body);

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var pwd = req.body.pwd;
    var confirmpwd = req.body.confirmpwd;
    var email =req.body.email;
    var phone =req.body.phone;
    //  var firstname = 'yogi';
    // var lastname = 'yogi';
    // var pwd = 'yogi';
    // var confirmpwd = 'yogi';
       // console.log(firstname);
       // console.log(req.body);

    var data = {
        "Data":""
    };
   
   //if(!!firstName && !!lastname && !!pwd && !!confirmPwd)
  if(!!firstname && !!lastname && !!pwd && !!confirmpwd && !!email && !!phone) 
    {
//sequelize.query("INSERT INTO persondetails(firstName,lastname,pwd,confirmPwd) VALUES('" + firstName+ "','" + lastname+ "','" + pwd + "','" + confirmPwd+ "')",[firstName,lastname,pwd,confirmPwd],{type: sequelize.QueryTypes.INSERT}).then(function(persondetails,err) {
  sequelize.query("INSERT INTO persondetails (firstname,lastname,pwd,confirmpwd,email,phone) VALUES('" + firstname+ "','" + lastname+ "','" + pwd + "','" + confirmpwd+ "','" + email+ "','" + phone+ "')",[firstname,lastname,pwd,confirmpwd,email,phone],{type: sequelize.QueryTypes.INSERT}).then(function(persondetails,err) {
    
 if(!!err){ 
 // if(!!err){
                data.Data = "Error Adding data";
            }else{
                //data["Data"] = 0;
                data["Data"] = "Bird Added Successfully";
            }
            res.json(data);
        });
   }
    else{
        data["Data"] = "Please provide all required data of bird";
        //res.json(404).data);
res.status(400).json(data);
    }
});
  // app.use('/api', router);
   app.listen(port);
console.log('Magic happens on port ' + port);
