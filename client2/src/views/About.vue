<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-table
        :data="tableData"
        border
        row-key="id"
        :expand-row-keys="expands"
        @row-click="rowClick"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="ID"
          width="180">
        </el-table-column>
        <el-table-column
          label="部门名称"
          style="padding: 0px"
          width="180">
        <template slot-scope="scope">
          <i v-show="scope.row.type==='部门'"  :class="scope.row.expend ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"  :data-type='scope.row.type' :data-ids='scope.row.child_ids' ></i>
          <i v-show="scope.row.type==='小组'"  :class="scope.row.expend ? 'el-icon-plus' : 'el-icon-minus'"  :data-type='scope.row.type'></i>
          <span style="margin-left: 5px">{{ scope.row.name }}</span>
        </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="部门类型">
        </el-table-column>
        <el-table-column
          prop="leader_name"
          label="部门负责人">
        </el-table-column>
        <el-table-column
          prop="target_amount"
          label="销售额目标（$）">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
        </el-table-column>
        <el-table-column
          label="菜单操作"
          >
          <template slot-scope="scope">
            <el-button  type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
    </el-table>

  </div>
</template>

<script>
import datass from '../../test.json'
export default {
  data () {
    return {
      tableData: [{

      }],
      expands: [],
      flagList: []
    }
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
        el.expend = true
        this.flagList.push(el)
        this.ergodic(el, startList)
      })
      // let list = this.flagList.map((item) => {
      //   return item.id
      // })
      this.tableData = this.flagList
      console.log(this.flagList)
    },
    ergodic (el, list) {
      if (el.child_ids && el.child_ids.length > 1) {
        
        el.child_ids.forEach(item => {
          let newEl = list[item - 1]
          newEl.type = newEl.type + ''
          newEl.status = newEl.status + ''
          newEl.type = this.flatType[newEl.type]
          newEl.expend = true
          newEl.status = this.flagStatus[newEl.status]
          this.flagList.push(newEl)
          if (newEl) {
            this.ergodic(newEl, list)
          }
        })
      }
    },
    rowClick (row, event, column) {
      let type = event.target.getAttribute('data-type')

      let listData = this.tableData.slice(0)
      if (type) {
        if (type === '部门') {
          // 折叠起来
          let ids = event.target.getAttribute('data-ids').split(',')
          let newids = ids.map(item => item - 0)
          // 找到点击的是那一个元素的索引
          let idIndex = listData.findIndex(item => {
            return item.id === row.id
          })
          if (listData[idIndex].expend) {
            listData[idIndex].expend = false
            let res = listData.filter(item => {
              if (newids.indexOf(item.id) < 0) {
                return item
              }
            })
            console.log(res)
            this.tableData = res
          } else {
            // 展开
            listData[idIndex].expend = true
            // 要找到对应失去的元素。
            let res = this.flagList.filter(el => {
              if (newids.indexOf(el.id) > -1) {
                return el
              }
            })

            // insertData.unshift(, 0);
            // Array.prototype.splice.apply(arr1, arr2);
            // listData.splice(row.id, 0)
            // this.tableData = listData
          }
        } else {
          // 小组
        }
      }
    }
  },
  created () {
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

</style>
