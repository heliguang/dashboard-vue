<template>
  <div class="vchat-chatRoom">
    <div class="vchat-chatRoom-bg">
      <div class="chat-container">
        <ul class="chat-conversation-ul">
          <li
            class="chat-conversation-li"
            v-for="onlineUser in $store.state.chat.onlineUsers"
            :class="{ active: onlineUser.account === $store.state.chat.chatUser.account }"
            :key="onlineUser.account"
            @click="setChatUser(onlineUser)"
          >
            <el-badge
              :value="$store.state.chat.unRead[onlineUser.account]"
              :max="99"
              :hidden="$store.state.chat.unRead[onlineUser.account] === 0"
            >
              <a class="vchat-photo">
                <img :src="bg">
              </a>
            </el-badge>
            <div class="chat-conversation-li-center">
              <p class="vchat-line1">{{ onlineUser.account }}</p>
            </div>
          </li>
        </ul>
        <div class="chat-content-box">
          <message-area @wsSend="wsSend"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import bg from '@/assets/chat_images/0077.jpg'
import MessageArea from './MessageArea.vue'

export default {
  name: 'VChat',
  components: {
    MessageArea
  },
  data() {
    return {
      bg: bg,
      ws: null
    }
  },
  // watch: {
  //   '$store.state.chatUser': function() {
  //     this.$store.commit('setUnRead', { account: this.$store.state.chatUser.account, number: 0 })
  //     this.$forceUpdate()
  //   }
  // },
  // computed: {
  //   ...mapState(['user'])
  // },
  created() {
    this.wsInit()
  },
  destroyed() {
    // this.wsClose()
  },
  methods: {
    setChatUser(user) {
      if (user.account === this.$store.state.chat.chatUser.account) {
        return
      }
      this.$store.commit('chat/SET_CHAT_USER', user)
      this.$store.commit('chat/INCREASE_UNREAD', 'defaultChatAccount2')
    },
    wsInit() {
      this.ws = new WebSocket('ws://localhost:9002/ws')
      this.ws.onopen = this.wsOnOpen
      this.ws.onerror = this.wsOnError
      this.ws.onmessage = this.wsOnMessage
      this.ws.onclose = this.wsOnClose
    },
    wsSend(to, type, data) {
      console.log('wsSend')
      const message = {
        id: this.generateMessageID(),
        from: this.$store.state.chat.user.account,
        to: to,
        type: type,
        data: Object.prototype.toString.call(data) === '[object String]' ? data : JSON.stringify(data)
      }
      console.log(JSON.stringify(message))
      this.ws.send(JSON.stringify(message))

      if (message.to === this.$store.state.chat.chatUser.account) {
        this.$store.commit('chat/PUSH_MESSAGE', { account: message.to, message: message })
        this.$store.commit('chat/SET_CHAT_MESSAGE_UPDATE', !this.$store.state.chatMessageUpdate)
      }
    },
    wsClose() {
      console.log('wsClose')
      this.ws.close()
    },
    wsOnOpen() {
      console.log('wsOnOpen')
      this.wsSend('server', '长连接鉴权请求', {
        account: this.$store.state.chat.user.account
      })
    },
    wsOnError(e) {
      console.log('wsOnError')
      console.log(e)
    },
    wsOnMessage(event) {
      console.log('wsOnMessage')
      console.log(event.data)
      var message = JSON.parse(event.data)

      if (message.from === 'server') {
        switch (message.type) {
          case '长连接鉴权应答':
            this.$notify({
              title: '长连接鉴权应答',
              message: `账号[${this.$store.state.chat.user.account}]长连接响应[${message.data}]`,
              duration: 5000,
              type: 'success'
            })
            break
          case '在线用户名单广播':
            console.log('在线用户名单广播')
            var onlineUsers = JSON.parse(message.data)
            console.log(onlineUsers)
            this.$store.commit('chat/SET_ONLINE_USERS', onlineUsers)
            break
          default:
            console.log('收到未知系统消息')
        }
      } else {
        console.log('收到用户消息消息')
        this.$store.commit('chat/pushMessage', { account: message.from, message: message })
        if (message.from === this.$store.state.chat.chatUser.account) {
          this.$store.state.chat.chatMessageUpdate = true
        } else { //
          // increaseUnRead
          this.$store.commit('chat/INCREASE_UNREAD', message.from)
          this.$forceUpdate()
        }
      }
    },
    wsOnClose(event) {
      console.log('wsOnClose')
      console.log(event)
    },
    generateMessageID() {
      return this.$store.state.chat.user.account + ':' + new Date().getTime()
    }
  }
}
</script>

<style lang="scss" scoped>
  .vchat-chatRoom {
    width: 100%;
    height: calc(100vh - 50px);
    overflow: hidden;
    position: relative;

    .vchat-chatRoom-bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 2;
    }

    .chat-container {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: flex-start;

      .chat-conversation-ul {
        width: 248px;
        min-width: 147.2px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.2);
        margin: 0;
        padding: 0;
        border-right:1px solid #000;
      }

      .chat-conversation-li {
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        text-align: left;
        position: relative;
        width: 100%;
        height: 62px;
        border-bottom:1px dashed #000;

        img {
          width: 42px;
          min-width: 42px;
          height: 42px;
          border-radius: 50%;
        }
      }

      .chat-conversation-li-center {
        min-width: 100px;
        font-size: 14px;

        p:nth-of-type(2) {
          font-size: 12px;
        }
      }

      .chat-conversation-li:hover, .chat-conversation-li.active {
        background-color: #35d0c5;
      }

      .chat-content-box {
        width: 100%;
      }
    }
  }
</style>
