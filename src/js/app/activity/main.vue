<template>
  <body>
  <activity-info :data="msg"></activity-info>
  <activity-main :data="msg"></activity-main>
  </body>
</template>
<script>
  export default {
    components: {
      'activity-info': require('../../../componets/activity/info.vue'),
      'activity-main': require('../../../componets/activity/main.vue'),
    },
    data() {
      return {
        msg: '12321'
      }
    },
    methods: {
    },
  };
</script>