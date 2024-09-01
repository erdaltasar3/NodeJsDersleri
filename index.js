const express = require("express");
const app = express();

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.static('node_modules'));

const mysql = require("mysql2");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "nodedb"
});

connection.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("mysql baglantisi basarili");
    }
})



const data = [
    {id:1, name:"iphone 14", price: 30000, isActive: true, imageUrl:"1.jpeg", isHome: true},
    {id:2, name:"iphone 15", price: 40000, isActive: false, imageUrl:"2.jpeg", isHome:false},
    {id:3, name:"iphone 16", price: 50000, isActive: true, imageUrl:"3.jpeg", isHome: true},
]

// routes

app.use("/products/:id", function(req, res) {
    const urun = data.find(u => u.id == req.params.id);
    res.render("products-details", urun);
});

app.use("/products", function(req,res) {
    res.render("products", {
        urunler:data
    });
});

app.use("/", function(req,res) {
    res.render("index", {
        urunler:data
    });
});

app.listen(3000, () => {
    console.log("listening on port 3000");
});