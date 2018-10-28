import SMERouter from 'sme-router'
import home_template from '../views/home.html'
import notfound_template from '../views/404.html'
import pos_c from '../controllers/pos_c'
import save_c from '../controllers/save_c'
import alter_c from '../controllers/alter_c'
import bus from '../utils/bus'
let _init = ()=>{
    var router = new SMERouter('router-view')//这id的标签就是res.render（）所要渲染的标签
    //router-view是html中的id只能是id不能是class
    // 中间件会先执行
    router.use((req) => {
        active_class(req.route)
    });

    router.route('/home',(req, res, next)=>{
        res.render(home_template)
    })
    router.route('/position-list',pos_c.pos_c.bind(null,router))
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
            var path = $(this).attr('to')
            router.go(path)
            // console.log(route)
        })

    }
    
    //通过路由名来为sidebar-menu添加样式
    const active_class = (route) =>{
        let $navs = $('.sidebar-menu li[to]')
        $navs.filter(`[to='${route}']`)
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

}

export default {
    init : _init
};