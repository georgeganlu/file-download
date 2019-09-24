<template>
    <div>
        <p>下面是tree组件 --- 通过 render 来实现渲染 !!!</p>
        <treetest
          :treeData="treeData">
        </treetest>
    </div>
</template>


<script>
import testJson from '../../../test.json';
import { deepCopy } from './util';
export default {
    data() {
        return {
            treeData: {}
        }
    },
    mounted() {
        // 采用jsx的形式来完成这里的工作,不需要对原始数据做处理。
        let newData = {};
        let middleObj = this.deepCopy(testJson);
        for(let k in middleObj) {
            if (k !== "child_ids") {
                middleObj[k]["show"] = true;                
            }
            newData[k] = middleObj[k];
        }
        this.treeData = newData;       
    },
    methods:{
       deepCopy,
    },
    components:{
        treetest: require('./render').default,
    }
}
</script>

<style lang="stylus" scoped>

</style>
