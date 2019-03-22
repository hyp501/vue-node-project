import Vue from 'vue'
import VueResource  from 'vue-resource'
import VueRouter  from 'vue-router'
import Index from './components/index.vue'
import UserList from './components/userList.vue'
import Detail from './components/detail.vue'
require('./scss/reset.scss')
require('./scss/user.scss')

Vue.use(VueResource)
Vue.use(VueRouter)

const router= new VueRouter({    
    routes:[
    	{path:'/',component:Index},
    	{path:'/index',component:Index},
    	{path:'/userList',component:UserList},
    	{path:'/detail',name:'/detail',component:Detail}

    ]
});

new Vue({
    router,
    el:'#app'
});