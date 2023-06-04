const express = require('express');
const path = require('path')
const app = express();
var cors = require("cors");
const moment = require('moment');
const mysql = require('mysql');

const PORT = process.env.PORT || 5001;

// app.get('/',(req,res)=>{

//     res.send("<h5>Hello World</h5>")
// });

const logger = (req,res, next )=>{
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl} : ${moment().format()}`);
    next();
}

app.use(logger);


//for Cors
app.use(cors());


const connection = mysql.createConnection({
    host: 'localhost',
    user:'admin',
    password: '@Dmin_3214',
    database: 'sakila',
    port: '3309'

});

connection.connect();

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//select all actor
app.get('/api/member',(req,res)=>{

    connection.query('SELECT * FROM `actor`',(err,rows,fields) =>{
        if(err) throw err
        res.json(rows);
    });
 });

 //select specific actor
 app.get('/api/member/:id',(req,res)=>{

    var id = req.params.id;

    connection.query(`SELECT * FROM actor where actor_id = '${id}'`,(err,rows,fields) =>{
        if(err) throw err

        if(rows.length > 0){
            res.json(rows);
        }
        else{
            res.status(400).json({msg: `No user with and id of '${id}'`})
        }
        
    });
 });

 //create new actor
 app.post('/api/insert_member', (req,res) =>{
    var fname = req.body.fname;
    var lname = req.body.lname;

    //
    connection.query(`INSERT INTO actor (first_name, last_name) VALUES ('${fname}','${lname}');`,(err,rows,fields) =>{
        if(err) throw err

       
        res.json({msg: `1 rows was inserted`});
        
        
    });

    
    
 });

  //Update new actor
  app.post('/api/update_member', (req,res) =>{
    var fname = req.body.fname;
    var lname = req.body.lname;
    var id = req.body.id;

    //
    connection.query(`UPDATE sakila.actor SET first_name = '${fname}',last_name = '${lname}' WHERE actor_id = ${id};
    `,(err,rows,fields) =>{
        if(err) throw err

       
        res.json({msg: `1 rows was updated succesfully`});
        
        
    });

    
    
 });
 
 


app.use(express.static(path.join(__dirname,'public')))

app.listen(PORT,()=>{
    console.log('Server is started in port ' + PORT);
});

