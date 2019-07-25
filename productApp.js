const express=require('express');
const productRouter=require('./routers/product.js');
const bodyParser=require('body-Parser');
var app=express();
app.listen(8080);
app.use(bodyParser.urlencoded({
extended:false
}));
app.use(express.static('./public'));
app.use('/product',productRouter);