<template>
  <div class="about">
     <div>
        <mytree
          :items='flagList'
          :columns='columns'
        ></mytree>
     </div>         
  </div>
</template>

<script>
import datass from '../../test.json'
import mytree from './tree-gird/tree'
export default {
  data () {
    return {
      flagList: [],
      columns: [
        {
          title: 'ID',
          key: 'id',
          sortable: true,
          width: '150'
        },
        {
          title: '部门名称',
          key: 'name',
          width: '150'
        },
        {
          title: '部门类型',
          key: 'type',
          width: '150'
        },
        {
          title: '部门负责人',
          key: 'leader_name',
          width: '150'
        },
        {
          title: '销售目标',
          key: 'target_amount',
          width: '150'
        },
        {
          title: '状态',
          key: 'status',
          width: '150'
        },
        {
          title: '菜单操作',
          type: 'action',
          actions: [
            {
              type: 'primary',
              text: '编辑'
            },
            {
              type: 'error',
              text: '删除'
            }
          ],
          width: '150'
        }
      ],
    }
  },
  components: {
    mytree
  },
  methods: {
    _getList (startList) {
      let deponelist = startList.filter(el => el.type === 0)
      this.ergodic(deponelist, startList)
      deponelist.forEach((el, index) => {
        el.type = el.type + ''
        el.status = el.status + ''
        el.type = this.flatType[el.type]
        el.status = this.flagStatus[el.status]
        el.leader_name = el.leader_name.join(',')
        el.children = []
        this.ergodic(el, startList)
        this.flagList.push(el)
      })
      console.log(this.flagList)
    },
    ergodic (el, list) {
      if (el.child_ids && el.child_ids.length > 1) {
        let resArr = []
        el.child_ids.forEach(item => {
          let newEl = list.find(el => {
            return el.id === item
          })
          newEl.type = newEl.type + ''
          newEl.status = newEl.status + ''
          newEl.type = this.flatType[newEl.type]
          newEl.leader_name = newEl.leader_name.join(',')
          newEl.status = this.flagStatus[newEl.status]
          newEl.children = []
          resArr.push(newEl)
          if (newEl) {
            this.ergodic(newEl, list)
          }
        })
        el.children = resArr
      }
    },

    rowClick () {},
    selectionClick () {},
    sortClick () {}
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
.about{
  
}

</style>
