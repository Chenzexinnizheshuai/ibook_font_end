import html from "../views/alter.html";
import pos_m from '../models/pos_m';
import bus from "../utils/bus"
import qs from 'querystring';
const alter =async (router,req,res)=>{
    var {id} = req.body;
    let data =await pos_m.listone(id);
    let row = data[0]
    let html_tem =  template.render(html,{
        list: row
    })
    res.render(html_tem)
    bindEvent()
}

const bindEvent = () =>{
    $('#up-form').submit(async function(e){
        e.preventDefault()
        var data =await pos_m.updata()
        if(data.n==1){
            bus.emit('back')
        }
    })

}

export default {alter}