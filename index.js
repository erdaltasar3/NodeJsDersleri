const express = require("express");
const app = express();

const db = require("./data/db");

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(express.static('node_modules'));





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

    db.execute("select * from products")

    // baglanti basarili ve sonuç dönüyor.
    .then(result => {
        console.log(result[0]);

        res.render("index", {
            urunler:result[0]
        });
    })
    // bağlantı başarısız ve hata dönüyor
    .catch(err => {
        console.log(err);
    });

});

app.listen(3000, () => {
    console.log("listening on port 3000");
});