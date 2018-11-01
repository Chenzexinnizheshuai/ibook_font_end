const submit = (data)=>{
    return $.ajax({
        type : 'POST',
        url:'api/user/enroll',
        data : data,
        success : (result)=>{
            console.log(JSON.parse(result).data)
            return result;
        }
    })
        
    
            
         
   
}
export default{
    submit
}