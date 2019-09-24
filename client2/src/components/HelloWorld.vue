<template>
  <div class="hello">
      <input type="text" v-model='test'>
      <br>
      <el-button @click='handle'>点击</el-button>
      <br>
      <input type="text" v-model='test2.value'>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    testObj: String,
    test2: {
      type: Object,
      require: true
    }
  },
  computed: {
    test: {
      set(newValue) {
        console.log(234)
        return newValue
      },
      get() {
        return this.testObj
      }
    }
  },
  methods: {
    handle() {
      console.log(this.test)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
h3
  margin 40px 0 0

ul
  list-style-type none
  padding 0

li
  display inline-block
  margin 0 10px

a
  color #42b983
</style>
