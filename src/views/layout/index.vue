<script setup lang="ts">
import { ServeLogin } from '@/api/auth/login'
import useStore from '@/store'

const { user } = useStore()

const login = async () => {
  const res = await ServeLogin({
    username: 'Jenny',
    password: '******'
  })
  console.log(res)
}

login()
</script>

<template>
  <el-container>
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <h1 class="title">首页</h1>
        <SvgIcon icon-class="vue" />
        <SvgIcon icon-class="crown" />
        <div>count: {{ user.count }}</div>
        <div>double: {{ user.double }}</div>
        <el-button @click="user.increment">add+</el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.title {
  color: $redColor;
}
</style>
