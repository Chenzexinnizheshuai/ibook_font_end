// import { resolve } from "dns";

var list = (pagenum)=>{
    return  $.ajax({
        type : 'GET',
        url:`/api/1/position/list?pagenum=${pagenum}`,
        success:(data)=>{
            console.log('load',data)
            return data
        }
    })
}

var del= (id,success)=>{
    $.ajax({
        type : 'POST',
        dataType : 'text',
        url : 'api/1/position/del',
        data : {'id':id},
        success : (data)=>{
            success(data)
        }
    })
}

//查看一条数据
var listone = (id)=>{
    return $.ajax({
            type : "POST",
            url : 'api/1/position/listone',
            data : {id : id},
            success : (data)=>{
                return data
            }
        })
}
//更改一条数据
var updata = (data)=>{
    return new Promise((resolve)=>{
        $('#up-form').ajaxSubmit({
            type : 'POST',
            url : 'api/1/position/updata',
            success: (results) => {
                console.log('sucsuc')
                // console.log(qs.parse($('#upform').serialize()))
                console.log(results)
                resolve(results)
            }
        })
    
    }) 
}
//搜索功能
const search = (data)=>{
    return $.ajax({
        url : 'api/1/position/search',
        data : {key:data},
        success : (data)=>{
            console.log(data);
            return data
        }
    })

}

export default {
    list,
    del,
    listone,
    updata,
    search
}