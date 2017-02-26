<template>
  <div id="games-wild">
    <ul id="wild" class="mui-table-view">
      <li class="mui-table-view-cell wild-item" v-for="wild in wilds">
        <div class="mui-slider-handle">
          <img :src="wild.cover" id="wild-img">
          <div id="wild-text">
            <div class="wild-location">{{wild.location}}</div>
            <div class="wild-time">{{wild.time}}</div>
            <div class="wild-status">正在比赛</div>
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
        wilds: $api.getStorage('player').games.wild
      }
    },
    beforeMount() {
      this.wilds.forEach((wild) => {
        wild.cover = require('../../../src/image/activity/' + wild.cover);
      })
    },
    mounted() {
      mui.init();
      let btnArr = ['确认', '取消'];
      (function ($) {
        $('#wild-items').on('tap', '.mui-btn', function (event) {
          let elem = this;
          let li = elem.parentNode.parentNode;
          mui.confirm('确认退出比赛？', '野球', btnArr, function (e) {
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
  #games-wild {
    height: 100%;
    background-color: #e7eaed;
  }
  #wild-img {
    width: 4rem;
    height: 4rem;
    float: left;
    margin-right: 1rem;
  }
  #wild {
    padding: 0.5rem;
  }
</style>