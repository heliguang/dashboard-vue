<template>
  <div class="vchat-item">
    <div class="vchat-item-header">
      <span>{{ $store.state.chat.chatUser.account }}</span>
    </div>
    <div class="vchat-item-container">
      <div class="container-chat">
        <div
          v-loading="chatLoading"
          element-loading-text="拼命加载中ing..."
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.8)"
          class="chat-room"
        >
          <message-list @lookPhoto="lookPhoto" @chatLoading="chatLoading = true" />
        </div>
        <div class="chat-send">
          <div class="tool" />
          <textarea v-model="message" @keyup.enter="send()" />
          <div class="enter">
            <div class="pan-btn green-btn" @click="clear">清空</div>
            <div class="pan-btn pink-btn" @click="send()">发送</div>
          </div>
        </div>
      </div>
    </div>
    <photo-swipe :visible="photoSwipeFlag" :url="photoSwipeUrl" @close="photoSwipeFlag = false" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import MessageList from './MessageList.vue'
import PhotoSwipe from '@/components/PhotoSwipe'

export default {
  name: 'MessageArea',
  components: {
    MessageList,
    PhotoSwipe
  },
  data() {
    return {
      currNav: 0,
      spread: false,
      message: '',
      showEmoji: {
        f: false
      },
      uplaodVisible: {
        f: false
      },
      photoSwipeFlag: false,
      photoSwipeUrl: '',
      chatLoading: false,
      loadmoreLoading: false
    }
  },
  computed: {
    ...mapState(['user', 'OnlineUser'])
  },
  methods: {
    lookPhoto(url) { // 查看原图
      this.photoSwipeUrl = url
      this.photoSwipeFlag = true
    },
    uploadFileSuccess(res, file) { // 上传成功
      if (file.raw.type.indexOf('image') > -1) {
        this.send(res.data, 'img')
      } else {
        this.send(file, 'file')
      }
      this.uplaodVisible.f = false
    },
    InmageChange() { // 发送图片
      const f = this.$refs['chooseInmage'].files[0]
      if (f.type.indexOf('image') === -1) {
        this.$message.error('只能上传图片!')
        return
      }
      const isLt1M = f.size / 1024 / 1024 < 1
      if (!isLt1M) {
        this.$message.error('图片大小不能超过 1MB!')
        return
      }
      const formdata = new FormData()
      formdata.append('f', f)
      // api.uploadFile(formdata).then(r => {
      //   if (r.code === 0) {
      //     this.send(r.data, 'img')
      //   } else {
      //     this.$message({
      //       message: '上传失败',
      //       type: 'warning'
      //     })
      //   }
      // })
      this.$refs['chooseInmage'].value = ''
    },
    send() { // 发送消息
      if (!this.message) {
        return
      }
      this.$emit('wsSend', this.$store.state.chat.chatUser.account, '聊天消息', this.message.replace('\n', ''))
      this.message = ''
      // let val = {
      //     name: this.user.name,
      //     mes: this.message,
      //     time: utils.formatTime(new Date()),
      //     avatar: this.user.photo,
      //     nickname: this.user.nickname,
      //     read: [this.user.name],
      //     roomid: this.currSation.id,
      //     style: 'mess',
      //     userM: this.user.id
      // };
      // if (type === 'emoji') { // 发送表情
      //     val.style =  'emoji';
      //     val.mes = '表情';
      //     val.emoji = params;
      // } else if (type === 'img') {
      //     val.style =  'img';
      //     val.mes = '图片';
      //     val.emoji = params;
      // } else if (type === 'file') {
      //     val.style =  'file';
      //     val.mes = params.name;
      //     val.emoji = params.response.data;
      // }
      // this.chatList.push(Object.assign({},val,{type: 'mine'}));
      // // this.$socket.emit('mes', val);
      // this.$emit('NewMes', val);
      // if (type === 'mess') { // 发送文字
      //     this.message = '';
      // }
    },
    chooseEmojiDefault(em) {
      this.message += em
      this.showEmoji.f = false
    },
    chooseEmoji(url) {
      this.send(url, 'emoji')
      this.showEmoji.f = false
    },
    clear() { // 清空
      this.message = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .vchat-item {
    width: 100%;
    /*height: calc(100% - 32px);*/
    height: 100%;

    .vchat-item-header {
      width: 100%;
      height: 32px;
      text-align: left;
      font-size: 16px;
      padding: 0 10px;
      box-sizing: border-box;
      background-color: #35d0c5;

      span {
        display: inline-block;
        height: 100%;
        line-height: 32px;
        padding: 0 5px;
        margin-right: 10px;
        box-sizing: border-box;
        cursor: pointer;
        position: relative;
        opacity: 0.8;
        overflow: hidden;
      }

      span:before {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: #f5f5f5;
        position: absolute;
        left: 0;
        bottom: 0;
        /*transition: transform 0.2s;*/
        transform: scale(0);
      }

      span:hover, span.active {
        opacity: 1;
      }

      span.active:before {
        transform: scale(1);
      }
    }

    .vchat-item-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;

      .container-chat {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.3);

        .chat-room {
          width: 100%;
          height: 65%;
          min-height: 252.2px;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          overflow: hidden;
        }

        .message-content {
          width: 100%;
          height: 100%;
        }

        .chat-send {
          width: 100%;
          height: 35%;
          min-height: 135.8px;
          box-sizing: border-box;

          .tool {
            width: 100%;
            height: 28px;
            line-height: 28px;
            text-align: left;
            background-color: #35d0c5;
            padding: 0 10px;
            box-sizing: border-box;

            .tool-item {
              display: inline-block;
              height: 100%;
              position: relative;

              i {
                padding: 0 5px;
              }

              .emoji-container {
                width: 400px;
                height: 260px;
                position: absolute;
                bottom: 30px;
                left: 0;
                z-index: 10;
                transition: all 0.2s;
                /*transform: scaleX(0);*/
                /*opacity: 0;*/
              }

              input {
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                opacity: 0;
              }
            }

            .tool-item:hover {
              background-color: rgba(255, 255, 255, 0.3);
            }

            .tool-item.active {
              background-color: rgba(255, 255, 255, 0.3);
            }

            .tool-item.active .emoji-container {
              transform: scaleX(1);
              opacity: 1;
            }

            i {
              margin: 0;
            }
          }

          textarea {
            width: 100%;
            height: calc(100% - 102px);
            background-color: transparent;
            resize: none;
            outline: none;
            font-size: 14px;
            padding: 5px 10px;
            box-sizing: border-box;
            border: none;
          }

          .enter {
            width: 100%;
            height: 32px;
            display: flex;
            justify-content: flex-end;

            button {
              margin-right: 10px;
            }
          }
        }
      }

      .container-handel {
        width: 28%;
        min-width: 164.864px;
        height: 100%;

        h3 {
          font-weight: normal;
          font-size: 16px;
          text-align: left;
          line-height: 16px;
          margin-bottom: 5px;

          i {
            float: right;
          }
        }

        .handel-notice {
          width: 100%;
          height: 40%;
          box-sizing: border-box;
          border-bottom: 1px solid rgba(255, 255, 255, 0.3);
          padding: 8px 10px;
          overflow-y: auto;
          font-size: 12px;
          text-align: left;

          ul {
            overflow-y: auto;

            li {
              margin-bottom: 2px;
            }

            li:hover {
              padding: 2px;
              box-sizing: border-box;
              background-color: rgba(255, 255, 255, 0.5);
              cursor: default;
            }
          }
        }

        .handel-member {
          width: 100%;
          height: 60%;
          box-sizing: border-box;
          padding: 8px 10px;
          font-size: 12px;

          ul {
            overflow-y: auto;
            height: 100%;
          }

          input {
            box-sizing: border-box;
            width: 100%;
            border: 1px solid #d5d5d5;
            padding-left: 5px;
            outline: none;
            color: #323232;
          }

          li {
            padding: 5px 0;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            span {
              min-width: 110px;
              text-align: left;
            }
          }

          .loadmore {
            width: 100%;
            text-align: center;
            cursor: pointer;
          }

          a {
            width: 26px;
            min-width: 26px;
            height: 26px;
            margin-right: 5px;
          }

          a.lineOf {
            -webkit-filter: grayscale(85%); /* Chrome, Safari, Opera */
            filter: grayscale(85%);
          }
        }
      }
    }
  }
</style>
