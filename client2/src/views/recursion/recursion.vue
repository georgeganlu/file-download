<template>
  <div class="border-contains">
      <div v-for="(item, index) in data" :key='index' class="span-contains">
        <span class="span1">{{item.id}}</span>
        <span class="span2" @click="toggle(item, index)" :style='spanName(item)'>
          <span v-show="item.type==='部门'" :class="[item.expend ? 'el-icon-caret-bottom' : 'el-icon-caret-right']"></span>
          <span v-show="item.type==='小组'" :class="[item.expend ? 'el-icon-minus' : 'el-icon-plus']"></span>
          {{item.name}}
        </span>
        <span class="span3">{{item.type}}</span>
        <span class="span4">{{item.leader_name}}</span>
        <span class="span5">{{item.target_amount}}</span>
        <span class="span6">{{item.status}}</span>
        <span class="span7">
          <span>编辑</span>
          <span>添加</span>
        </span>

        <tree-menu class="span8" v-show="item.expend"  :data="item.childrenList"></tree-menu>
      </div>

  </div>
</template>

<script>
export default {
  name: 'treeMenu',
  props: {
    data: Array
  },
  data () {
    return {

    }
  },
  created () {
    // console.log(this.data)
  },
  methods: {
    spanName (item) {
      let style = {};
      style['text-align'] = 'left'
      style['box-sizing'] = 'border-box'
      style['padding-left'] = (item.level - 1) * 16 + 'px'
      return style
    },
    toggle (item, index) {
      // this.$set(this.scope, index, !this.scope[index]);
      item.expend = !item.expend
    }
  }
}
</script>

<style scoped lang='stylus'>
@import '~./style.styl'


</style>