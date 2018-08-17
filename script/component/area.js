apiready = function(){

    var areaList = [];
    new Vue({
        el:"#list",
        data:{
            areaItem:[],
            haveChildrenCss:'title_g2 bg_hide',
            noChildrenCss:'title_g2',
            areaSelect:[],//选中的每一级区域
            areaRouter:"", //选择的区划路径
            areaRouterArr:[],
            areaRouterArrTemp:[],
            areaCode:"",  //区域Code
            userDataAreaCode:"",//用户区域CODE
        },
        created:function(){
            this.areaRouter = api.pageParam.areaRouter;
            this.areaCode = api.pageParam.areaCode;
            var userInfo = $api.getStorage('userinf');
            if(userInfo){
                this.userDataAreaCode = userInfo.dataAreaCode;

            }
            if(!this.areaCode){
                this.areaCode = userInfo.dataAreaCode;
            }

            this.initArea();
        },
        methods:{
            closeWin:function(){
                api.closeWin();
            },
            initArea:function(){
                var _self = this;
                var userToken =  $api.getStorage('userToken');
                console.log(UICore.serviceUrl +'region/tree_list?token='+userToken);
                UICore.showLoading('加载中...', '请稍后...');
                api.ajax({
                    url: UICore.serviceUrl +'region/tree_list?token='+userToken,
                    method: 'post',
                    data: {
                    }
                },function(ret, err){
                    api.hideProgress();
                    if (ret) {
                         if(ret.success){
                           areaList = ret.list;
                           var obj = {};
                           if(_self.areaCode){
                              //_self.loadAreaByCode(areaList,_self.areaCode);
                              _self.loadParentNode(areaList,_self.areaCode);
                              _self.loadArea(areaList,_self.areaSelect[_self.areaSelect.length-1].id);
                              _self.loadAreaRouter();
                           }else{
                               obj.code = areaList[0].code;
                               obj.id = areaList[0].id;
                               obj.isParent = areaList[0].isParent;
                               obj.name = areaList[0].name;
                               obj.open = areaList[0].open;
                               obj.parentId = areaList[0].parentId;
                               if(areaList[0].children&&areaList[0].children.length>0){
                                   obj.children = true;
                               }else{
                                   obj.children = false;
                               }
                               _self.areaItem.push(obj);
                           }

                         }
                    } else {
                        alert( JSON.stringify( err ) );
                    }
                });

            },
            //递归查询用户本身的区域权限，或者已选中的区域
            loadParentNode:function(areaArr,areaCode){
                for(var num in areaArr){
                    var obj = {};
                    obj.code = areaArr[num].code;
                    obj.id = areaArr[num].id;
                    obj.isParent = areaArr[num].isParent;
                    obj.name = areaArr[num].name;
                    obj.open = areaArr[num].open;
                    obj.parentId = areaArr[num].parentId;
                    if(areaArr[num].children&&areaArr[num].children.length>0){
                        obj.children = true;
                    }else{
                        obj.children = false;
                    }
                    this.areaRouterArr.push(obj);
                    if(areaArr[num].code==areaCode){
                        var obj = {};
                        obj.code = areaArr[num].code;
                        obj.id = areaArr[num].id;
                        obj.isParent = areaArr[num].isParent;
                        obj.name = areaArr[num].name;
                        obj.open = areaArr[num].open;
                        obj.parentId = areaArr[num].parentId;
                        if(areaArr[num].children&&areaArr[num].children.length>0){
                            obj.children = true;
                        }else{
                            obj.children = false;
                        }
                        //this.areaSelect.push(obj);
                        this.areaSelect = this.areaSelect.concat(this.areaRouterArr);
                        console.log(JSON.stringify(this.areaRouterArr));
                        return this.areaRouterArr;
                        // if(areaArr[num].parentId&&areaArr[num].parentId!=0){
                        //     this.recursiveNode(areaArr,areaArr[num].parentId)
                        // }
                    }else{
                        if(areaArr[num].children&&areaArr[num].children.length>0){
                            this.loadParentNode(areaArr[num].children,areaCode);
                        }
                        this.areaRouterArr.pop();

                    }
                }
            },
            //点击返回触发的方法， 如果有上一级，则返回上一级，如果没有则退出当前页面。 如果没有区域权限返回上一级，也会退出当前页面
            areaBack:function(){
                console.log(this.areaSelect[this.areaSelect.length-1].code);
                if(this.areaSelect[this.areaSelect.length-1].code==this.userDataAreaCode){
                    api.closeWin();
                }
                this.areaItem.splice(0,this.areaItem.length);
                // if(this.areaSelect.length==1&&this.areaCode){
                //     this.loadAreaByCode(areaList,this.areaCode);
                // }else{
                //     this.loadArea(areaList,this.areaSelect[this.areaSelect.length-1].parentId);
                // }
                this.loadArea(areaList,this.areaSelect[this.areaSelect.length-1].parentId);

                this.areaSelect.splice(this.areaSelect.length-1,1);
                this.loadAreaRouter();
            },
            //选中一个区域
            choseOne:function(areaId,areaName,parentId,areaCode){
                var areaObj = {};
                areaObj.id = areaId;
                areaObj.name = areaName;
                areaObj.parentId = parentId;
                areaObj.code = areaCode;
                this.areaSelect.push(areaObj);
                this.areaItem.splice(0,this.areaItem.length);
                this.loadArea(areaList,areaId);
                this.loadAreaRouter();
            },
            //之前用的，暂时废弃
            loadAreaByCode:function(areaArr,areaCode){
                for(var num in areaArr){
                    if(areaArr[num].code==areaCode){
                        var obj = {};
                        obj.code = areaArr[num].code;
                        obj.id = areaArr[num].id;
                        obj.isParent = areaArr[num].isParent;
                        obj.name = areaArr[num].name;
                        obj.open = areaArr[num].open;
                        obj.parentId = areaArr[num].parentId;
                        if(areaArr[num].children&&areaArr[num].children.length>0){
                            obj.children = true;
                        }else{
                            obj.children = false;
                        }
                        this.areaItem.push(obj);
                        break;
                    }else{
                        if(areaArr[num].children&&areaArr[num].children.length>0){
                            this.loadAreaByCode(areaArr[num].children,areaCode);
                        }
                    }

                }
            },
            //加载下一级区域
            loadArea:function(areaArr,areaId){
                for(var num in areaArr){
                    if(areaArr[num].parentId==areaId){
                        var obj = {};
                        obj.code = areaArr[num].code;
                        obj.id = areaArr[num].id;
                        obj.isParent = areaArr[num].isParent;
                        obj.name = areaArr[num].name;
                        obj.open = areaArr[num].open;
                        obj.parentId = areaArr[num].parentId;
                        if(areaArr[num].children&&areaArr[num].children.length>0){
                            obj.children = true;
                        }else{
                            obj.children = false;
                        }
                        this.areaItem.push(obj);
                    }else{
                        if(areaArr[num].children&&areaArr[num].children.length>0){
                            this.loadArea(areaArr[num].children,areaId);
                        }
                    }

                }
            },
            //加载区域中文路径
            loadAreaRouter:function(){
                this.areaRouter = "";
                for(var num in this.areaSelect){
                    if(this.areaRouter){
                        this.areaRouter += "/"+this.areaSelect[num].name;
                    }else{
                        this.areaRouter += this.areaSelect[num].name;
                    }
                }
            },
            //点击提交
            save:function(areaId,areaName,parentId,areaCode){
                var areaTemp = {};
                areaTemp.id=areaCode;
                areaTemp.name = "";
                for(var num in this.areaSelect){
                    if(areaTemp.name){
                        areaTemp.name += "/"+this.areaSelect[num].name;
                    }else{
                      areaTemp.name += this.areaSelect[num].name;
                    }
                }
                if(areaTemp.name){
                    areaTemp.name += "/"+areaName;
                }else{
                  areaTemp.name += areaName;
                }
                api.sendEvent({
                    name: 'areaSelect',
                    extra: {
                        areaTemp: areaTemp
                    }
                });
                api.closeWin();

            },
            //点击提交
            saveArea:function(){
                if(this.areaSelect.length==0){
                    alert("至少选择一级");
                    return;
                }
                var areaTemp = {};
                areaTemp.id=this.areaSelect[this.areaSelect.length-1].code;
                areaTemp.name = "";
                for(var num in this.areaSelect){
                    if(areaTemp.name){
                        areaTemp.name += "/"+this.areaSelect[num].name;
                    }else{
                      areaTemp.name += this.areaSelect[num].name;
                    }
                }
                api.sendEvent({
                    name: 'areaSelect',
                    extra: {
                        areaTemp: areaTemp
                    }
                });
                api.closeWin();
            }
        },
        components:{
          "form-item":{
            template:"#item-element", //模版内容
            props:["titlename","dataarr","isshow"],
            data:function(){
              return{
                itemclassA:"title_g2",
                itemclassB:"bg_hide"
              }
            },
            methods:{
            },
          },
        }
    });

}
