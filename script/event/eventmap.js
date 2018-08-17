/**
 * Created by kevin on 2017/7/4.
 */
apiready = function() {
    new Vue({
        el: "#list",
        data: {},
        methods: {
            submit: function() {
                console.log("ss");
                if (!coordinate) {
                    coordinate = "";
                    Address = "";
                }
                api.sendEvent({
                    name: 'eventmapinfo',
                    extra: {
                        coordinate: coordinate,
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
