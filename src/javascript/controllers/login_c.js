import login_m from '../models/login_m'
const bind_event = ()=>{
    $('.username_tip').on('click',function(){
        $('.username_tip').css({left:"-190px"})
        $(this).html('用户名:')
    })
    $('.password_tip').on('click',function(){
        $(this).css({left:"-190px"})
        $(this).html('密码:')
    })
    $('.nickname_tip').on('click',function(){
        $(this).css({left:"-190px"})
        $(this).html('昵称:')
    })
    $('#login_form').submit(async function(e){
        e.preventDefault()
        var result =await login_m.submit($(this).serialize());
        console.log(result.msg,'ddddd')
        if(result.code==200){
            $('.title_admin').html(result.msg)
            // console.log($(".username_input").val(),88888888888888888)
            $.cookie('myname',$(".username_input").val())
            setTimeout(()=>{
                window.location = "http://localhost:8081/index.html"
            },1000)
        }
        if(result.code==401){
            $('.title_admin').html(result.msg)
        }
        
    })
}
const init = ()=>{
    bind_event()
}
export default {
    init 
}
