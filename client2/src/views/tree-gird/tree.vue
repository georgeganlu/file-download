
<template>
<div class="tablediv">
    <div class="theadDiv">
      <table class="table table-bordered">
          <thead>
              <tr>
                  <th v-for="(column) in cloneColumns" :key='column.id' :style='theadStyle(column)'>           
                      <label>
                          {{ column.title }}               
                      </label>
                  </th>
              </tr>
          </thead>
      </table>
    </div>

    <div class="tbodyDiv">
        <table class="table table-bordered">
          <thead>
              <tr>
                  <th v-for="(column) in cloneColumns" :key='column.id' :style='theadStyle(column)'>            
                      <label>
                          {{ column.title }}               
                      </label>
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(item,index) in initItems" :key="item.id"  v-show="show(item)" :class="{'child-tr':item.parent}">
                  <td v-for="(column) in columns" :key="column.key" :style="tdStyle(item,column)">                         
                      <!-- 编辑的才显示传入的是action -->
                      <div v-if="column.type === 'action'">
                          <el-button 
                            :type="action.type" size="small" 
                            @click="RowClick(item,$event,index,action.text)" 
                            v-for='action in (column.actions)' 
                            :key="action.text">{{action.text}}
                          </el-button>
                      </div>                                                
                      <!-- 循环行的时候在把title的td循环一遍 -->
                      <label @click="toggle(index, item)" v-if="!column.type">
                          <span v-show="column.key==='name'" :style="levelStyle(item)">                              
                            <span  :class="[item.expanded ? 'el-icon-caret-bottom' : 'el-icon-caret-right']"  v-show="item.type==='部门'"></span>
                            <span  :class="[item.expanded ? 'el-icon-minus' : 'el-icon-plus']"  v-show="item.type==='小组'"></span>
                          </span>                            
                          {{renderBody(item, column) }}
                      </label>
                  </td>
              </tr>

    
          </tbody>
        </table>
    </div>
