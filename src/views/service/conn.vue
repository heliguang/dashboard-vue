<template>
  <div>
    <div v-for="child in list1" :key="child.id">
      {{ child.id }}
    </div>
  </div>
</template>

<script>

export default {
  name: 'DragKanbanDemo',
  components: {},
  data() {
    return {
      list1: [
        { name: 'Mission', id: 1 },
        { name: 'Mission', id: 2 },
        { name: 'Mission', id: 3 },
        { name: 'Mission', id: 4 },
        { name: 'Mission', id: 5 },
        { name: 'Mission', id: 6 },
        { name: 'Mission', id: 7 },
        { name: 'Mission', id: 8 },
        { name: 'Mission', id: 9 },
        { name: 'Mission', id: 10 },
        { name: 'Mission', id: 11 },
        { name: 'Mission', id: 12 },
        { name: 'Mission', id: 13 },
        { name: 'Mission', id: 14 },
        { name: 'Mission', id: 15 },
        { name: 'Mission', id: 16 },
        { name: 'Mission', id: 17 },
        { name: 'Mission', id: 18 },
        { name: 'Mission', id: 19 },
        { name: 'Mission', id: 20 },
        { name: 'Mission', id: 21 },
        { name: 'Mission', id: 22 },
        { name: 'Mission', id: 23 },
        { name: 'Mission', id: 24 },
        { name: 'Mission', id: 25 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 26 },
        { name: 'Mission', id: 27 }
      ]
    }
  }
}
</script>
<style lang="scss">
</style>
