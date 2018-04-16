<template>
  <div>
    <h1>hahahahahha~~~</h1>
    <el-button type="success" @click="open()">成功按钮</el-button>
  </div>
</template>

<script>
export default {
  methods: {
    open() {
      this.$message({
          message: '恭喜你，这是一条成功消息',
          type: 'success'
        });
    }
  }
}
</script>

<style scoped lang="scss">

</style>

