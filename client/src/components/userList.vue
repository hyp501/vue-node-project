<template>
	<div>
	  <h3>报名人员</h3>
	  <table>
	  	<tr>	  		
	  		<th>姓名</th>
	  		<th>姓别</th>
	  		<th>手机号</th>
	  		<th>ID</th>
	  		<th>操作</th>	 	  		
	  	</tr>
	  	<tr v-for="item in items">	  		
	  		<td>{{item.name}}</td>
	  		<td>{{item.sex}}</td>
	  		<td>{{item.phone}}</td>
	  		<td>{{item.id}}</td>
	  		<td><router-link  class='link' :to="{name:'/detail',params:{id:item.id}}">详情</router-link>
	  			<a href="javascript:void(0);" class='link' @click='delFun(item.id)'>删除</a>
	  		</td>
	  	</tr>
	  </table>
	  <div class="pagination-box">
		  <ul class="pagination">
	  		<li class="prev" @click="prevPage()">上一页</li>
	  		<li v-for="index in pages" @click="goPage(index)" :class="{'active':curIndex==index}" :key="index">{{index}}</li>
	  		<li class="next" @click="nextPage()">下一页</li>
		  </ul>
	  </div>
	</div>
</template>
<script>

import httpHelper from "../util/httpHelper"
import UserModel from '../model/userModel'

export default{
	data(){
		return{
			items:[],
			user:{},
			pages:0,
			curIndex:1,
			pageSize:5,
			isActive:false
		}
	},
	created(){		
		this.goPage(1);
	},
	methods:{
		delFun(id){
			var _self=this;
			var params={id:id};
			httpHelper.post(_self,'deleteItem',params,(data)=>{
				if(data.body.code<0){
					alert(data.body.description);
				}
				else{
					alert('删除成功');
					history.go(0);
				}
			})
		},
		goPage(pageIndex){
			let _self = this;	
			_self.curIndex = pageIndex;				
			var httpUrl = 'page/' + _self.curIndex + '/' + _self.pageSize;
			var params = {};
			httpHelper.get(_self,httpUrl,params,(data)=>{
				if(data.body.code<0){
					alert(data.body.description);
					return;
				}
	            let result = data.body;
				if(result.data.itemList){
					let Count = result.data.allCount;
					_self.pages = Math.ceil(Count/5)
					let newResult = result.data.itemList;					
					let arr = [];					
					for(let i=0;i<newResult.length;i++){
		          		let userfoModel = new UserModel(newResult[i]);		          		
		          		arr.push(userfoModel);
		          	}
		          	_self.items = arr;					
				}
	        }, (err)=>{
	            alert("shi bai")
	        })
		},
		prevPage(){
			let _self = this;	
			if(_self.curIndex==1){
				return
			}
			let indexPage = _self.curIndex-1
			_self.goPage(indexPage)
		},
		nextPage(){
			let _self = this;	
			if(_self.curIndex==_self.pages){
				return
			}
			let indexPage = _self.curIndex+1
			_self.goPage(indexPage)
		},
		showItem(Id){
			let _self = this;	
			for(let i=0;i<_self.items.length;i++){
				if(_self.items[i].id == Id){			
				_self.user = _self.items[i];
				return;
				}
			}
		}		
	}
}
</script>
<style scoped>
	a.link {
	    margin: 0 10px;
	    display: block;
	    text-decoration: underline;
	    color: blue;
	}
</style>