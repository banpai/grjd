apiready = function(){
    new Vue({
        el:"#search_box",
        data:{
            items:[],
            eventName:"",
            userDataAreaCode:"",
            params:{
              areaName:""
            }
        },
        created:function(){
            // var userInfo = $api.getStorage('userinf');
            // this.userDataAreaCode = "6104";
            // if(userInfo){
            //     this.userDataAreaCode = userInfo.dataAreaCode;
            //     if(this.userDataAreaCode=="6104"){
            //         this.userDataAreaCode="610400";
            //     }
            // }
            var searchBox = api.pageParam.searchBox;
            this.eventName = api.pageParam.eventName;
            console.log(JSON.stringify(searchBox));
            for(var num in searchBox){
                if(searchBox[num].type=="select"){
                    this.$set(this.params, searchBox[num].name,{});
                    var defaultObj = {"key":"","value":""};
                    for(arr in searchBox[num].values){
                        if(searchBox[num].values[arr].default){
                          defaultObj.key = searchBox[num].values[arr].key;
                          defaultObj.value = searchBox[num].values[arr].text;
                          break;
                        }
                    }
                    this.$set(this.params[searchBox[num].name],"key",defaultObj.key);
                    this.$set(this.params[searchBox[num].name],"value",defaultObj.value);
                }else{
                    this.$set(this.params, searchBox[num].name,"");
                }
                console.log(JSON.stringify(this.params));
                this.items.push(searchBox[num]);
            }
        },
        methods:{
            //选择行政区划
            selectArea:function(){
                var _self = this;
                api.addEventListener({
                    name: 'areaSelect'
                }, function(ret, err){
                    if( ret ){
                          console.log(JSON.stringify( ret ));
                         _self.params.dataAreaCode = ret.value.areaTemp.id; //值是dataAreaCode
                         _self.params.areaName = ret.value.areaTemp.name;
                    }else{
                         alert( JSON.stringify( err ) );
                    }
                });

                api.openWin({
                    name: 'selectArea',
                    vScrollBarEnabled: false,
                    url: './area.html',
                    pageParam: {
                        areaRouter: _self.params.areaName,
                        areaCode:_self.params.dataAreaCode
                    }
                });
            },
            selectClick:function(arr,column){
                for(var num in arr){
                  if(arr[num].key==this.params[column].key){
                      arr[num].status="selected";
                  }
                }
                UICore.openCheckBox(arr,this.params[column]);
            },
            queryClick:function(){
                var obj = {};
                for(var key in this.params){
                    console.log(typeof(this.params[key]));
                    if(key!="areaName"){
                        if(typeof(this.params[key])=="object"){
                          obj[key] = this.params[key].key;
                        }else{
                          obj[key] = this.params[key];
                        }
                    }

                }
                console.log(JSON.stringify(obj));
                api.closeDrawerPane();
                api.sendEvent({
                    name: this.eventName,
                    extra: {
                        queryObj: obj
                    }
                });

            }
        },
        components:{
            "myelement":{
              template:"#item-element", //模版内容
              props:["actioname","myclass"]
            }
        },
    });
}
