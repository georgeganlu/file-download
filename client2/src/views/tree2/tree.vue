<template>
	<div class="div-overflow">
		<!-- 要形成一个表格 -->
		<table class="table-tree table-bordered">
			<thead>
                <tr>
                    <th class="th-width">ID</th>
                    <th class="width-tree-table">部门</th>
                    <th class="th-width">负责人</th>
                    <th class="th-width">目标</th>
                </tr>				
			</thead>
            
			<tbody>
                <!-- 通过渲不渲染来进行改变 -->
				<tr v-for="item in showData" :key="item.id">
					<td>{{item.id}}</td>
					<td @click="changeShow(item)">
						<div class="td-text-align" :style="paddingOffset(item)">
                            <span v-show="item.icon">
                                <span v-show="item.type == 0">
                                    <span :class="item.iconExpend ? 'el-icon-caret-right' : 'el-icon-caret-bottom'"  ></span>
                                </span>
                                <span v-show="item.type == 1">
                                    <span :class="[item.iconExpend ? 'el-icon-plus' : 'el-icon-minus']"></span>
                                </span>
                            </span>							
							<span class="margin-left-tree">{{item.name}}</span>
						</div>
					</td>

					<td>{{item.leader_name}}</td>
					<td>{{item.target_amount}}</td>
				</tr>

			</tbody>
		</table>
	</div>
</template>

<script>
import { deepCopy } from "./util";
export default {
	name: "Tree",
	data() {
		return {
            showData:[],
        };
	},
	methods: {
        deepCopy,
        paddingOffset(item) {
            let offset = item.layout * 30;
            return {
                paddingLeft: `${offset}px`
            }
        },        
        changeShow(item) {
            // 这里可以把原始数据传进来。 --- 或者通过过滤的方式。 -- 这里有子级才能点击。            
            this.$set(item, "iconExpend", !item.iconExpend);  // 这里只管自己。              
            item.show = !item.show;
            // 在次重新组合数据。
            let list2 = [];
            this.combination(this.oneIdList, this.backData, list2);
            this.showData = list2;     
        },
        combination(ids, backData, list) {
            ids.forEach(id => {                
                let obj = backData[id];
                list.push(obj);
                if (obj.child_ids.length && obj.show) {  // 
                    this.combination(obj.child_ids, backData, list);                
                }
            });
        }
    },
    watch:{
        treeData(val) {
            if (val.length) {
                // this.showData = this.deepCopy(val);   // 这里可以采用深拷贝的方式。               
                this.showData = val;
            }
        }
    },
    computed: {
        backData() {
            if (this.treeData.length) {
                let obj = {};
                this.treeData.forEach(item => {
                    obj[item.id] = item;
                });
                return obj;
            }
        }
    },
	props: {
		treeData: {		
			required: true
        },
        oneIdList:{
            required: true,
        }
    },    
};
</script>

<style lang="stylus" scoped>
.div-overflow{
    max-height 650px;
    overflow auto;
}
.table-tree {
	width: 100%;
	border-spacing: 0;
	border-collapse: collapse;
}
.table-bordered {
  border: 1px solid #ebebeb;
}

.table-bordered > tbody > tr > td,
.table-bordered > tbody > tr > th,
.table-bordered > tfoot > tr > td,
.table-bordered > tfoot > tr > th,
.table-bordered > thead > tr > td,
.table-bordered > thead > tr > th {
  border: 1px solid #e7e7e7;
}
.td-text-align{
    text-align left;
}
.margin-left-tree{
    margin-left 5px;
}
.width-tree-table{
    width 52%;
}
.th-width{
    width 16%;
}
</style>
