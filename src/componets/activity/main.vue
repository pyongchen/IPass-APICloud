<template>
  <div id="activity">
    <h1 id="load">正在加载附近的约球...</h1>
    <ul class="aui-list aui-media-list" id="acts">
      <li class="aui-list-item" v-for="act in activities"
          @click="goToActDetail(act._id)">
        <div class="aui-media-list-item-inner" id="item-up">
          <div class="aui-list-item-media" id="bg-box">
            <img v-lazy="'../src/' + act.cover" id="bg-img">
          </div>
          <div class="act-type" v-if="act._type == 'wild'">野球</div>
          <div class="act-type" v-if="act._type != 'wild'">{{act._type}}</div>
          <div class="aui-list-item-inner">
            <div class="aui-list-item-text">
              <div class="aui-list-item-title">
                <svg class="icon title-icon" aria-hidden="true">
                  <use xlink:href="#icon-zhutihuodong"></use>
                </svg>
                {{act.title}}
              </div>
            </div>
            <div class="aui-list-item-text" id="line2">
              <div class="aui-list-item-right">
                <svg class="icon loseRate-icon" aria-hidden="true">
                  <use xlink:href="#icon-shiyuezhuangtai01"></use>
                </svg>
                <span class="loseRate-text">{{act.loseRate}}</span>
              </div>
              <div class="aui-list-item-right">
                <svg class="icon level-icon" aria-hidden="true">
                  <use xlink:href="#icon-dengji"></use>
                </svg>
                <span class="level-text">{{act.level}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="aui-info" style="padding-top:0" id="info-bottom">
          <div class="aui-info-item">
            <span class="aui-margin-l-5">
              <svg class="icon time-icon" aria-hidden="true">
                <use xlink:href="#icon-shijian"></use>
              </svg>
              {{act.time}}
            </span>
          </div>
          <div class="aui-info-item">
            <svg class="icon location-icon icon-me" aria-hidden="true">
              <use xlink:href="#icon-didian"></use>
            </svg>
            {{act.location}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    props: ['data'],
    data() {
      return {
        activities: '',
        src: '../src/image/players/1.jpg'
      }
    },
    methods: {
      // 获取约球活动列表
      getActivities() {
        _api.resolve('activities', api).then((data) => {
          data.forEach(function (item) {
            item.cover = 'image/activity/bg.jpg';
          });
          this.activities = data;
          $api.css($api.dom('#load'), 'display: none');
        }).catch((err) => {
          alert(JSON.stringify(err));
        });
      },
      goToActDetail(_id) {
        alert("根据" + _id + "跳转到活动详情")
      }
    },
    beforeMount() {
      this.getActivities();
    },
    mounted() {
    }
  }
</script>
<style>
  #activity {
    width: 100%;
    height: auto;
    overflow-x: hidden;
  }
  #load {
    text-align: center;
    margin-top: 1rem;
  }

  .aui-list-item {
    border-bottom: 2px solid gray !important;
    background: linear-gradient(-135deg, transparent 2rem, #e7eaed 0),
    linear-gradient(#2fbce0, #13cde0) top right !important;
  }

  #bg-box {
    width: 5rem !important;
    height: 4rem !important;
  }

  #bg-img {
    width: 5rem !important;
    height: 4rem !important;
  }

  #item-up {
    margin-bottom: 1rem;
  }

  [class*='-icon'] {
    width: 1rem;
    height: 1rem;
    float: left;
    margin-right: 0.2rem;
  }

  .title-icon {
    color: #007aff;
  }

  .loseRate-icon {
    width: 1.2rem;
    height: 1.2rem;
    color: red;
  }

  .level-icon {
    width: 1.4rem;
    height: 1.4rem;
    color: #bb990d;
  }

  [class*='-text'] {
    margin-top: 0.5rem;
    font-size: 1rem;
  }

  .act-type {
    position: absolute;
    right: 0;
    padding: 0.2rem;
    color: red;
    -webkit-transform: rotate(45deg) !important;
    -moz-transform: rotate(45deg) !important;
    -o-transform: rotate(45deg) !important;
    transform: rotate(45deg) !important;
  }

  #info-bottom {
    margin-top: -1rem;
  }
</style>