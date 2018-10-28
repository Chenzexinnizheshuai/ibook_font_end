import bus from '../utils/bus'
import position_template from '../views/position-list.html'
import pos_list from '../models/pos_m'
var pos_c = async (router,req, res, next)=>{
    let html =  template.render(position_template,{
        data: (await pos_list.list(req.query.pagenum)).data
    })
    res.render(html)
    

    bindEvent()
}
var bindEvent = ()=>{
    $('#addbtn').on('click',function(){
        bus.emit('go','/save')
    })
    $('.delbtn').on('click',function(){
        var id = $(this).attr('bookid');
        
        if($('.alterbtn').length==1){
                pos_list.del(id,(data)=>{
                bus.emit('go',`/position-list?pagenum=${$('.active.pagenum').find('a').html()-1}&aa=${$('.alterbtn').length}`)
            })
        }else{
             pos_list.del(id,(data)=>{
                bus.emit('go',`/position-list?pagenum=${$('.active.pagenum').find('a').html()}&aa=${$('.alterbtn').length}`)
            })
        }
        
  
    })
    $('.alterbtn').on('click',function(){
        var id = $(this).attr('bookid');
        bus.emit('go','/alter',{"id":id})
        // pos_list.alter()
    })
}
export default  {pos_c};