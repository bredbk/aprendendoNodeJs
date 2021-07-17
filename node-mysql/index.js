const express = require("express");
const mysql = require("mysql");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'nodemysql'
});

//Connect to MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('MySQL Connected.');
});

const app = express();

//Create Database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql'
    db.query(sql, (err) => {
        if (err) {
            throw err;
        }
        res.send("Database Created")
    });
});

//Create a table
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(50), designation VARCHAR (20), PRIMARY KEY(id));'
    db.query(sql, err => {
        if (err) {
            throw err
        }
        res.send('Employee table created!')

    })
})

//insert employee
app.get('/employee1', (req, res) => {
    let post = { name: 'Brendon Lima', designation: 'Estudante' }
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql, post, err => {
        if (err) {
            throw err
        }
        res.send('Employee added.')
    })
})

//select employees
app.get('/getemployee', (req, res) => {
    let sql = 'SELECT name, designation FROM employee'
    let query = db.query(sql, (err, results) => {
        if (err) {
            throw err
        }
        console.log(results)
        res.send('Employee detail feched')
    })
})

//update emplotee
app.get('/updateemployee/:id', (req, res) => {
    let newName = 'Updated name'
    let sql = `UPDATE employee SET name ='${newName}'WHERE id = ${req.params.id}`
    let query = db.query(sql, err =>{
        if (err){
            throw err
        }
        res.send('Employee updated.')
    })
})

//delete employee
app.get('/deleteamployee/:id', (req,res) =>{
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`
    let query = db.query(sql, err => {
        if(err){
            throw err
        }
        res.send('Employe deleted')
    })
})

app.listen('3000', () => {
    console.log("Servidor iniciado na pora 3000")
})