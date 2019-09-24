<template>
	<div>
        <tree
           :treeData="treeData"
          ></tree>
    </div>
</template>

<script>
import testJson from '../../../test.json';
// 同时递归的条件时,这个组件一定要有一个名字，加一个终止条件，与google方法论中的观点一致
export default {
	data() {
		return {
            treeData: [],
        };
	},
	mounted() {
        let ids = testJson.child_ids;
        let record = [];
        this.handleData(ids, testJson, record, 0);
        this.treeData = record;
        console.log(record, "record+++++++++++++++记录");
    },
    methods:{
        handleData(ids, data, record, layout) {
            ids.forEach(id => {
                let obj = data[id];
                obj["expend"] = false;
                obj['select'] = false;
                obj["child"] = [];
                obj["layout"] = layout;
                record.push(obj);
                if (obj.child_ids.length > 0) {
                    this.handleData(obj.child_ids, data, obj.child, layout + 1);               
                } 
            });
        }
    },
	props: {

    },
    components:{
        tree: require('./tree').default,
    }
};
</script>

<style lang="stylus" scoped>
     
    
</style>
