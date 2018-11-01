require('../css/app.scss') //style-loader 可以将js中的css代码放入到style标签中去
import body_template from './views/body.html'
import router from './router/index'
import flag from './controllers/flag_c'
(async ()=>{
    var theflag =await flag.flag()
    // setTimeout(() => {
        if(theflag==true){
            $('#wrapper').html(body_template) 
            router.init()
        }else{
            window.location = 'http://localhost:8081/login.html'
        }
    // }, 0);
})()






