(function(window) {
    CommonList = function() {};
    CommonList.prototype = {
        userToken:"",
        totalCount:0,
        refresh:false,
        isFirst:true,
        appendData:[],
        UIListView:{},
        items:[],
        slideBtn:[],
        slideBtnDetail:[],
        loadList:function(config){
            this.userToken =  $api.getStorage('userToken');
            setTimeout(function(){
              this.initListData(config)
            }.bind(this),100)



        },
        //初始化
        initListData:function(config){
            if(config.params.dataAreaCode&&config.params.dataAreaCode=="610400"){
                config.params.dataAreaCode = "6104";
            }
            console.log(JSON.stringify(config.params));
            var _self = this;
            console.log(UICore.serviceUrl + config.url);
            UICore.showLoading('加载数据中...', '请稍等...');
            api.ajax({
                url: UICore.serviceUrl + config.url,
                method: 'post',
                data:{
                    values:config.params
                }
            },function(ret, err){
                api.hideProgress();
                if(_self.refresh){
                  _self.items = [];
                }
                if(config.params.pageIndex==1){
                  _self.items = [];
                }
                if(ret){
                    if(ret.success){
                        _self.totalCount = ret.pageInfo.pageCount;
                        if(ret.list){
                          if(_self.isFirst){
                              //加载侧滑按钮
                              for(var btn in config.toolbar){
                                  if(config.toolbar[btn].authority&&config.toolbar[btn].slide){
                                      var slideObj = {};

                                      slideObj.bgColor = config.toolbar[btn].slideCss&&config.toolbar[btn].slideCss.bgColor?config.toolbar[btn].slideCss.bgColor:'#FF0000';
                                      slideObj.activeBgColor = '';
                                      slideObj.width = config.toolbar[btn].slideCss&&config.toolbar[btn].slideCss.width?config.toolbar[btn].slideCss.width:70;
                                      slideObj.title = config.toolbar[btn].text;
                                      slideObj.titleSize = config.toolbar[btn].slideCss&&config.toolbar[btn].slideCss.titleSize?config.toolbar[btn].slideCss.titleSize:12,
                                      slideObj.titleColor = config.toolbar[btn].slideCss&&config.toolbar[btn].slideCss.titleColor?config.toolbar[btn].slideCss.titleColor:'#fff';
                                      slideObj.icon = '';
                                      slideObj.iconWidth = 20;
                                      _self.slideBtn.push(slideObj);

                                      _self.slideBtnDetail.push(config.toolbar[btn]);
                                  }
                              }
                          }
                          var tempList = [];
                          for(var num in ret.list){
                              //加载数据，组成组件需要的格式，因为每一个item只能有两行，所以暂时不用写成动态加载，写死即可
                              var obj = {};
                              obj.json = ret.list[num];
                              // for(var col in config.column){
                              //   if(config.column[col].formatter){
                              //         ret.list[num][config.column[col].name] = config.column[col].formatter(ret.list[num][config.column[col].name]);
                              //     }
                              // }
                              obj.imgPath = config.dataImgPath;
                              var tempTitle = config.column[1].formatter?config.column[1].formatter(ret.list[num][config.column[1].name]):ret.list[num][config.column[1].name];
                              var tempSubTitle = config.column[2].formatter?config.column[2].formatter(ret.list[num][config.column[2].name]):ret.list[num][config.column[2].name];
                              var tempSubTitleRight = config.column[3].formatter?config.column[3].formatter(ret.list[num][config.column[3].name]):ret.list[num][config.column[3].name];
                              if(tempTitle){
                                  obj.title = config.column[0].formatter?config.column[0].formatter(ret.list[num][config.column[0].name]):ret.list[num][config.column[0].name] + '('+tempTitle+')';
                              }else{
                                  obj.title = config.column[0].formatter?config.column[0].formatter(ret.list[num][config.column[0].name]):ret.list[num][config.column[0].name];
                              }

                              obj.subTitle =  config.column[2].label+':'+tempSubTitle+' | '+config.column[3].label+':'+tempSubTitleRight;
                              obj.rightBtns = _self.slideBtn;

                              tempList.push(obj);
                          }
                          _self.appendData = tempList;
                          _self.items = _self.items.concat(tempList);
                          if(_self.isFirst){
                              // for(var btn in config.toolbar){
                              //     if(config.toolbar[btn].authority&&config.toolbar[btn].slide){
                              //         var slideObj = {};
                              //
                              //         slideObj.bgColor = config.toolbar[btn].slideCss&&config.toolbar[btn].slideCss.bgColor?config.toolbar[btn].slideCss.bgColor:'#FF0000';
                              //         slideObj.activeBgColor = '';
                              //         slideObj.width = config.toolbar[btn].slideCss&&config.toolbar[btn].slideCss.width?config.toolbar[btn].slideCss.width:70;
                              //         slideObj.title = config.toolbar[btn].text;
                              //         slideObj.titleSize = config.toolbar[btn].slideCss&&config.toolbar[btn].slideCss.titleSize?config.toolbar[btn].slideCss.titleSize:12,
                              //         slideObj.titleColor = config.toolbar[btn].slideCss&&config.toolbar[btn].slideCss.titleColor?config.toolbar[btn].slideCss.titleColor:'#fff';
                              //         slideObj.icon = '';
                              //         slideObj.iconWidth = 20;
                              //         _self.slideBtn.push(slideObj);
                              //
                              //         _self.slideBtnDetail.push(config.toolbar[btn]);
                              //     }
                              // }
                              _self.listModule(config,_self);
                              _self.isFirst = false;
                          }else if(_self.refresh){
                              _self.refresh = false;
                              _self.refreshListData();
                          }else{
                              _self.appendListData();
                          }

                        }

                        // for(var num in ret.data){
                        //     _self.items.push(ret.data[num])
                        // }
                    }else{
                        alert(ret.errorinfo);
                    }
                }else{
                    alert(JSON.stringify(err))
                }
            });
        },
        //加载列表组件
        listModule:function(config){
            var _self = this;
            this.UIListView = api.require('UIListView');
            var y = 60;
            //是否有新增的权限，有则显示新增按钮
            if(config.addAuth){
              y = 110;
            }
            if(config.bindAuth){
                y += 60;
            }
            this.UIListView.open({
                rect: {
                    x: 0,
                    y: y,
                    w: api.winWidth,
                    h: api.frameHeight
                },
                data: this.items,

               rightBtns:this.slideBtn,
                styles: {
                    borderColor: '#dddddd',
                    item: {
                        bgColor: '#ffffff',
                        activeBgColor: '#F5F5F5',
                        height: 65.0,
                        imgWidth: 40,
                        imgHeight: 40,
                        imgCorner: 4,
                        placeholderImg: '',
                        titleSize: 14.0,
                        titleColor: '#000',
                        subTitleSize: 12.0,
                        subTitleColor: '#7d7d7d',
                        remarkColor: '#000',
                        remarkSize: 16,
                        remarkIconWidth: 30
                    }
                },
                fixedOn: api.frameName
            }, function(ret, err) {
                if (ret) {
                    console.log(JSON.stringify(ret));
                    if(ret.eventType=="clickRightBtn"){
                        var dataIndex = ret.index;
                        var btnIndex = ret.btnIndex;
                        for(var key in _self.slideBtnDetail[btnIndex]){
                            if(typeof(_self.slideBtnDetail[btnIndex][key])=="function"){
                                if(_self.slideBtnDetail[btnIndex].confirm&&_self.slideBtnDetail[btnIndex].confirm.isConfirm){
                                  var dialogBox = api.require('dialogBox');
                                  dialogBox.alert({
                                      texts: {
                                          title: "提示",
                                          content: _self.slideBtnDetail[btnIndex].confirm.confirmMsg,
                                          leftBtnTitle: '取消',
                                          rightBtnTitle: '确认'
                                      },
                                      styles: {
                                          bg: '#fff',
                                          w: 300,
                                          title: {
                                              marginT: 20,
                                              icon: '',
                                              iconSize: 40,
                                              titleSize: 14,
                                              titleColor: '#000'
                                          },
                                          content: {
                                              color: '#000',
                                              size: 14
                                          },
                                          left: {
                                              marginB: 7,
                                              marginL: 20,
                                              w: 130,
                                              h: 35,
                                              corner: 2,
                                              bg: '#87CEFA',
                                              size: 12
                                          },
                                          right: {
                                              marginB: 7,
                                              marginL: 10,
                                              w: 130,
                                              h: 35,
                                              corner: 2,
                                              bg: '#87CEFA',
                                              size: 12
                                          }
                                      }
                                  }, function(ret) {
                                      dialogBox.close({
                                        dialogName: 'alert'
                                      });
                                      if (ret.eventType == 'right') {
                                          _self.slideBtnDetail[btnIndex][key].apply(this,[_self.items[dataIndex].json,dataIndex])
                                      }
                                  });
                                }else{
                                    _self.slideBtnDetail[btnIndex][key].apply(this,[_self.items[dataIndex].json,dataIndex])
                                }

                            }
                        }
                        // if(_self.slideBtnDetail.length<=btnIndex){
                        //     alert("侧滑按钮下标越界，请检测")
                        // }else{
                        //     if(_self.slideBtnDetail[btnIndex].router){
                        //         var routerPath = _self.slideBtnDetail[btnIndex].router.split("/")
                        //         var winname = routerPath[routerPath.length-1].split(".")[0];
                        //         api.openWin({
                        //             name:winname,
                        //             url: _self.slideBtnDetail[btnIndex].router,
                        //             pageParam: {
                        //                 name: _self.items[dataIndex].json;
                        //             }
                        //         });
                        //
                        //     }else if(_self.slideBtnDetail[btnIndex].url){
                        //         if(_self.slideBtnDetail[btnIndex].confirm&&_self.slideBtnDetail[btnIndex].isConfirm){
                        //             var dialogBox = api.require('dialogBox');
                        //             dialogBox.alert({
                        //                 texts: {
                        //                     title: "提示",
                        //                     content: "确定要删除这条数据吗？",
                        //                     leftBtnTitle: '取消',
                        //                     rightBtnTitle: '确认'
                        //                 },
                        //                 styles: {
                        //                     bg: '#fff',
                        //                     w: 300,
                        //                     title: {
                        //                         marginT: 20,
                        //                         icon: '',
                        //                         iconSize: 40,
                        //                         titleSize: 14,
                        //                         titleColor: '#000'
                        //                     },
                        //                     content: {
                        //                         color: '#000',
                        //                         size: 14
                        //                     },
                        //                     left: {
                        //                         marginB: 7,
                        //                         marginL: 20,
                        //                         w: 130,
                        //                         h: 35,
                        //                         corner: 2,
                        //                         bg: '#87CEFA',
                        //                         size: 12
                        //                     },
                        //                     right: {
                        //                         marginB: 7,
                        //                         marginL: 10,
                        //                         w: 130,
                        //                         h: 35,
                        //                         corner: 2,
                        //                         bg: '#87CEFA',
                        //                         size: 12
                        //                     }
                        //                 }
                        //             }, function(ret) {
                        //                 dialogBox.close({
                        //                   dialogName: 'alert'
                        //                 });
                        //                 if (ret.eventType == 'right') {
                        //                     api.ajax({
                        //                         url: UICore.serviceUrl + _self.slideBtnDetail[btnIndex].url + '?token='+this.userToken,
                        //                         method: 'post',
                        //                         data: {
                        //                             values: {
                        //                                 ids: _self.items[dataIndex].json.id
                        //                             }
                        //                         }
                        //                     },function(ret, err){
                        //                         if (ret) {
                        //                             alert( JSON.stringify( ret ) );
                        //                         } else {
                        //                             alert( JSON.stringify( err ) );
                        //                         }
                        //                     });
                        //
                        //                 }
                        //             });
                        //         }else{
                        //             api.ajax({
                        //                 url: UICore.serviceUrl + _self.slideBtnDetail[btnIndex].url + '?token='+this.userToken,
                        //                 method: 'post',
                        //                 data: {
                        //                     values: {
                        //                         ids: _self.items[dataIndex].json.id
                        //                     }
                        //                 }
                        //             },function(ret, err){
                        //                 if (ret) {
                        //                     alert( JSON.stringify( ret ) );
                        //                 } else {
                        //                     alert( JSON.stringify( err ) );
                        //                 }
                        //             });
                        //         }
                        //
                        //     }
                        //
                        // }
                    }else if(ret.eventType=="clickContent"){
                        var dataIndex = ret.index;
                        for(var num in config.toolbar){
                            if(config.toolbar[num].clickListItem){
                                for(var key in config.toolbar[num]){
                                    if(typeof(config.toolbar[num][key])=="function"){
                                        config.toolbar[num][key].apply(this,[_self.items[dataIndex].json,dataIndex])
                                    }
                                }
                            }
                        }
                    }
                } else {
                    alert(JSON.stringify(err));
                }
            });
            this.UIListView.setRefreshHeader({
                loadingImg: 'widget://res/UIListView_arrow.png',
                bgColor: '#F5F5F5',
                textColor: '#8E8E8E',
                textDown: '下拉可以刷新...',
                textUp: '松开开始刷新...',
                showTime: true
            }, function(ret, err) {
                if (ret) {
                    _self.refresh = true;
                    config.params.pageIndex = 1;
                    _self.initListData(config);
                } else {
                    alert(JSON.stringify(err));
                }
            });
            this.UIListView.setRefreshFooter({
                loadingImg: 'widget://res/UIListView_arrow.png',
                bgColor: '#F5F5F5',
                textColor: '#8E8E8E',
                textUp: '上拉加载更多...',
                textDown: '松开开始加载...',
                showTime: true
            }, function(ret, err) {
                if (ret) {
                    if(config.params.pageIndex<_self.totalCount-1){
                        config.params.pageIndex++;
                        _self.initListData(config);
                    }else{
                        _self.UIListView.appendData();
                        alert("没有更多数据了");
                    }

                } else {
                    alert(JSON.stringify(err));
                }
            });

        },
        //加载下一页，则追加数据
        appendListData:function(){
            this.UIListView.appendData({
                data: this.appendData
            }, function(ret, err) {
                if (ret) {

                } else {
                    alert(JSON.stringify(err));
                }
            });
        },
        //刷新列表
        refreshListData:function(){
            this.UIListView.reloadData({
                data: this.appendData
            }, function(ret) {
                if (ret) {

                } else {
                    alert(JSON.stringify(err));
                }
            });
        },
        //删除数据
        deleteItem:function(dataIndex){
            this.UIListView.deleteItem({
                index: dataIndex
            }, function(ret, err) {
                if (ret) {
                    console.log(JSON.stringify(ret));
                } else {
                    alert(JSON.stringify(err));
                }
            });
        },
        //更新数据
        updateItem:function(dataObj,tempobj,dataIndex){
            var _self = this;
            this.UIListView.updateItem({
                index: dataIndex,
                data: tempobj
            }, function(ret, err) {
                if (ret) {
                      _self.items[dataIndex].json = dataObj;
                } else {
                    alert(JSON.stringify(err));
                }
            });
        },
        //编辑完数据后，因为没有刷新列表，所以需要更新被修改的那一行数据的JSON
        updateJson:function(dataObj,index){
            //var dataObj = ret.value.dataObj;
            // for(var col in _self.config.column){
            //   if(_self.config.column[col].formatter){
            //         dataObj[_self.config.column[col].name] = _self.config.column[col].formatter(dataObj[_self.config.column[col].name]);
            //     }
            // }
            var _self = this;
            var tempTitle = _self.config.column[1].formatter?_self.config.column[1].formatter(dataObj[_self.config.column[1].name]):dataObj[_self.config.column[1].name];
            var tempSubTitle = _self.config.column[2].formatter?_self.config.column[2].formatter(dataObj[_self.config.column[2].name]):dataObj[_self.config.column[2].name];
            var tempSubTitleRight = _self.config.column[3].formatter?_self.config.column[3].formatter(dataObj[_self.config.column[3].name]):dataObj[_self.config.column[3].name];

            var tempobj = {};
            tempobj.imgPath = _self.config.dataImgPath;
            if(tempTitle){
                tempobj.title = dataObj[_self.config.column[0].name] + '('+tempTitle+')';
            }else{
                tempobj.title = dataObj[_self.config.column[0].name] ;
            }

            tempobj.subTitle =  _self.config.column[2].label+':'+tempSubTitle+' | '+_self.config.column[3].label+':'+tempSubTitleRight;
            tempobj.json = dataObj;
            CommonList.updateItem(dataObj,tempobj,index);
        },
    }
    window.CommonList = new CommonList();

})(window)
