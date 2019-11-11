<template>
  <ul ref="msglist" class="vchat-message">
    <li v-for="(message, i) in $store.state.chat.messages[$store.state.chat.chatUser.account]" :key="i">
      <message-item :v="message" @lookPhoto="lookPhoto" />
    </li>
  </ul>
</template>

<script>
import MessageItem from './MessageItem.vue'

export default {
  name: 'MessageList',
  components: {
    MessageItem
  },
  watch: {
    '$store.state.chat.chatUser': function() {
      this.scrollToBottom()
    },
    '$store.state.chat.chatMessageUpdate': function() {
      console.log('chatMessageUpdate scroll')
      this.$forceUpdate()
      this.scrollToBottom()
    }
  },
  methods: {
    lookPhoto(url) {
      this.$emit('lookPhoto', url)
    },
    scrollToBottom() {
      console.log('scrollToBottom')
      setTimeout(() => {
        this.$refs['msglist'].scrollTop = this.$refs['msglist'].scrollHeight + 200
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
  .vchat-message {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 5px 10px;
    box-sizing: border-box;
    position: relative;
  }

  .vchat-message li {
    width: 100%;
    margin: 15px 0;
  }

  .vchat-message .org {
    width: 100%;
    margin: 20px 0;
    font-size: 12px;
    color: #e4e4e4;
    box-sizing: border-box;
  }

  .vchat-message .org span {
    color: rgb(164, 245, 231);
    margin: 0 5px;
  }
</style>
