<template>
  <div class="border-bottom">
    <div class="span-contains">
      <span class="span1">ID</span>
      <span class="span2">部门名称</span>
      <span class="span3">部门类型</span>
      <span class="span4">部门负责人</span>
      <span class="span5">销售额目标（$）</span>
      <span class="span6">状态</span>
      <span class="span7">菜单</span>
    </div>
    <my-tree :data="flagList" ></my-tree>
  </div>
</template>

<script>
// 递归
import datass from '../../test.json'
import myTree from './recursion/recursion'
export default {
  data () {
    return {
      flagList: []
    }
  },
  components: {
    myTree
  },
  methods: {
    handleClick () {

    },
    _getList (startList) {
      let deponelist = startList.filter(el => el.type === 0)
      this.ergodic(deponelist, startList)
      deponelist.forEach((el, index) => {
        el.type = el.type + ''
        el.status = el.status + ''
        el.type = this.flatType[el.type]
        el.level = 1
        el.status = this.flagStatus[el.status]
        el.childrenList = []
        el.expend = false
        this.ergodic(el, startList, 1)
        this.flagList.push(el)
      })
      console.log(this.flagList)
    },
    ergodic (el, list , level) {
      if (el.child_ids && el.child_ids.length > 1) {
        let resArr = []        
        el.child_ids.forEach(item => {
          let newEl = list.find(el => {
            return el.id === item
          })          
          newEl.type = newEl.type + ''
          newEl.status = newEl.status + ''
          newEl.type = this.flatType[newEl.type]
          newEl.status = this.flagStatus[newEl.status]
          newEl.childrenList = []
          newEl.expend = false
          newEl.level = level + 1
          resArr.push(newEl)
          if (newEl) {
            this.ergodic(newEl, list, level + 1)
          }
        })
        el.childrenList = resArr
      }
    }
  },
  mounted () {
    // let startList = Object.values(datass)
    let startList = JSON.parse(JSON.stringify(Object.values(datass)));
    this.flatType = {
      '0': '部门',
      '1': '小组',
      '2': '成员'
    }
    this.flagStatus = {
      '0': '启用',
      '1': '未启用'
    }
    this._getList(startList)
  }
}
</script>

<style scoped lang='stylus'>
@import '~./recursion/style.styl'
.border-bottom{
    border-bottom 1px solid #ccc
}


</style>
