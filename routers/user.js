const express=require('express');
//引入连接池模块
const pool=require('../pool.js');
var router=express.Router();
//用户注册路由
router.post('/reg',function(req,res){
	var obj=req.body;
	console.log(obj);
	//验证数据是否为空
	if(!obj.uname){
      res.send({code:401,msg:'unmae required'});
	  //阻止往后执行
	  return;
	}
	if(!obj.upwd){
      res.send({code:402,msg:'upwd required'});
	  //阻止往后执行
	  return;
	}
	if(!obj.email){
      res.send({code:403,msg:'email required'});
	  //阻止往后执行
	  return;
	}
	if(!obj.phone){
      res.send({code:404,msg:'phone required'});
	  //阻止往后执行
	  return;
	}
	//执行SQL语句
pool.query('INSERT INTO xz_user SET ?',[obj],
	function(err,result){
if(err) throw err;
console.log(result);//result返回对象
if(result.affectedRows>0){
	res.send({code:200,msg:'register success'});
}
});
});
router.post('/login',function(req,res){
var obj1=req.body;
console.log(obj1);
if(!obj1.uname){
	res.send({code:401,msg:'uname required'});
	return;
}
if(!obj1.upwd){
	res.send({code:402,msg:'password required'});
	return;
}
//执行SQL语句，查找用户和密码同时满足的数据
pool.query('SELECT * FROM xz_user WHERE uname=? AND upwd=?',
	[obj1.uname,obj1.upwd],function(err,result){
if(err) throw err;
//console.log(result);
//判断是否登录成功result返回数组
if(result.length>0){
	res.send({code:200,msg:'login success'});
}
else{
	res.send({code:301,msg:'login err'});
}
});
});
router.get('/detail',function(req,res){
var obj2=req.query;
console.log(obj2);
if(!obj2.uid){
	res.send({code:401,msg:'uid required'});
	return;
}
pool.query('SELECT * FROM xz_user WHERE uid=?',
	[obj2.uid],function(err,result){
if(err) throw err;
//判断是否检索到用户，如果检索到响应到浏览器
//否则检索不到
//console.log(result);
//res.send({code:200,msg:'success'});
if(result.length>0){
res.send(result[0]);
}
else{
res.send({code:301,msg:'can not find'})
}
});
});
router.get('/update',function(req,res){
var obj3=req.query;
console.log(obj3);
var i=400;
//遍历对象，如果属性值是空，提示相应信息
for(var key in obj3){
	i++;
	if(!obj3[key]){
	res.send({code:i,msg:key +' required'});
return;
	}
}
pool.query('UPDATE xz_user SET ? WHERE uid=?',
	[obj3,obj3.uid],function(err,result){
if(err) throw err;
//console.log(result);
if(result.affectedRows>0){
res.send({code:200,msg:'success'});
}
else{
res.send({code:301,msg:'update err'});
}
});
});
router.get('/list',function(req,res){
var obj4=req.query;
//如果页码为空，初始值默认为0
if(!obj4.start){
obj4.start=1;
}
//如果大小为空，初始值大小3
if(!obj4.count){
obj4.count=3;
}
console.log(obj4);
obj4.start=Number(obj4.start);
obj4.count=Number(obj4.count);
var start1=(obj4.start-1)*obj4.count;
pool.query('SELECT * FROM xz_user limit ?,?',
	[start1,obj4.count],function(err,result){
if(err) throw err;
//console.log(result);
res.send(result);
});
});
router.get('/delete',function(req,res){
var obj5=req.query;
console.log(obj5);
if(!obj5.uid){
res.send({code:404,msg:'iud required'});
return;
}
pool.query('DELETE FROM xz_user WHERE uid=?',[obj5.uid],
	function(err,result){
if(err) throw err;
//console.log(result);
if(result.affectedRows>0){
res.send('删除成功');
}
else{
res.send('删除失败');
}
});
});
module.exports=router;