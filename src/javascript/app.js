require('../css/app.scss') //style-loader 可以将js中的css代码放入到style标签中去
import body_template from './views/body.html'
import router from './router/index'

$('#wrapper').html(body_template)

router.init()

