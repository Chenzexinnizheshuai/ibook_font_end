import bus from '../utils/bus'
import position_template from '../views/position-list.html'
import search_template from '../views/search.html'
import pos_list from '../models/pos_m'
var pos_c = async (router,req, res, next)=>{
    $('.content-header').find('h1').html(req.route.replace(/\/|-|position/g,""))
    let html =  template.render(position_template,{
        data: (await pos_list.list(req.query.pagenum)).data
    })
    res.render(html)
    bindEvent(req,res)
    search(req,res)
}
var flag = true;

var bindEvent = (req,res)=>{
    $('#addbtn').on('click',function(){
        bus.emit('go','/save')
    })
    $('.delbtn').on('click',function(){
        var id = $(this).attr('bookid');
        
        if($('.alterbtn').length==1){
                pos_list.del(id,(data)=>{
                bus.emit('go',`/position-list?pagenum=${$('.active.pagenum').find('a').html()-1}&aa=${Math.random()}`)
            })
        }else{
             pos_list.del(id,(data)=>{
                bus.emit('go',`/position-list?pagenum=${$('.active.pagenum').find('a').html()}&aa=${Math.random()}`)
            })
        }
    })
    $('.alterbtn').on('click',function(){
        var id = $(this).attr('bookid');
        bus.emit('go','/alter',{"id":id})
    })
    //搜索功能

}
const search = (req,res)=>{
    $(".form-control").keyup(function(){
        if(flag){
            flag = false
            setTimeout(async ()=>{
                console.log($(this).val())
                let bookdata =await pos_list.search($(this).val())
                console.log(bookdata,'666')
                if($(this).val()==0){
                    console.log(9999999999999)
                    // window.location = "http://localhost:8081/index.html#/position-list?pagenum=1"
                    location.reload()
                }else if(bookdata.length==0){
                    console.log("++++++++++++++++++++++++++++++++++++")
                    res.render("<h1>我家书超级多,超级好,去看看别的把，啵啵(* ￣3)(ε￣ *)</h1>")
                }else{
                    let html =  template.render(search_template,{
                        data: bookdata
                    })
                    res.render(html)
                    bindEvent(req,res)
                }
                flag = true
            },1000)
        }
    })
    
}
export default  {pos_c};