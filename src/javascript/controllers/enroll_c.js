import enroll_m from '../models/enroll_m'
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
    $('#enroll_form').submit(async function(e){
        e.preventDefault();
        var status =await enroll_m.submit($(this).serialize());
        console.log(status,'6565656565 ')
        if(JSON.parse(status).data.msg){
            alert(JSON.parse(status).data.msg)
        }else{
            alert('注册成功')
        }
        // if(status){
        //     window.location = 'http://localhost:8081/index.html'
        // }
    })
}

export  {
    bind_event
}