</div>
      
      
</template>
<script>
export default {
  name: "treeGrid",
  props: {
    columns: Array, // 头数据
    items: {
      // 数据
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      initItems: [], // 处理后数据数组
      cloneColumns: [], // 处理后的表头数据
      flagList: []
    };
  },

  watch: {
    items() {
      if (this.items) {
        this.initData(this.deepCopy(this.items), 1, null);
      }
    },
    columns: {
      handler() {
        this.cloneColumns = this.makeColumns();
      },
      deep: true
    }
  },
  mounted() {
    if (this.items) {
      this.initData(this.deepCopy(this.items), 1, null);
      this.cloneColumns = this.makeColumns();
    }
  },
  methods: {
    levelStyle(item) {
      var style = {};
      style["margin-left"] = (item.level - 1) * 15 + "px";
      return style;
    },
    theadStyle (column) {
      let style = {}
      if (column.width) {
        // style["width"] = 300 + "px";
        style["width"] = column.width + "px";
        style['word-break'] = 'break-all'        
      }
      return style;
    },
    tdStyle(item, column) {
      var style = {};      
      // if (column.width) {
      //   style["min-width"] = column.width + "px";
      // }
      if (column.key === "name") {
        style["text-align"] = "left";
        // style["width"] = 300 + "px";
      }
      return style;
    },
    // 处理表头数据
    makeColumns() {
      let columns = this.deepCopy(this.columns);
      this.tdsWidth = 0;
      columns.forEach((column, index) => {
        column._index = index;
        column._width = column.width ? column.width : "";
        column._sortType = "normal";
        this.tdsWidth += column.width ? parseFloat(column.width) : 0;
      });
      return columns;
    },
    // 数据处理 增加自定义属性监听
    initData(items, level, parent) {
      this.initItems = [];
      items.forEach((item, index) => {
        item = Object.assign({}, item, {
          parent: parent,
          level: level
        });
        if (typeof item.expanded === "undefined") {
          item = Object.assign({}, item, {
            expanded: false
          });
        }
        // 是否显示。
        if (typeof item.show === "undefined") {
          item = Object.assign({}, item, {
            isShow: false
          });
        }
        // 是否已加载
        item = Object.assign({}, item, {
          load: !!item.expanded
        });
        this.initItems.push(item);

        if (item.children && item.expanded) {
          this.initData(item.children, level + 1, item);
        }
      });
    },
    //  隐藏显示
    show(item) {
      return (
        item.level == 1 || (item.parent && item.parent.expanded && item.isShow)
      );
    },
    toggle(index, item) {
      let level = item.level + 1;
      if (item.children) {
        if (item.expanded) {
          item.expanded = !item.expanded;
          this.close(index, item);
        } else {
          item.expanded = !item.expanded;
          if (item.load) {
            // 已加载的数据就直接显示。
            this.open(index, item);
          } else {
            // 还没有加载的数据。
            item.load = true;
            item.children.forEach((child, childIndex) => {
              this.initItems.splice(index + childIndex + 1, 0, child); // 在对应的list添加子数组。
              // 设置监听属性  只要加过一次就在也不加了。
              this.$set(this.initItems[index + childIndex + 1], "parent", item);
              this.$set(this.initItems[index + childIndex + 1], "level", level);
              this.$set(this.initItems[index + childIndex + 1], "isShow", true);
              this.$set(
                this.initItems[index + childIndex + 1],
                "expanded",
                false
              );
            });
          }
        }
      }
    },
    open(index, item) {
      // 展开
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          child.isShow = true;
          if (child.children && child.expanded) {
            this.open(index + childIndex + 1, child);
          }
        });
      }
    },
    close(index, item) {
      // 折叠起来
      if (item.children) {
        item.children.forEach((child, childIndex) => {
          child.isShow = false;
          child.expanded = false;
          if (child.children) {
            this.close(index + childIndex + 1, child);
          }
        });
      }
    },

    // 返回内容
    renderBody(row, column) {
      console.log(row);
      return row[column.key];
    },
    // 深度拷贝函数
    deepCopy(data) {
      var t = this.type(data);
      var o;
      var i;
      var ni;
      if (t === "array") {
        o = [];
      } else if (t === "object") {
        o = {};
      } else {
        return data;
      }
      if (t === "array") {
        for (i = 0, ni = data.length; i < ni; i++) {
          o.push(this.deepCopy(data[i]));
        }
        return o;
      } else if (t === "object") {
        for (i in data) {
          o[i] = this.deepCopy(data[i]);
        }
        return o;
      }
    },
    type(obj) {
      var toString = Object.prototype.toString;
      var map = {
        "[object Boolean]": "boolean",
        "[object Number]": "number",
        "[object String]": "string",
        "[object Function]": "function",
        "[object Array]": "array",
        "[object Date]": "date",
        "[object RegExp]": "regExp",
        "[object Undefined]": "undefined",
        "[object Null]": "null",
        "[object Object]": "object"
      };
      return map[toString.call(obj)];
    }
  },
  beforeDestroy() {
    window.onresize = null;
  }
};
</script>
<style>
table {
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;
}

.table-bordered {
  border: 1px solid #ebebeb;
}

.table > tbody > tr > td,
.table > tbody > tr > th,
.table > thead > tr > td,
.table > thead > tr > th {
  border-top: 1px solid #e7eaec;
  line-height: 1.42857;
  padding: 8px;
  vertical-align: middle;
}

.table-bordered > tbody > tr > td,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > td,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > thead > tr > th {
  border: 1px solid #e7e7e7;
}

.table > thead > tr > th {
  border-bottom: 1px solid #ddd;
}

.table-bordered > thead > tr > td,
.table-bordered > thead > tr > th {
  background-color: #f5f5f6;
}

label {
  margin: 0 8px;
}

/* .ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: 14px;
    height: 14px;
} */

/* .ms-tree-space::before {
    content: ""
} */

/* #hl-tree-table th>label {
    margin: 0;
} */
.tablediv{
  height: 100%;
  position: relative;
}
.theadDiv {
  position: absolute;
  left: 0;
  right: 0;
  overflow: hidden; 
  background: #cccccc;
  z-index: 1;
}

.tbodyDiv {
  position: absolute;
  top: 0px;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
}
.tbodyDiv::-webkit-scrollbar{
   width:0;
}
</style>
