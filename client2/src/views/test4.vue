<template>
  <div class="cascade-contains">
      <input type="text" readonly = "readonly" 
          v-model="values" class="input"
          @click.stop="toggle"          
      >
      <div v-show="ulshow">
          <cascade :data='flagList' :showopen='ulshow'
            v-if="flagList.length > 0"
            @selectFa='selectFa'
            @closeChild='closeChild'
          ></cascade>
      </div>      
  </div>
</template>

<script>
// 级联
import datass from "../../test.json";
import cascade from "./cascade/cascade";
export default {
  data() {
    return {
      flagList: [],      
      ulshow: false,
      record: []
    };
  },
  components: {
    cascade
  },
  computed: {
      values () {
          if (this.record.length > 0) {
              return this.record.join(' / ')
          } else {
              return ''
          }
      }
  },
  methods: {
    selectFa (name, index) {
        if (this.record.length > 0) {
            while (this.record.length >= index + 1) {
                this.record.pop()
            }            
        }
        this.record.push(name) 
    },
    closeChild (name, index) {
        if (this.record.length >= index + 1) {
            this.record.pop()
        }
        this.record.push(name) 
        this.ulshow = false
    },
    _getList(startList) {      
      let deponelist = []
      // startList.filter(el => el.type === 0);
      startList.forEach(item => {
        if (item.type === 0) {
          console.log(123123)
          deponelist.push(item)
        }
      })      
      this.ergodic(deponelist, startList);
      deponelist.forEach((el, index) => {
        el.type = el.type + ""
        el.status = el.status + ""
        el.type = this.flatType[el.type]
        el.level = 1
        el.status = this.flagStatus[el.status]
        el.children = []
        el.expend = false
        el.select = false
        this.ergodic(el, startList, 1)
        this.flagList.push(el);
      })      
      console.log(this.flagList);
    },
    ergodic(el, list, level) {
      if (el.child_ids && el.child_ids.length > 1) {
        let resArr = [];
        el.child_ids.forEach(item => {
          let newEl = list.find(el => {
            return el.id === item;
          });
          newEl.type = newEl.type + "";
          newEl.status = newEl.status + "";
          newEl.type = this.flatType[newEl.type];
          newEl.status = this.flagStatus[newEl.status];
          newEl.children = [];
          newEl.expend = false;
          newEl.select = false  
          newEl.level = level + 1;
          resArr.push(newEl);
          if (newEl) {
            this.ergodic(newEl, list, level + 1);
          }
        });
        el.children = resArr;
      }
    },
    showulList () {    
        this.ulshow = false
    },
    toggle () {
        this.ulshow = !this.ulshow
    }
  },
  mounted () {    
    let startList = JSON.parse(JSON.stringify(Object.values(datass)));
    this.flatType = {
      "0": "部门",
      "1": "小组",
      "2": "成员"
    };
    this.flagStatus = {
      "0": "启用",
      "1": "未启用"
    };
    this._getList(startList)
    document.addEventListener('click', this.showulList)
  },
  deactivated () {
      document.removeEventListener('click', this.showulList)
  }
};
</script>

<style scoped lang='stylus'>
@import '~./cascade/style.styl';

.cascade-contains {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 0 auto;
}
</style>
