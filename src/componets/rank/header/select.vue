<template>
  <div id="select">
    <ul id="select-first">
      <li class="first" v-for="(d, i) in select" @click="choose(i)">{{d}}</li>
    </ul>
  </div>
</template>
<script>
  import data from '../../../js/data/rank-header-data'
  export default {
    props: ['data'],
    data() {
      return {
        select: data.select,
        choice: ''
      }
    },
    methods: {
      choose(i) {
        let lis = $api.domAll('.first');
        $api.addCls(lis[i], 'active');
        api.sendEvent({
          name: 'rank',
          extra: {index: 3, key: 'select', type: this.select[i]}
        });
        setTimeout(function () {
          api.closeFrame({name: 'rank-header-' + 'select'});
        }, 300);
      }
    },
    mounted() {
      $api.dom('#select-first').style.top = '0'
    }
  }
</script>
<style>
  #select {
    position: fixed;
    background-color: #ecefec;
    top: 0;
    height: 12rem;
    width: 100%;
    z-index: 1;
  }

  #select li {
    border-bottom: 1px solid white;
    padding: 0.3rem;
  }

  #select-first {
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