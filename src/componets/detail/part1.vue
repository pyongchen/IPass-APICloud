<template>
  <div id="grade">
    <ul class="aui-list aui-list-in">
      <li id="title">战绩</li>
      <li class="aui-list-item" v-for="(val, key) in types">
        <div class="aui-list-item-inner">
          <div :id="key">
            <span class="type">{{val}}</span>
            <div :id="key + '-total'">
              <div :id="key + '-win'">{{data[key].win + '/' + data[key].total}}</div>
            </div>
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
        types: {
          'wild': '野球',
          'three': '3V3',
          'five': '5V5'
        },
        data: {
          wild: {},
          three: {},
          five: {}
        },
      }
    },
    mounted() {
      let player = $api.getStorage('player');
      this.data.wild = player.history.wild;
      this.data.three = player.history.three;
      this.data.five = player.history.five;
      let wildWin = $api.dom('#wild-win');
      let threeWin = $api.dom('#three-win');
      let fiveWin = $api.dom('#five-win');
      $api.css(wildWin, 'width:' + this.data.wild.rate + '%;');
      $api.css(threeWin, 'width:' + this.data.three.rate + '%;');
      $api.css(fiveWin, 'width:' + this.data.five.rate + '%;');
    }
  }
</script>
<style>
  #grade {
    margin-top: 0.8rem;
    background-color: #d1d1d1;
  }
  #title {
    width: 100%;
    text-align: center;
    font-size: 1.2rem;
    background-color: #c5c9c8;
  }
  #wild, #three, #five {
    width: 100%;
    height: 2rem;
  }
  .type {
    float: left;
    margin-left: 0.5rem;
    margin-top: 0.2rem;
    font-size: 1rem;
  }
  #wild-total, #five-total, #three-total{
    float: left;
    margin-left: 0.8rem;
    margin-top: 0.3rem;
    border-radius: 0.5rem;
    width: 70%;
    height: 1.5rem;
    background-color: #a6a6a6;
  }
  #wild-win, #three-win, #five-win {
    float: left;
    height: 100%;
    width: 0;
    text-align: center;
    border-radius: 0.5rem;
    -webkit-transition-duration: 0.4s;
  }
  #wild-win {
    background-color: #3ABA63;
  }
  #three-win {
    background-color: #00bcd4;
  }
  #five-win {
    background-color: #e66961;
  }
</style>