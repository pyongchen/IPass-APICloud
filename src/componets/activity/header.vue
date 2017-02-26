<template>
  <div id="search">
    <div class="aui-bar aui-bar-btn aui-bar-btn-full">
      <div class="aui-bar-btn-item" v-for="(sel, i) in data" @click="select(i)">
        <span>{{sel.val}}</span>
        <i class="aui-iconfont aui-icon-top"></i>
      </div>
    </div>
  </div>
</template>
<script>
  import './header.css'
  import data_ from '../../js/data/activity-select'
  export default {
    props: [''],
    data() {
      return {
        data: data_
      }
    },
    methods: {
      showSelect(index) {
        let name = data_[index].key;
        let h = window.offsetH;
        api.openFrame({
          name: 'activity-header-' + name,
          url: '../html/activity-header-' + name + '.html',
          rect: {
            x: 0,
            y: h,
            w: 'auto',
            h: '200'
          },
        })
      },
      hideSelect(index) {
        api.closeFrame({
          name: 'activity-header-' + data_[index].key
        });
      },
      // 将筛选导航条的上下图标回位
      restore(index) {
        let icons = $api.domAll('.aui-iconfont');
        $api.removeCls(icons[index], 'aui-icon-down');
      },
      select(index) {
        let icons = $api.domAll('.aui-iconfont');
        if($api.hasCls(icons[index], 'aui-icon-down')) {
          $api.removeCls(icons[index], 'aui-icon-down');
          $api.addCls(icons[index], 'aui-icon-up');
          this.hideSelect(index);
        } else {
          for(let i = 0; i < icons.length; i++) {
            $api.removeCls(icons[i], 'aui-icon-down');
            this.hideSelect(i);
          }
          $api.addCls(icons[index], 'aui-icon-down');
          this.showSelect(index);
        }
      }
    },
    mounted() {
      api.addEventListener({
        name: 'choose'
      }, (ret, err) => {
        let val = ret.value, index = 0;
        switch (val.key) {
          case 'time':
//            alert(val.first + '|' + val.second);
            index = 0;
            break;
          case 'location':
            index = 1;
            break;
          case 'type':
//            alert(val.type);
            index = 2;
            break;
          case 'select':
//            alert(val.select);
            index = 3;
            break;
        }
        this.restore(index);
      })
    }
  }
</script>