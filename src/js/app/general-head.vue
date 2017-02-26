<template>
  <body>
    <general-head :name="name" :pre="pre"></general-head>
  </body>
</template>
<script>
  export default {
    components: {
      'general-head': require('../../componets/general-head.vue'),
    },
    data() {
      return {
        name: api.pageParam.item.name,
        pre: api.pageParam.item.pre
      }
    }
  }
</script>