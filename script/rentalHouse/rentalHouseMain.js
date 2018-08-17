/**
 * Created by kevin on 2017/7/17.
 */
apiready = function() {
    console.log("dee");
    var vue = new Vue({
        el: "#list",
        data: {

        },
        methods: {
            create: function() {
                api.openWin({
                    name: 'rentalHouseCreate',
                    url: './rentalHouse.html',
                    vScrollBarEnabled:false,
                    pageParam: {
                      infos:"新增出租屋",
                      title:""
                    }
                });
            },
            query: function() {
                api.openWin({
                    name: 'rentalHouseQuery',
                    url: './queryRentalHouse.html',
                    pageParam: {
                        infos:"查询出租屋",
                    }
                });

            },
            scanCode:function(){
              var FNScanner = api.require('FNScanner');
              api.addEventListener({
                name:'pause'
              }, function(ret, err){
                FNScanner.onPause();
              });
              api.addEventListener({
                name:'resume'
              }, function(ret, err){
                FNScanner.onResume();
              });
              FNScanner.openScanner({
                autorotation: true
              }, function(ret, err) {
                if (ret) {
                    if(ret.eventType=="success"){
                      api.openWin({
                          name: 'rentalHouseaa',
                          url: './rentalHouse.html',
                          vScrollBarEnabled:false,
                          pageParam: {
                              title: "rentalHouseResults",
                              id: ret.content
                          }
                      });
                    }
                } else {
                    alert(JSON.stringify(err));
                }
              });
            },
            closeWin:function() {
                api.closeWin();
            }
        } // methods end.
    });

}
