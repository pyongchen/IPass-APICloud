<template>
  <div class="aui-content aui-margin-b-15 aui-margin-t-20">
    <ul class="aui-list aui-list-in">
      <li class="aui-list-item" @click="changeImage">
        <div class="aui-list-item-inner">
          <div class="aui-list-item-title">头像</div>
          <div class="aui-list-item-right">
            <img :src="player.image" id="img">
          </div>
        </div>
      </li>
      <li class="aui-list-item" v-for="(val, key) in infos"
        @click="changeInfo(key, val)">
        <div class="aui-list-item-inner">
          <div class="aui-list-item-title">{{val}}</div>
          <div class="aui-list-item-right">{{player[key]}}</div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        infos: {
          name: '用户名',
          location: '地区',
          idol: '偶像',
          feature: '技术特长',
          signature: '个性签名',
        },
        player: {}
      }
    },
    methods: {
      //弹出修改提示框
      changeInfo(key, val) {
        let dialogBox = api.require('dialogBox');
        dialogBox.input({
            keyboardType: 'default',
            texts: {
              placeholder: '输入' + val,
              leftBtnTitle: '取消',
              rightBtnTitle: '确定'
            },
            styles: {
              bg: '#fff',
              corner: 5,
              w: 300,
              h: 150,
              input: {
                h: 20,
                marginUD: 6,
                textSize: 14,
                textColor: '#000'
              },
              dividingLine: {
                width: 0.5,
                color: '#696969'
              },
              left: { bg: 'rgba(0,0,0,0)',  color: '#007FFF', size: 12},
              right: { bg: 'rgba(0,0,0,0)',  color: '#007FFF', size: 12}
            }
        }, (ret) => {
          if(ret.eventType == 'right') {
            this.player[key] = ret.text;
            // TODO 修改信息

            dialogBox.close({dialogName: 'input'});
          }
          dialogBox.close({dialogName: 'input'});
        });
      },
      changeImage() {
        let demo = api.require('iOSDialog');
        let items = ['拍照', '从手机相册中选择'];
        let param = {title: "更改头像", items: items};
        demo.actionSheetDialog(param, (ret, err) => {
          if(ret.index == 0) return; //取消按钮
          let source = 'libary';
          if(ret.index == 1) source = 'camera';
          api.getPicture({
            sourceType: source,
            encodingType: 'jpg',
            mediaValue: 'pic',
            destinationType: 'url',
            allowEdit: true,
            quality: 50,
            targetWidth: 100,
            targetHeight: 100,
            saveToPhotoAlbum: false
          }, (ret, err) => {
            // 有拍照或选取图片时
            if (ret.data) {
              this.player.image = ret.data;
              //TODO 修改图片
            }
          });
        });
      }
    },
    mounted() {
      let player = $api.getStorage('player');
      player.image = '../src/image/' + player.image.substring(13, player.image.length);
      this.player = player;
    }
  }
</script>
<style>
  #img {
    width: 2rem;
    height: 2rem;
    margin: 0.5rem 0;
  }
</style>