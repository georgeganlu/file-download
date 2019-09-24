<template>
    <div>
        <p>下面是tree组件 --- 通过template来实现渲染</p>
        <treetest
          :oneIdList="oneIdList"
          :treeData="treeData">
        </treetest>
    </div>
</template>


<script>
import testJson from '../../../test.json';
export default {
    data() {
        return {
            treeData: {},
            oneIdList:[],
        }
    },
    mounted() {
        let ids = testJson.child_ids; 
        this.oneIdList = testJson.child_ids;       
        let list = [];
        this.handleData(ids, testJson, list);  // 给一个层级的标识。现在没有真正的层级标识。
        this.treeData = list;
    },
    methods:{
        handleData(ids, testJson, list, layout = 0) {
            // 这里pid和id其实也是一一对应了的            
            ids.forEach(id => {
                let obj = testJson[id];
                // if (layout === 0) {
                //     obj['expend'] = true;                    
                // } else {
                //     obj['expend'] = false;
                // }
                obj['show'] = true;
                obj["iconExpend"] = false;
                obj["layout"] = layout;
                if (obj.child_ids.length > 0) {
                    obj["icon"] = true;                                   
                } else {
                    obj["icon"] = false;
                }
                list.push(obj);                
                if (obj.child_ids.length) {
                    this.handleData(obj.child_ids, testJson, list, layout + 1);   // 与尾递归的方式类似。
                }
            });
        }
    },
    components:{
        treetest: require('./tree').default,
    }
}
</script>


<style lang="stylus" scoped>


</style>
