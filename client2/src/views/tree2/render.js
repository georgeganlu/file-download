import './render.stylus';
export default {
    methods: {
        startHandle(ids, treeData, list, layout = 0) {           
            ids.forEach(id => {
                let obj = treeData[id];
                obj["layout"] = layout;
                list.push(obj);
                if (obj.child_ids.length && obj.show) {   // 这个数据的tr.show要为true，才会加入进去。
                    this.startHandle(obj.child_ids, treeData, list, layout + 1);
                }
            });
        },
        changeShow(tr) {
            this.$set(tr, "show", !tr.show);
        },
        paddingOffset(item) {
            let offset = item.layout * 30;
            return {
                paddingLeft: `${offset}px`
            }
        },
    },
    render(h) {
        console.log(this.treeData);
        let child = [];
        // 就是做一个循环递归去查找数据。
        

        let trNode = (tr) => {
            return (
                <tr key={tr.ikd} >
                    <td>
                       {tr.id}
                    </td>

                    <td onClick={()=>this.changeShow(tr)}>
                        <div class="td-text-align" style={this.paddingOffset(tr)}>
                            <span v-show={tr.child_ids.length >0 }>
                                <span v-show={tr.type === 0}>
                                    <span class={tr.show ? 'el-icon-caret-bottom': 'el-icon-caret-right'}></span>
                                </span>

                                <span v-show={tr.type === 1}>
                                    <span class={ tr.show ? 'el-icon-minus' : 'el-icon-plus'}> </span>
                                </span>
                            </span>							
							<span class="margin-left-tree">{tr.name}</span>
						</div>
                    </td>

                    <td>{tr.leader_name}</td>
					<td>{tr.target_amount}</td>
                </tr>
            );
        }; 

        // 组合出数据之后一级一级向在一个，在组合形成trNode节点之后放入list中去。
        let list = [];
        debugger;
        if (this.treeData.child_ids) {
            this.startHandle(this.treeData.child_ids, this.treeData, list, 0);
            // 形成了新的list数据。
            list.forEach(tr => {
                let vnode = trNode(tr);
                child.push(vnode);
            });         
        } 
        
        return (
            <div class="div-overflow">
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
                       { child }
                    </tbody>
                </table>
            </div>
        )  
    },
    props:{
        treeData:{
            required: true,
        }
    }
}