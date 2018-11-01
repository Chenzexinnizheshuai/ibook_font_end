const submit = (data)=>{
    return  $.ajax({
        type : 'POST',
        url : 'api/user/login',
        data : data,
        // dataType : 'JSON',
        // contentType: "application/json"  ,
        success : (result)=>{
            console.log(result,'login_m:submit')
            return result
        }
    })
}
export default {
    submit
}