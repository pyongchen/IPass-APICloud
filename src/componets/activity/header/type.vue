<template>
  <div id="type">
    <ul id="type-first">
      <li class="first" v-for="(t, i) in type" @click="choose(i)">{{t}}</li>
    </ul>
  </div>
</template>
<script>
  import data from '../../../js/data/activity-header-data'
  export default {
    props: ['data'],
    data() {
      return {
        type: data.type,
        choice: ''
      }
    },
    methods: {
      choose(i) {
        let lis = $api.domAll('.first');
        $api.addCls(lis[i], 'active');
        api.sendEvent({
          name: 'choose',
          extra: {key: 'type', type: this.type[i]}
        });
        setTimeout(function () {
          api.closeFrame({name: 'activity-header-' + 'type'});
        }, 300);
      }
    },
    mounted() {
      $api.dom('#type-first').style.top = '0'
    }
  }
</script>
<style>
  #type {
    position: fixed;
    background-color: #ecefec;
    top: 0;
    height: 12rem;
    width: 100%;
    z-index: 1;
  }

  #type li {
    border-bottom: 1px solid white;
    padding: 0.3rem;
  }

  #type-first {
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