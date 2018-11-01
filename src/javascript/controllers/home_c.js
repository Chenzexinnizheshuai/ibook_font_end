
const home_c = ()=>{
    console.log("home_load")
    console.log($.cookie('thecookie'))
    $('.myname').html($.cookie('myname'))
    $('.exitbtn').click(()=>{
        window.location = "http://localhost:8081/login.html"
        $.cookie('connect.sid',null)
    })
}
export default {
    home_c
}