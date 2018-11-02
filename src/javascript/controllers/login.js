import login_box from '../views/login-box.html'
import qs from 'querystring'
import login_model from '../models/login'
import toast from '../utils/toast'

const init = ()=>{
    render() // 渲染视图

    bindEvent()
} 

// 绑定各种事件
const bindEvent = ()=>{
    $('.go_signup').on('click',()=>{
        $('.signin_body').css('display','none')
        $('.signup_body').css('display','block')
    })
    $('.go_signin').on('click',()=>{
        $('.signup_body').css('display','none')
        $('.signin_body').css('display','block')
    })

    // 注册表单
    $('.signup_body').on('submit', '#signup_form', async function (e) {
        e.preventDefault()
        let _params = $(this).serialize()
        let _result = await login_model.signup(qs.parse(_params))
        switch ( _result.status ) {
            case 500: toast('失败，服务器出了问题'); break;
            case 201: toast('用户已存在'); break;
            default: 
                toast('注册成功');
                $('.signup_body').css('display','none')
                $('.signin_body').css('display','block')
                break;
        }
    })
    // 登录表单
    $('.signin_body').on('submit', '#signin_form', async function (e) {
        e.preventDefault()
        let _params = $(this).serialize()
        let _result = await login_model.signin(qs.parse(_params))
        switch ( _result.status ) {
            case 203: toast('密码错误'); break;
            case 202: toast('用户不存在'); break;
            default: 
                window.location.href = "/";
                toast('登录成功')
                break;
        }
    })
}


const render = ()=>{
    // var _html = template.render(admin_template, {
    //     type: type
    // })
    $('#login').html(login_box)
}


export default {
    init,
}