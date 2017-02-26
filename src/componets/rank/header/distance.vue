<template>
  <div id="distance">
    <ul id="distance-first">
      <li class="first" v-for="(d, i) in distance" @click="choose(i)">{{d}}</li>
    </ul>
  </div>
</template>
<script>
  import data from '../../../js/data/rank-header-data'
  export default {
    props: ['data'],
    data() {
      return {
        distance: data.distance,
        choice: ''
      }
    },
    methods: {
      choose(i) {
        let lis = $api.domAll('.first');
        $api.addCls(lis[i], 'active');
        api.sendEvent({
          name: 'rank',
          extra: {index: 1, key: 'distance', type: this.distance[i]}
        });
        setTimeout(function () {
          api.closeFrame({name: 'rank-header-' + 'distance'});
        }, 300);
      }
    },
    mounted() {
      $api.dom('#distance-first').style.top = '0'
    }
  }
</script>
<style>
  #distance {
    position: fixed;
    background-color: #ecefec;
    top: 0;
    height: 12rem;
    width: 100%;
    z-index: 1;
  }

  #distance li {
    border-bottom: 1px solid white;
    padding: 0.3rem;
  }

  #distance-first {
    position: absolute;
    width: 100%;
    overflow: auto;
    height: 100%;top: -50%;
    background-color: #d4d6d4;
    z-index: 1;
    -webkit-transition-duration: 0.4s;
  }
  .active {
    color: #03a9f4;
    background-color: white;
  }
</style>