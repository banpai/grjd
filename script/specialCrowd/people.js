/**
 * Created by kevin on 2017/7/18.
 */
apiready = function () {

  new Vue({
    el: "#list",
    data: {
      isshow: false,
      isSlideInDown: false,
      params: {},
    },
    created: function () {
      // 获取精神障碍人员列表
      this.params = api.pageParam;
      this.openFrame();
      var container = $api.dom(".wrapper");
      $api.css(container, 'display:block');
      api.hideProgress();
    },
    methods: {
      openFrame: function () {
        api.openFrame({
          name: 'peopleList',
          url: './peopleList.html',
          vScrollBarEnabled: false,
          rect: {
            x: 0,
            y: $api.dom('.header').offsetHeight,
            w: api.winWidth,
            h: api.winHeight - $api.dom('.header').offsetHeight
          },
          pageParam: {
            params: this.params
          },
          bounces: true,
          reload: true,
        });
      },
      // 新增帮扶记录
      search: function () {
        var that = this;
        api.openWin({
          name: 'rentalSpecialCrowd',
          url: './rentalSpecialCrowd.html',
          vScrollBarEnabled: false,
          pageParam: {
            title: "rentalSpecialCrowd",
            people: that.params
          }
        });
      },
      closeWin: function () {
        if (this.isshow == true) {
          this.isshow = false;
          UICore.sendEvent("searchHouse", false)
        } else {
          api.closeWin();
        }
      }
    }
  }) //vue end
}
