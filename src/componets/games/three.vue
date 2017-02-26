<template>
  <div id="games-three">
    <ul id="three" class="mui-table-view">
      <li class="mui-table-view-cell" v-for="three in threes">
        <div class="mui-slider-handle">
          <img :src="three.cover" id="three-img">
          <div id="three-text">
            <div class="three-location">{{three.location}}</div>
            <div class="three-time">{{three.time}}</div>
            <div class="three-status">正在比赛</div>
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
        threes: $api.getStorage('player').games.three
      }
    },
    beforeMount() {
      this.threes.forEach((three) => {
        three.cover = require('../../../src/image/activity/' + three.cover);
      })
    },
    mounted() {
      mui.init();
      let btnArr = ['确认', '取消'];
      (function ($) {
        $('#wild-items').on('tap', '.mui-btn', function (event) {
          let elem = this;
          let li = elem.parentNode.parentNode;
          mui.confirm('确认退出比赛？', '3V3', btnArr, function (e) {
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
  #games-three {
    height: 100%;
    background-color: #e7eaed;
  }
  #three-img {
    width: 4rem;
    height: 4rem;
    float: left;
    margin-right: 1rem;
  }
  #three {
    padding: 0.5rem;
  }
</style>