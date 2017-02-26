<template>
  <div id="time">
    <ul id="time-first">
      <li class="first" v-for="(t, i) in time.first" @click="open(i)">{{t}}</li>
    </ul>
    <ul id="time-second">
      <li class="second" v-for="(t, i) in time.second" @click="choose(i)">{{t}}</li>
    </ul>
  </div>
</template>
<script>
  import data from '../../../js/data/activity-header-data'
  export default {
    props: ['data'],
    data() {
      return {
        time: data.time,
        choice: {
          // 记录筛选的指标
          time: {}
        }
      }
    },
    methods: {
      open(i) {
        $api.dom('#time-second').style.left = '33%';
        let lis = $api.domAll('.first');
        for (let j = 0; j < lis.length; j++)
          $api.removeCls(lis[j], 'active-first');
        $api.addCls(lis[i], 'active-first');

        this.choice.time.first = this.time.first[i];
      },
      choose(i) {
        let lis = $api.domAll('.second');
        for (let j = 0; j < lis.length; j++)
          $api.removeCls(lis[j], 'active-second');
        $api.addCls(lis[i], 'active-second');
        this.choice.time.second = this.time.second[i];
        // 将this.choice的内容
        api.sendEvent({
          name: 'choose',
          extra: {
            key: 'time',
            first: this.choice.time.first,
            second: this.choice.time.second}
        });
        setTimeout(function () {
          api.closeFrame({name: 'activity-header-' + 'time'});
        }, 300);
      }
    },
    mounted() {
      $api.dom('#time-first').style.top = '0';
    }
  }
</script>
<style>
  #time {
    position: fixed;
    background-color: #ecefec;
    top: 0;
    height: 12rem;
    width: 100%;
    z-index: 1;
  }

  #time li {
    border-bottom: 1px solid white;
    padding: 0.3rem;
  }

  #time-first, #time-second {
    position: absolute;
    overflow: auto;
    height: 100%;
    width: 100%;
    -webkit-transition-duration: 0.4s;
  }

  #time-first {
    top: -50%;
    background-color: #d4d6d4;
    z-index: 1;
  }

  #time-second {
    top: 0;
    background-color: #c3c5c3;
    left: 100%;
    z-index: 2;
  }

  .active-first {
    color: #03a9f4;
    background-color: white;
  }
  .active-second {
    color: #1158f4;
    background-color: #e8e8e8;
  }
</style>