import user_model from '../models/user'
const renderUserInfo = async () => {
    // 获取用户信息，再去渲染
    let _result = await user_model.info()
    console.log(_result)
    // 渲染
    if ( _result.status === 200 ) { // 已经登录了所以返回用户信息
        $('.nickname').html(_result.data.nickname)
    }


    $('#exit').click( async function () {
        let _result = await user_model.exit()
        if ( _result.status === 200 ) {
            window.location.href = '/login.html'
        }
    })
}

export default {
    renderUserInfo
}