<template>

<div id="detail">
	<p>name:{{user.name}}</p>
	<p>phone:{{user.phone}}</p>
	 <p>sex:{{user.sex}}</p>
	 <p>adress:{{user.adress}}</p>
	<p>massage:{{user.massage}}</p> 	
</div>
</template>
<script>
import httpHelper from "../util/httpHelper"
import UserModel from '../model/userModel'
export default{
	data(){
		return{
			id:0,
			user:{},
			userList:[]
		}
	},
	created: function() {
			let _self=this;
		    var newsID=this.$route.params.id;
		    var params = {'id':newsID};	
			httpHelper.post(_self,"getItemById",params,(data)=>{
				let result=data.body;
				let newResult = result.data.reverse();
				if(result.code<0){
					alert(result.description);
				}
				else{
					let arr = [];					
		          	let userfoModel = new UserModel(newResult[0]);		          		
		          	_self.user = userfoModel;	
				}
			})
	  	}
	}	
</script>
<style type="text/css" scoped>
	div#detail {
   		 padding: 20px;
	}

	p {
	    border-bottom: 1px solid #ccc;
	    line-height: 30px;
	}
</style>