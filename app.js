const express=require('express');
const userRouter=require('./routers/user.js');
const bodyParser=require('body-Parser');
var app=express();
app.listen(8080);
//使用body-parser中间件,将post请求的数据解析为对象
app.use(bodyParser.urlencoded({
extended:false
}));
//托管静态资源到public目录
app.use( express.static('./public') );
//使用路由器，挂载到/user下
app.use('/user',userRouter);