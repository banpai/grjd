/**
 * Created by kevin on 2017/6/26.
 */
apiready = function () {
  var accountId = $api.getStorage('userinf').accountId;
  new Vue({
    el: "#list",
    mixins: [ocnFormMix],
    data: function () {
      return {
        f: {},
        show: [],
        editFlag: true,
        set: {
          // 配置date日期年月日
          dateFlag: 'yearMouthDay'
        },
        title: api.pageParam.item.name
      }
    },
    created: function () {
      this.isData();
    },
    methods: {
      // 判断类别
      isData: function () {
        var f = {};
        var show = [];
        var pinUrl = '';
        if (api.pageParam.item.name == '法轮功人员' || api.pageParam.item.name == '邪教人员') {
          f = cult.f;
          show = cult.show;
          pinUrl =  UICore.serviceUrl + '/mobile/mobileHeresy.shtml?act=getDetailInfo&data=';
        } else if (api.pageParam.item.name == '精神障碍人员') {
          f = mentalDisorder.f;
          show = mentalDisorder.show;
          pinUrl =  UICore.serviceUrl + '/mobile/mobilementalDisorders.shtml?act=getDetailInfo&data=';
        }
        this.f = f;
        this.show = show;
        var that = this;
        if (api.pageParam.id) {
          var url = pinUrl + JSON.stringify({
            spId: api.pageParam.id,
            accountId: accountId
          });
          this.getDetailData(url, function(r){
            if(!r.data.coordinate){
              r.data.coordinate = '';
            }
            that.f = r.data;
            that.editFlag = false;
          });
        }
      },
      // 查询详情数据
      getDetailData: function (url, cb) {
        UICore.showLoading("列表加载中...", "请稍候");
        var that = this;
        api.ajax({
          url: url,
          method: 'post',
        }, function (ret, err) {
          api.hideProgress();
          cb && cb(ret);
        });
      },
      // 提交按钮
      uploadAttach: function () {
        this.$refs.ocnForm.validate();
      },
      // 提交数据
      submit: function (r) {
        r.dataAreaCode = $api.getStorage('userinf').dataAreaCode;
        var pinUrl = '';
        if (api.pageParam.item.name == '法轮功人员' || api.pageParam.item.name == '邪教人员') {
          pinUrl =  UICore.serviceUrl + '/mobile/mobileHeresy.shtml?act=addOrEdit&data=' + JSON.stringify({
            heresyVo: r
          });
        } else if (api.pageParam.item.name == '精神障碍人员') {
          pinUrl =  UICore.serviceUrl + 'mobile/mobilementalDisorders.shtml?act=addOrEdit&data=' + JSON.stringify({
            mentalDisordersVo: r
          });
        }
        api.ajax({
          url:  pinUrl,
          method: 'post',
        }, function (ret, err) {
          if (ret) {
            if (ret.success) {
              api.toast({
                msg: '保存成功',
                duration: 3000,
                global: 'true',
                location: 'bottom'
              });
              api.sendEvent({
                name: 'refreshResultList',
                extra: {
                  myJson: r
                }
              });
              api.closeWin();
            } else {
              alert(ret.errorinfo);
            }
          } else {
            alert(JSON.stringify(err));
          }
        });
      }
    }
  });
}
