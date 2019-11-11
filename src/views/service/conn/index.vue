<template>
  <div class="vchat-home">
    <chat />
  </div>
</template>

<script>
import Chat from './components/Chat'

export default {
  name: 'Conn',
  components: {
    Chat
  }
}
</script>
<style lang="scss">
  .vchat-home{
    width:100%;
    height: 100%;
    display: flex;
  }
</style>
