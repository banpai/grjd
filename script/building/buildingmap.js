/**
 * Created by kevin on 2017/7/4.
 */
apiready = function() {
    new Vue({
        el: "#list",
        data: {},
        methods: {
            submit: function() {
                // alert("ss");
                //        info = {
                //		'residential_name' : '话北小区',//小区
                //		'building_number' : '1号楼',//楼号
                //		'building_id' : '4028a3875d017c50015d019ce1750003',
                //		'building_name' : '话北小区1号楼',//建筑
                //		'code' : '6103020020010092133',
                //		'xCoor': '1844588.3659804778',
                //		'yCoor': '7136055.863783754',
                //		'unit_id' : id,
                //		'unit_num' : num//单元
                //	};
                if (!buildId) {
                    buildId = "";
                    buildName = "";
                    Address = "";
                }
                api.sendEvent({
                    name: 'mapinfo',
                    extra: {
                        mapNum: buildId,
                        building_name: buildName,
                        address: Address
                    }
                });
            },
            closeWin: function() {
                api.closeWin();
            }
        }
    });
    var that = this;
    //console.log("地图编号大店");
    //console.log(mapcontainer.style.display);
    mapcontainer.style.display = "block";
    mapload();
}
