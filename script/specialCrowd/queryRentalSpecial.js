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
          name: 'rentalHouseResults',
          url: './rentalHouseResults.html',
          vScrollBarEnabled: false,
          rect: {
            x: 0,
            y: $api.dom('.header').offsetHeight,
            w: api.winWidth,
            h: api.winHeight - $api.dom('.header').offsetHeight
          },
          pageParam: {
            from: this.params.from,
            item: this.params.item
          },
          bounces: true,
          reload: true,
        });
      },
      search: function () {
        this.isshow = true;
        UICore.sendEvent("searchHouse", true);
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
