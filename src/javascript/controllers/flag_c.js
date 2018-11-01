const flag = ()=>{
    return $.ajax({
        url: 'api/user/flag',
        success : (data)=>{
            return  data
        }
    })
    // return true
}
export default{
    flag
}