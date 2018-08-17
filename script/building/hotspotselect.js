/**
 * Created by chenzhe on 2017/8/3.
 */

var buildId = null;
var buildName = null;
var Address = null;
var object = null;
var tag = "tag0";
var tagSquence = 0;
var map, layer25D;
var trans = new Transformation(45, 45, 49); // 坐标转换对象
var updateTag = function() {
    tagSquence++;
    tag = "tag" + tagSquence;
};
var mapload = function() {
    if (map) return;
    var config = new OMAP.Config({
        imagePath: UICore.mapServiceUrl + "image",
        jsPath: UICore.mapServiceUrl + "resource/js/",
        mapId: 1,
        scale: 0.353,
        hotFileLevel: 5,
        overlook: Math.PI / 4,
        rotate: Math.PI / 4
    });
    layer25D = new OMAP.Layer.NOGISLayer("25D", UICore.mapServiceUrl + "resource/", {
        isBaseLayer: true,
        transparent: true,
        defaultImage: '../script/Nogis-api/img/transparent.png',
        loadHotspot: true,
        hotspotTouch: touchHandler
    });
    var ext = new OMAP.Bounds(-56255400.354765005, -56255400.354765005, 56255400.354765005, 56255400.354765005);
    // 地图配置
    var mapOptions = {
        extent: ext,
        center: UICore.mapCenter,
        zoom: 4,
        config: config,
        resolutions: [
            107.29866095498084608,
            53.64933047749042304,
            26.82466523874521152,
            13.41233261937260576,
            6.70616630968630288,
            3.35308315484315144,
            1.67654157742157572,
            0.83827078871078786,
            0.41913539435539393
        ],
        numZoomLevels: 9,
        layers: [layer25D],
        controls: [new OMAP.Control.Navigation()]
    };
    // 初始化地图
    map = new OMAP.Map("mapDiv", mapOptions);
}

function touchHandler(e) {
    var hoverGeom = e.target;
    layer25D.hotspot.hoverlayer.removeAllFeatures();
    if (layer25D.hotspot.popup) {
        map.removePopup(layer25D.hotspot.popup);
        layer25D.hotspot.popup.destroy();
        layer25D.hotspot.popup = null;
    }
    buildId = null;
    buildName = null;
    Address = null;
    if (hoverGeom) {
        var geom = hoverGeom.geometry.clone();
        var attr = hoverGeom.attributes;
        var f = new OMAP.Feature.Vector(geom, attr, null);
        layer25D.hotspot.hoverlayer.addFeatures([f]);
        var pt = geom.getCentroid();
        //createIframePop("myPopup", '选择单元', "http://61.160.70.170:8889/unit_queryPopUnit.html?unit.entityId=" + hoverGeom.data.id + "&xCoor=" + pt.x + "&yCoor=" + pt.y, 400, 220, pt.x, pt.y, function(popup) {
        //    layer25D.hotspot.popup = popup;
        //});



        var id = hoverGeom.data.id;
        var html =
            "<div style='background-color: rgba(255, 255, 255, 1);border-radius: 5px;padding: 2px 8px 2px 8px;margin-bottom: 3px;box-shadow: inset 0 0 0 rgba(0, 0, 0, .075), 2px 2px 2px 2px rgba(51, 51, 51, 0.7);white-space: nowrap;'>" +
            hoverGeom.data.name + "</div>";
        layer25D.hotspot.popup = createPop('' + id, html, pt.x, pt.y, -30, -40);
        var wgs84pt = trans.OCN2WGS84(pt.x, pt.y);
        buildId = id;
        buildName = hoverGeom.data.name;
                api.cancelAjax({
                    tag: tag,
                });
                updateTag();
                api.ajax({
                    url: 'http://api.map.baidu.com/geocoder/v2/',
                    method: 'get',
                    tag:tag,
                    data: {
                        values: {
                            location: wgs84pt.y+","+wgs84pt.x,
                            coordtype: 'wgs84ll',
                            output: 'json',
                            ak: "4eb424fae9e47fe4549f4846791df8b6"
                        }
                    }
                }, function(ret, err) {
                    if (ret && ret.result) {
                        Address = ret.result.formatted_address;
                    } else {
                        api.alert({
                            msg: JSON.stringify(err)
                        });
                    }
                });
    }
}

function createPop(id, html, x, y, xp, yp) {
    if (map == null || typeof(map) == 'undefined') return;
    var popup = new OMAP.Popup(id,
        new OMAP.LonLat(x, y),
        new OMAP.Size(100, 100),
        html,
        false, '', xp, yp);
    popup.setBackgroundColor("transparent");
    popup.autoSize = 1;
    //popup.padding = new OMAP.Bounds(-50,0,0,-50);
    map.addPopup(popup);
    return popup;
}
var createIframePop = function(id, title, url, width, height, x, y, callback) {
    var iframe = createIFrameContent({
        url: url,
        width: width,
        height: height + 20
    }, function(iframe) {
        var popupOption = {
            id: id,
            x: x,
            y: y,
            width: width,
            height: height,
            title: title,
            contentHTML: iframe,
            closeBox: true
        };
        callback(drawPopup(popupOption));
    });
};

var createIFrameContent = function($iframeOption, callback) {
    api.ajax({
        url: '$iframeOption.url',
        method: 'get',
        tag: tag,
        dataType: 'text'
    }, function(ret, err) {
      api.alert({ msg: JSON.stringify(ret) });
        callback('<iframe frameborder="0" class="popIFrame" style="width:' +
            $iframeOption.width + 'px;height:' + $iframeOption.height + 'px;" ' +
            'src="">' + ret + '</iframe>');
    });
};
var drawPopup = function($popupOption) {
    if (map == null || typeof(map) == 'undefined') return;

    var lonLat = new OMAP.LonLat($popupOption.x, $popupOption.y);
    var titleHTML = '<div class="popTitleDiv"><label class="popTitleText">' + $popupOption.title + '</label></div>';
    var contentHTML = '<div class="popContectDiv"><label class="popContectText">' + $popupOption.contentHTML + '</label></div>';
    var classDiv = '<div class="popFrameDiv" ';
    if ($popupOption.width) {
        classDiv += 'style="width:' + $popupOption.width + ';height:' + $popupOption.height + ';" ';
    }
    classDiv += '>';

    var popup = new OMAP.Popup.CSSFramedCloud(
        "popup_" + $popupOption.id, lonLat, null,
        classDiv + titleHTML + contentHTML + '</div>',
        null, $popupOption.closeBox,
        function(evt) {
            this.destroy();
        }
    );
    map.addPopup(popup);
    return popup;
};
//var submit = document.getElementById("submit");
//submit.onclick = function() {
//mapcontainer.style.display = "none";
//buildingObj.vue.mapNum = buildId;
//buildingObj.vue.buildingName = buildName;
//buildingObj.vue.address = Address;

//}
//var mapcontainer = document.getElementById("mapcontainer");
//mapcontainer.style.display = "block";
//mapload();
