var mysql = require('mysql');
var HttpResult = require('./HttpResult');

var pool = mysql.createPool({  //连接池
	host:'localhost',
	user:'root',
	password:'123456',
	port:'3306',
	database:'mystudy'
})

exports.getItemList = function(req,res){
	var httpResult=new HttpResult();
	pool.getConnection(function(err,conn){
		if(err){
			console.log('The solution is: ', err);	
			httpResult.code = -1;
			httpResult.description = '数据库操作失败111！'
			res.send(httpResult);
		}else{			
			try{				
				var selectSQL= "select * from usersinfo";
				conn.query(selectSQL,function(err,results){		
					if(err){			
						httpResult.code=-1;
						httpResult.description = '数据库操作失败1111！'
						console.log('The solution is: ', results);	
					}else{		
						httpResult.code=1;
						httpResult.data=results
					}						
					res.send(httpResult);
					conn.release();								
				})
			}
			catch(e){				
				httpResult.code=-2;
				httpResult.data=e;
				res.send(httpResult);
			}			
		}
	});	
}

exports.addItem = function(req,res){
	console.log(req.body.name);
	var httpResult=new HttpResult();
	pool.getConnection(function(err,conn){
		if(err){
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！'
			res.send(httpResult);
		}else{			
			try{
			//	var insertSQL = "insert usersinfo (name,phone,sex,address,message) values ('"+req.body.name+"','"+req.body.phone+"','"+req.body.sex+"','"+req.body.address+"','"+req.body.message+"')" ;	
				var insertSQL = "insert usersinfo (name,phone,sex,address,message) values ('"+req.body.params.name+"','"+req.body.params.phone+"','"+req.body.params.sex+"','"+req.body.params.address+"','"+req.body.params.message+"')" ;	
				conn.query(insertSQL,function(err,results){
					if(err){
						httpResult.code = -1;
						httpResult.description = '数据库操作失败！'
					}else{			
						httpResult.code = 1;
						httpResult.data = true;
					}			
					res.send(httpResult);
					conn.release();
				})	
			}
			catch(e){
				httpResult.code=-2;
				httpResult.data=e;
				res.send(httpResult);
			}
		}
	})	
}

exports.getItemById = function(req,res){
	var httpResult=new HttpResult();
	pool.getConnection(function(err,conn){
		if(err){
			httpResult.code=-1;
			httpResult.description="数据库操作失败！"
			res.send(httpResult);
		}
		else
		{
			var id=req.body.params.id;
			if(id>0)
			{
				var selectSQL='select * from usersinfo where id='+id;
				conn.query(selectSQL,function(err,results){
					if(err){
						httpResult.code=-1;
						httpResult.description='数据库操作失败！'
					}
					else{
						httpResult.code=1;
						httpResult.data=results;
					}
					res.send(httpResult);
			        conn.release();
				})
			}
			
		}
	})
}
exports.deleteItem=function(req,res){
	var httpResult=new HttpResult();
	pool.getConnection(function(err,conn){
		if(err){
			httpResult.code=-1;
			httpResult.description='数据库操作失败！';
			res.send(httpResult);
		}
		else{
			try{
				var id=req.body.params.id;
				if(id>0){
					var selectSQL='delete from usersinfo where id='+id;
					conn.query(selectSQL,function(err,results){
						if(err){
							httpResult.code=-1;
							httpResult.description='数据库操作失败！';			
						}
						else
						{
							httpResult.code=1;
							httpResult.data=results;
						}
					})
				}
				else{
					httpResult.code=-1;
					httpResult.description='请选择数据';
					
				}
				res.send(httpResult);
				conn.release();
			}
			catch(e){
				httpResult.code=-2;
				httpResult.data=e;
				res.send(httpResult);
			}
		}
	})
}
exports.setPagination = function(req,res){
	var httpResult=new HttpResult();
	pool.getConnection(function(err,conn){
		if(err){
			httpResult.code = -1;
			httpResult.description = '数据库操作失败！'
			res.send(httpResult);
		}else{
			try{
				var selectSQL= "select * from usersinfo";
				conn.query(selectSQL,function(err,results){
			        if(err){            
			            httpResult.code = -1;
			            httpResult.description = '数据库操作失败！';                 
			        }else{   
			            var pageindex = req.params.pageindex;
			            var pagesize = req.params.pagesize;
			            var startIndex = (pageindex-1)*pagesize;
			            var endIndex = pageindex*pagesize;
			            if(endIndex>results.length){
			                endIndex = results.length;
			            }
			            var curResult = results.slice(startIndex,endIndex)
			            httpResult.code = 1;
			            httpResult.data = {itemList:curResult,allCount:results.length};       
			        }
			        res.send(httpResult);
			        conn.release();
				})
			}
			catch(e){
				httpResult.code=-2;
				httpResult.data=e;
				res.send(httpResult);
			}
		}
	})	
}