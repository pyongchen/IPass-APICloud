<template>
  <div id="games-one">
    <ul id="one-items" class="mui-table-view">
      <li class="mui-table-view-cell" v-for="one in ones">
        <div class="mui-slider-right mui-disabled">
          <a class="mui-btn mui-btn-red">退出</a>
        </div>
        <div class="mui-slider-handle">
          <img :src="'../src/image/players/' + one.opponent.image" id="one-img">
          <div class="one-location">{{one.location}}</div>
          <div class="one-time">{{one.time}}</div>
          <div class="one-status">{{one.status}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        ones: $api.getStorage('player').games.one
      }
    },
    mounted() {
      var rong = api.require('rongCloud2');
      rong.init(function(ret, err) {
        if (ret.status == 'error')
          api.toast({ msg: err.code });
      });
      mui.init();
      (function ($) {
        let btnArr = ['确认', '取消'];
        $('#one-items').on('tap', '.mui-btn', function (event) {
          let elem = this;
          let li = elem.parentNode.parentNode;
          mui.confirm('确认退出比赛？', '单挑', btnArr, function (e) {
            if (e.index == 0) {
              li.parentNode.removeChild(li);
              // 发出退赛请求
            } else {
              setTimeout(function () {
                $.swipeoutClose(li);
              }, 0);
            }
          });
        });
      })(mui);
    }
  }
</script>
<style>
  #games-one {
    height: 100%;
    background-color: #e7eaed;
  }
  #one-img {
    width: 4rem;
    height: 4rem;
    float: left;
    margin-right: 1rem;
  }
</style>