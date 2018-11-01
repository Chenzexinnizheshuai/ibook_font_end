// var wrapper = $('#router-view')
import bus from '../utils/bus'
import qs from 'querystring'
var html = require('../views/save.html')
var save = ()=>{
    var wrapper = $('#router-view')
    wrapper.html(html)
    
    bindEvent()
}
var bindEvent = ()=>{
    $('#back').on('click',()=>{
        // bus.emit('go','/position-list')
        bus.emit('back')
    })
    //表单保存事件
    $('#save-form').submit(function(e){
        e.preventDefault()
        console.log(($(this).serialize()))
        $('#save-form').ajaxSubmit({
            url : '/api/1/position/save',
            dataType: "json", //html(默认), xml, script, json...接受服务端返回的类型
            success: (results) => {
                bus.emit('go','/position-list?pagenum=1')
            },  //提交成功后的回调函数
        })
    })
}
export default {
    save
}