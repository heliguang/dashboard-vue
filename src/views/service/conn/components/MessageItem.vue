<template>
  <div class="messsage-item" :class="v.from === $store.state.chat.user.account ? 'from-me' : 'from-other'">
    <p v-if="v.from !== $store.state.chat.user.account" class="avatar">
      <img :src="bg" alt="">
    </p>
    <div class="message">
      <p class="message-info">
        <span>{{v.from}}</span>
        <i>{{v.time}}</i>
      </p>

      <div v-if="v.type === '聊天消息'" class="type-chat">{{v.data}}</div>
      <div v-else-if="v.type === '图片'" class="type-image">
        <img :src="v.data" alt="" @dblclick="$emit('lookPhoto', v.data)" title="双击查看原图">
      </div>
      <div v-else-if="v.type === '文件'" class="type-file">
        <img :src="fileIcon">
        <div>
          <!-- <p>{{v.data.slice(v.data.lastIndexOf('/') + 1)}}</p> -->
          <p>{{v.data}}</p>
          <a :href="v.data" download>下载</a>
        </div>
      </div>
      <p v-else class="type-chat type-unknown">[未知类型消息]{{v}}</p>

    </div>
    <p v-if="v.from === $store.state.chat.user.account" class="avatar">
      <img :src="bg" alt="">
    </p>
  </div>
</template>

<script>
import bg from '@/assets/chat_images/0077.jpg'
import fileIcon from '@/assets/chat_images/file.png'

export default {
  name: 'MessageItem',
  props: ['v'],
  data() {
    return {
      bg: bg,
      fileIcon: fileIcon
    }
  }
}
</script>

<style lang="scss" scoped>
  .messsage-item {
    width: 100%;
    display: flex;
  }

  .messsage-item .avatar {
    width: 42px;
    height: 42px;
    color: rgba(17, 17, 17, 1);
    font-size: 14px;
    text-align: center;
    line-height: 42px;
    border-radius: 50%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .messsage-item .message {
    max-width: 60%;

    p.message-info {
      font-size: 14px;
      color: #111111;
      margin-bottom: 5px;

      i {
        font-size: 10px;
        color: #b3b3b3;
        font-style: normal;
        margin-left: 5px;
      }
    }
  }

  .from-other.messsage-item {
    justify-content: flex-start;
  }

  .from-other.messsage-item .message {
    text-align: left;
    margin-left: 10px;
  }

  .from-me.messsage-item {
    justify-content: flex-end;
  }

  .from-me.messsage-item .message {
    text-align: right;
    margin-right: 10px;
  }

  .from-me.messsage-item {
    justify-content: flex-end;
  }

  .from-other .type-chat:before, .from-me .type-chat:after {
    width: 0;
    height: 0;
    content: '';
    display: block;
    position: absolute;
    top: 10px;
  }

  .from-other .type-chat:before {
    left: -11px;
    border-bottom: 5px solid #acd9f8;
    border-left: 10px solid transparent;
    border-right: 5px solid transparent;
    border-top: 0;
    transform: rotate(45deg);
  }

  .from-me .type-chat:after {
    right: -11px;
    border-bottom: 5px solid #acd9f8;
    border-left: 5px solid transparent;
    border-right: 10px solid transparent;
    transform: rotate(-45deg);
  }

  .type-chat {
    background-color: #acd9f8;
    border-radius: 5px;
    padding: 10px;
    box-sizing: border-box;
    position: relative;
    text-align: left;
    word-wrap: break-word;
    font-size: 14px;
    word-break: break-all;
    display: inline-block;
    color: #323232;
  }

  .type-image {
    width: 400px;
    overflow: hidden;
    border-radius: 10px;

    img {
      width: 100%;
    }
  }

  .type-file {
    display: flex;
    overflow: hidden;
    justify-content: flex-start;
    align-content: center;
    color: #323232;
    background-color: #fff;
    text-align: left;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 5px;

    img {
      width: 60px;
      height: 60px;
      margin-right: 10px;
    }

    p:nth-of-type(1) {
      font-size: 16px;
      margin-bottom: 8px;
    }

    p:nth-of-type(2) {
      font-size: 12px;
      line-height: 13px;
      color: #888;

      i {
        vertical-align: text-bottom;
      }
    }

    a {
      color: #27cac7;
      font-size: 12px;
    }
  }
</style>
