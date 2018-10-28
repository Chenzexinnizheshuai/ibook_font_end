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
        bus.emit('go','/position-list')
    })

    $('#save-form').submit(function(e){
        e.preventDefault()
        console.log(($(this).serialize()))
        $('#save-form').ajaxSubmit({
            // type : 'POST',
            url : '/api/1/position/save',
            // data : qs.parse($('#save-form').serialize()),
            success: (results) => {
                bus.emit('go','/position-list?pagenum=1')
            },  //提交成功后的回调函数
            dataType: "json", //html(默认), xml, script, json...接受服务端返回的类型
            // resetForm: false  //成功提交后，是否重置所有表单元素的值
        })

    })
}
export default {
    save
}