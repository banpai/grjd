apiready = function(){
    new Vue({
        el:"#all_con",
        data:{
            userToken:"",
            totalCount:0,
            refresh:false,
            isFirst:true,
            appendData:[],
            UIListView:{},
            items:[],
            slideBtn:[],
            slideBtnDetail:[],
            config:{
                url:"/basic_population/list_page_specl",
                params: {followStatus:1,keyword:"",pageIndex:0,pageSize:15,dataAreaCode:"6104"},  //查询参数
                title:"基础人口列表",
                dataImgPath:"widget://image/me/my_info.png",
                receiveEvent:"",
                column:[
                    {
                        label:"姓名",
                        name:'name'
                    },
                    {
                        label:"身份证号",
                        name:'idNumber'
                    },
                    {
                        label:"出生日期",
                        name:'birthday',
                        formatter:(value)=>{
                            value = value.substring(0,10);
                            return value;
                        }
                    },
                    {
                        label:"联系方式",
                        name:'tel'
                    }
                ],
                toolbar:[
                    {
                        text:"新增",
                        flag:"add",
                        authority:true,
                        router:"../realPopulation/addBasePopulation.html"
                    },
                    {
                        text:"编辑",
                        flag:"edit",
                        authority:true,
                        clickListItem:true,
                        router:"../realPopulation/addBasePopulation.html"
                    },
                    {
                        text:"删除",
                        flag:"delete",
                        authority:true,
                        slide:true,
                        confirm:{
                            isConfirm:true,
                            confirmMsg:"确定删除该条数据吗?"
                        },
                        router:"",
                        url:"/basic_population/delete_by_ids"
                    },
                ]
            }
        },
        created:function(){
            if(this.config.receiveEvent){
                api.addEventListener({
                    name: this.config.receiveEvent
                }, function(ret, err){
                    if( ret ){
                         alert( JSON.stringify( ret ) );
                    }else{
                         alert( JSON.stringify( err ) );
                    }
                });

            }
            this.userToken =  $api.getStorage('userToken');
            this.initListData();
        },
        methods:{
            initListData:function(){
                console.log(JSON.stringify(this.config.params));
                var _self = this;
                console.log(UICore.serviceUrl + this.config.url + '?token='+this.userToken);
                UICore.showLoading('加载数据中...', '请稍等...');
                api.ajax({
                    url: UICore.serviceUrl + this.config.url + '?token='+this.userToken,
                    method: 'post',
                    data:{
                        values:this.config.params
                    }
                },function(ret, err){
                    api.hideProgress();

                    if(_self.refresh){
                      _self.items = [];
                    }
                    if(_self.config.params.pageIndex==0){
                      _self.items = [];
                    }
                    if(ret){
                        if(ret.success){
                            _self.totalCount = ret.pageInfo.pageCount;
                            if(ret.list){
                              var tempList = [];
                              for(var num in ret.list){
                                  for(var col in _self.config.column){
                                    if(_self.config.column[col].formatter){
                                          ret.list[num][_self.config.column[col].name] = _self.config.column[col].formatter(ret.list[num][_self.config.column[col].name]);
                                      }
                                  }
                                  var obj = {};
                                  obj.imgPath = _self.config.dataImgPath;
                                  obj.title = ret.list[num][_self.config.column[0].name] + '('+ret.list[num][_self.config.column[1].name]+')';
                                  obj.subTitle =  _self.config.column[2].label+':'+ret.list[num][_self.config.column[2].name]+' | '+_self.config.column[3].label+':'+ret.list[num][_self.config.column[3].name];
                                  obj.json = ret.list[num];
                                  tempList.push(obj);
                              }
                              _self.appendData = tempList;
                              _self.items = _self.items.concat(tempList);
                              if(_self.isFirst){
                                  for(var btn in _self.config.toolbar){
                                      if(_self.config.toolbar[btn].authority&&_self.config.toolbar[btn].slide){
                                          var slideObj = {};

                                          slideObj.bgColor = '#FF0000';
                                          slideObj.activeBgColor = '';
                                          slideObj.width = 70;
                                          slideObj.title = _self.config.toolbar[btn].text;
                                          slideObj.titleSize = 12,
                                          slideObj.titleColor = '#fff';
                                          slideObj.icon = '';
                                          slideObj.iconWidth = 20;
                                          _self.slideBtn.push(slideObj);

                                          slideBtnDetail.push(_self.config.toolbar[btn]);
                                      }
                                  }
                                  _self.listModule();
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
            listModule:function(){
                var _self = this;
                this.UIListView = api.require('UIListView');
                this.UIListView.open({
                    rect: {
                        x: 0,
                        y: 60,
                        w: api.winWidth,
                        h: api.frameHeight
                    },
                    data: this.items,

                   rightBtns:this.slideBtn,
                    styles: {
                        borderColor: '#696969',
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
                        if(ret.eventType=="clickRightBtn"){
                            var dataIndex = ret.index;
                            var btnIndex = ret.btnIndex;
                            if(_self.slideBtnDetail.length<=btnIndex){
                                alert("侧滑按钮下标越界，请检测")
                            }else{
                                if(_self.slideBtnDetail[btnIndex].router){
                                    var routerPath = _self.slideBtnDetail[btnIndex].router.split("/")
                                    var winname = routerPath[routerPath.length-1].split(".")[0];
                                    api.openWin({
                                        name:winname,
                                        url: _self.slideBtnDetail[btnIndex].router,
                                        pageParam: {
                                            name: _self.items[dataIndex].json;
                                        }
                                    });

                                }else if(_self.slideBtnDetail[btnIndex].url){
                                    if(_self.slideBtnDetail[btnIndex].confirm&&_self.slideBtnDetail[btnIndex].isConfirm){
                                        var dialogBox = api.require('dialogBox');
                                        dialogBox.alert({
                                            texts: {
                                                title: "提示",
                                                content: "确定要删除这条数据吗？",
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
                                                api.ajax({
                                                    url: UICore.serviceUrl + _self.slideBtnDetail[btnIndex].url + '?token='+this.userToken,
                                                    method: 'post',
                                                    data: {
                                                        values: {
                                                            ids: _self.items[dataIndex].json.id
                                                        }
                                                    }
                                                },function(ret, err){
                                                    if (ret) {
                                                        alert( JSON.stringify( ret ) );
                                                    } else {
                                                        alert( JSON.stringify( err ) );
                                                    }
                                                });

                                            }
                                        });
                                    }else{
                                        api.ajax({
                                            url: UICore.serviceUrl + _self.slideBtnDetail[btnIndex].url + '?token='+this.userToken,
                                            method: 'post',
                                            data: {
                                                values: {
                                                    ids: _self.items[dataIndex].json.id
                                                }
                                            }
                                        },function(ret, err){
                                            if (ret) {
                                                alert( JSON.stringify( ret ) );
                                            } else {
                                                alert( JSON.stringify( err ) );
                                            }
                                        });
                                    }

                                }

                            }
                        }else if(ret.eventType=="clickContent"){
                            var dataIndex = ret.index;
                            for(var num in _self.config.toolbar){
                                if(_self.config.toolbar[num].clickListItem){
                                    if(_self.config.toolbar[num].router){
                                        var routerPath = _self.config.toolbar[num].router.split("/")
                                        var winname = routerPath[routerPath.length-1].split(".")[0];
                                        api.openWin({
                                            name:winname,
                                            url: _self.config.toolbar[num].router,
                                            pageParam: {
                                                name: _self.items[dataIndex].json;
                                            }
                                        });
                                    }else if(_self.config.toolbar[num].url){

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
                        _self.config.params.pageIndex = 0;
                        _self.initListData();
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
                        if(_self.config.params.pageIndex<_self.totalCount-1){
                            _self.config.params.pageIndex++;
                            _self.initListData();
                        }else{
                            _self.UIListView.appendData();
                            alert("没有更多数据了");
                        }

                    } else {
                        alert(JSON.stringify(err));
                    }
                });

            },
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
            closeWin:function(){

            },
            search:function(){

            }
        }
    });
}
