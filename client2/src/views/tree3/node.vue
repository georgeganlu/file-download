<template>
    <div :style="paddingStyle">
        <div v-for="node in treeData" :key="node.id" class="one-tree" @click.stop="clickExpend(node)" >
             <span  :class="node.expend ? 'el-icon-caret-bottom' : 'el-icon-caret-right'" ></span>
             <el-checkbox v-model="node.select" class="checkedBox"></el-checkbox>
             <span>{{node.name}}</span>
             <node v-show="node.child_ids.length > 0 && node.expend" :treeData="node.child"></node>
        </div>
    </div>
</template>

<script>
export default {
    name: 'node',
    data() {
        return {

        }
    },
    methods:{
        clickExpend(node) {
            this.$set(node, "expend", !node.expend);            
        }
    },
    computed:{
        paddingStyle() {
            if (this.treeData.length) {
                let left = this.treeData[0].layout * 20;
                return {
                    paddingLeft: `${left}px`
                }
            }            
        }
    },
    props:{
        treeData:{
            required: true
        }
    }
}
</script>

<style lang="stylus" scoped>
.one-tree{
    text-align left;
}
.checkedBox{
    margin 5px 8px 5px 4px;
}
</style>
