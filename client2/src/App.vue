<template>
  <div id="app">
    <div>
      <!-- <img src="./assets/logo.png"> -->
      <router-link to='/'>home</router-link>
      <router-link to='/about' class="about">about</router-link>
      <router-link to='/test' class="about">test</router-link>
      <router-link to='/test2' class="about">表格test2</router-link>
      <router-link to='/recursion' class="about">递归test3</router-link>
      <router-link to='/cascade' class="about">级联test4</router-link>
      <router-link to='/tree' class="about">tree-template-table</router-link>
      <router-link to='/treeRender' class="about">tree-render-table</router-link>
      <router-link to='/treeSelect' class="about">tree</router-link>
      <router-link to='/testKey' class="about">test-key</router-link>
      <router-link to='/apiRequest' class="about">api-request</router-link>
      <!-- <div>
        <p>
          If Element is successfully added to this project, you'll see an
          <code v-text="'<el-button>'"></code>
          below
        </p>
        <el-button>el-button</el-button>
      </div> -->
    </div>    
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
  }
}
</script>

<style scoped lang='stylus'>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  position fixed
  top 0 
  bottom 0 
  left 0
  right 0
  display: flex;
  flex-direction: column;
}
.about{
  margin-left 10px
}
</style>
