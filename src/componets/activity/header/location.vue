<template>
  <div id="location">
    <ul id="location-first">
      <li class="first" v-for="(t, i) in location.first" @click="open2(i)">{{t}}</li>
    </ul>
    <ul id="location-second">
      <li class="second" v-for="(t, i) in location.second" @click="open3(i)">{{t}}</li>
    </ul>
    <ul id="location-third">
      <li class="third" v-for="(t, i) in location.third" @click="choose(i)">{{t}}</li>
    </ul>
  </div>
</template>
<script>
  import data_ from '../../../js/data/activity-header-data'
  let data = data_.location;
  export default {
    props: ['data'],
    data() {
      return {
        location: {
          first: data.region,
          second: [],
          third: []
        },
        choice: {
          // 记录筛选的指标
          location: {}
        }
      }
    },
    methods: {
      //点击1级菜单的某项，打开2级菜单
      open2(i) {
        let key = this.location.first[i];
        $api.dom('#location-second').style.left = '20%';
        // 根据点击的1级菜单更换二级菜单
        this.location.second = data.loc[key];

        // 改变1级菜单点击项的样式
        let lis = $api.domAll('.first');
        for (let j = 0; j < lis.length; j++)
          $api.removeCls(lis[j], 'active-first');
        $api.addCls(lis[i], 'active-first');

        // 存储点击的信息
        this.choice.location.first = this.location.first[i];
      },
      //点击2级菜单的某项，打开3级菜单
      open3(i) {
        let key = this.location.second[i];
        $api.dom('#location-third').style.left = '50%';

        // 根据点击的2级菜单更换3级菜单
        this.location.third = data.place[key];

        // 改变2级菜单点击项的样式
        let lis = $api.domAll('.second');
        for (let j = 0; j < lis.length; j++)
          $api.removeCls(lis[j], 'active-second');
        $api.addCls(lis[i], 'active-second');

        // 存储点击项的信息
        this.choice.location.second = this.location.second[i];
      },
      choose(i) {
        let lis = $api.domAll('.third');
        for (let j = 0; j < lis.length; j++)
          $api.removeCls(lis[j], 'active-third');
        $api.addCls(lis[i], 'active-third');
        this.choice.location.third = this.location.third[i];
        // 将this.choice的内容
        api.sendEvent({
          name: 'choose',
          extra: {
            key: 'location',
            first: this.choice.location.first,
            second: this.choice.location.second,
            third: this.choice.location.third
          }
        });
        setTimeout(function () {
          api.closeFrame({name: 'activity-header-' + 'location'});
        }, 300);
      }
    },
    mounted() {
      $api.dom('#location-first').style.top = '0';
    }
  }
</script>
<style>
  #location {
    position: fixed;
    background-color: #ecefec;
    top: 0;
    height: 12rem;
    width: 100%;
    z-index: 1;
  }

  #location li {
    border-bottom: 1px solid white;
    padding: 0.3rem;
  }

  #location-first, #location-second, #location-third {
    position: absolute;
    overflow: auto;
    width: 100%;
    height: 100%;
    -webkit-transition-duration: 0.4s;
  }

  #location-first {
    top: -50%;
    background-color: #d4d6d4;
    z-index: 1;
  }

  #location-second {
    top: 0;
    background-color: #c3c5c3;
    left: 100%;
    z-index: 2;
  }

  #location-third {
    top: 0;
    background-color: #bcbebc;
    left: 100%;
    z-index: 3;
  }

  .active-first {
    color: #03a9f4;
    background-color: white;
  }

  .active-second {
    color: #1158f4;
    background-color: #e8e8e8;
  }

  .active-third {
    color: #161af4;
    background-color: #d2d2d2;
  }
</style>