var map = new AMap.Map('container', {
    center: [116.25139000000001,  40.11637],
    layers: [//使用多个图层
        new AMap.TileLayer.Satellite(),
        new AMap.TileLayer.RoadNet()
    ],
    zooms: [4,18],//设置地图级别范围
    zoom: 13
});
var transOptions = {
    map: map,
    city: '北京市',
    panel: 'panel',                            
    //cityd:'乌鲁木齐',
    policy: AMap.TransferPolicy.LEAST_TIME
}; 




var infoWindow = new AMap.InfoWindow({ //创建信息窗体
    isCustom: true,  //使用自定义窗体
    content:'<div style="color:red;font-size:30px;font-weight:900">这就是我们书店的位置</div>', //信息窗体的内容可以是任意html片段
    offset: new AMap.Pixel(16, -45)
});
var onMarkerClick  =  function(e) {
    infoWindow.open(map, e.target.getPosition());//打开信息窗体
    //e.target就是被点击的Marker
} 
var marker = new AMap.Marker({
     position: [116.25139000000001,  40.11637]
})
var markertwo = new AMap.Marker({
     position: [116.481181, 39.889792]
})
map.add(marker);
map.add(markertwo);
map.on('complete', function() {
    document.getElementById('tip').innerHTML = "地图图块加载完毕！本店位置为：" + map.getCenter();
});
marker.on('click',onMarkerClick);//绑定click事件


map.plugin('AMap.Geolocation', function() {
var geolocation = new AMap.Geolocation({
    // 是否使用高精度定位，默认：true
    enableHighAccuracy: true,
    // 设置定位超时时间，默认：无穷大
    timeout: 10000,
    // 定位按钮的停靠位置的偏移量，默认：Pixel(10, 20)
    buttonOffset: new AMap.Pixel(10, 20),
    //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    zoomToAccuracy: true,     
    //  定位按钮的排放位置,  RB表示右下
    buttonPosition: 'RB'
})

geolocation.getCurrentPosition()
AMap.event.addListener(geolocation, 'complete', onComplete)
AMap.event.addListener(geolocation, 'error', onError)

function onComplete (data) {
    // data是具体的定位信息
    console.log(data)
    var transfer = new AMap.Transfer(transOptions);
//根据起、终点坐标查询公交换乘路线
transfer.search(new AMap.LngLat(data.position.O-0.1,data.position.N-0.199), new AMap.LngLat(116.25139000000001, 40.11637), function(status, result) {
    // result即是对应的公交路线数据信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_TransferResult
    if (status === 'complete') {
        log.success('绘制公交路线完成')
    } else {
        log.error('公交路线数据查询失败' + result)
    }
});
}

function onError (data) {
    // 定位出错
}
})