require('../css/app.scss') //style-loader 可以将js中的css代码放入到style标签中去
import body_template from './views/body.html'
import router from './router/index'
// 引入登录权限验证
import { userSigninAuth } from './utils/auth'
import user_controller from './controllers/user'
$('#wrapper').html(body_template)

// 登录验证
userSigninAuth((auth) => { // 如果用户已经登录
    
    // 启动路由
    router.init()

    // 渲染用户信息
    user_controller.renderUserInfo()
}, () => { // 没有登录，直接跳转到admin
    window.location.href="/login.html"
})