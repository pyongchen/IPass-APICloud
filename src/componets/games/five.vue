<template>
  <div id="games-five">
    <ul id="five" class="mui-table-view">
      <li class="mui-table-view-cell" v-for="five in fives">
        <div class="mui-slider-handle">
          <img :src="five.cover" id="five-img">
          <div id="five-text">
            <div class="five-location">{{five.location}}</div>
            <div class="five-time">{{five.time}}</div>
            <div class="five-status">正在比赛</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        fives: $api.getStorage('player').games.five
      }
    },
    beforeMount() {
      this.fives.forEach((five) => {
        five.cover = require('../../../src/image/activity/' + five.cover);
      })
    },
    mounted() {
      mui.init();
      let btnArr = ['确认', '取消'];
      (function ($) {
        $('#wild-items').on('tap', '.mui-btn', function (event) {
          let elem = this;
          let li = elem.parentNode.parentNode;
          mui.confirm('确认退出比赛？', '5V5', btnArr, function (e) {
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
  #games-five {
    height: 100%;
    background-color: #e7eaed;
  }
  #five-img {
    width: 4rem;
    height: 4rem;
    float: left;
    margin-right: 1rem;
  }
  #five {
    padding: 0.5rem;
  }
</style>