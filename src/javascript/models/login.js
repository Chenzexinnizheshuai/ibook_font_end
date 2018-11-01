
const signup = (data) =>{
    return $.ajax({
        url: '/api/1/admin/signup',
        type: 'post',
        data,
        success: (results)=>{
            return results
        }
    })
}

const signin = (data) =>{
    return $.ajax({
        url: '/api/1/admin/signin',
        type: 'post',
        data,
        success: (results)=>{
            return results
        }
    })
}

export default {
    signin,
    signup
}