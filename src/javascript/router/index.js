import SMERouter from 'sme-router'
import home_template from '../views/home.html'
import notfound_template from '../views/404.html'
import map_template from '../views/map.html'
import pos_c from '../controllers/pos_c'
import save_c from '../controllers/save_c'
import alter_c from '../controllers/alter_c'
import home_c from '../controllers/home_c'
import bus from '../utils/bus'
let _init = ()=>{
    var router = new SMERouter('router-view')//这id的标签就是res.render（）所要渲染的标签
    //router-view是html中的id只能是id不能是class
    // 中间件会先执行
    router.use((req) => {
        console.log("..................................")
        active_class(req.route)
    });
    router.route('/home',(req, res, next)=>{
        home_c.home_c()
        res.render(home_template)
    })
    router.route('/position-list',pos_c.pos_c.bind(null,router))
    router.route('/map',(req,res)=>{
        window.location = "http://localhost:8081/map.html"
    })
    router.route('/404',(req, res, next)=>{
        res.render(notfound_template)
    })
    router.route('/save',save_c.save)
    router.route('/alter',alter_c.alter.bind(null,router))
   
    router.route('*',(req, res, next)=>{
        if(req.url==''){
            res.redirect('/home')
        }else{
            router.redirect('/404')
        }
    })
    
    //给左边列表的按钮添加事件
    const list_even = (route) => {
        $('.sidebar-menu li[to]').on('click',function(){
            $(this).addClass('active')
                   .siblings()
                   .removeClass('active')
            var path = $(this).attr('to')

            router.go(path)
            // console.log(route)
        })
    }
    
    //通过路由名来为sidebar-menu添加样式
    const active_class = (route) =>{
        console.log(6664544)
        $('.content-header').find('h1').html(route.replace(/\/|-/g,""))
        let $navs = $('.sidebar-menu li[act]')
        $navs.filter(`[act='${route}']`)
             .addClass('active')
             .siblings()
             .removeClass('active')
    }
    
    bus.on('go',(path,arg={})=>{
        router.go(path,arg)
    })
    bus.on('back', () => {
        router.back()
    })  

    list_even()
    // active_class()
    
}

export default {
    init : _init
};