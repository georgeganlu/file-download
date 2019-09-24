<template>
    <div class="cascade">
        <ul class="ul-margin" @click.stop="" v-for="(item, index) in initData" :key="index">
            <li v-for="(item1, index1) in item" :key='item1.name' class="item"
             @click="showChildren(item, item1, index, index1)"             
            >
                <span :class="{'activex': index1 === flag[index]}">
                    {{item1.name}}
                </span>
                <span class="el-icon-arrow-right"
                   v-show="item1.children && item1.children.length > 0"
                ></span>
            </li>
        </ul>
    </div> 
</template>

<script>
  export default {
      name: 'cascade',
      data () {
          return {
              initData: [],
              flag: {
                  0: -1,
                  1: -1,
                  2: -1,
                  3: -1,
                  4: -1,
              },
          }
      },
      props: {
          data: Array,
      },
      methods: {
          showChildren (item, item1, index, index1) {
              if (item1.children && item1.children.length > 0) {
                //   还有下级可选。                
                let indexflag = index
                while (this.initData.length > index + 1) {
                    this.initData.pop()
                    indexflag++  // 把之前选择的更多级的依次清空。
                    this.flag[indexflag] = -1
                }
                this.flag[index] = index1       
                this.$emit('selectFa', item1.name, index)                
                this.initData.push(item1.children)
              } else {
                // 这里是没有下级进行选择了  
                this.flag[index] = index1
                this.$emit('closeChild', item1.name, index)      
              }
          },
          handleData () {
              this.initData.push(JSON.parse(JSON.stringify(this.data)))              
          }
      },
      mounted () {
          this.handleData()
      }
  }
</script>

<style scoped lang='stylus'>
ul,li{
  padding:0;margin:0;list-style:none
}
.ul-margin{
    margin-top 5px
    width 180px
    height 200px
    border-radius 4px
    padding 5px 0
    background #ffffff
    border 1px solid #cccccc
    box-sizing border-box
    overflow auto
    .item{
        text-align left
        box-sizing border-box
        padding 4px 8px
        display flex
        justify-content space-between
        &:hover{
            background #cccccc
        }        
    }
}
.activex{
  color:#00F
}
.cascade{
    display flex
}


</style>
