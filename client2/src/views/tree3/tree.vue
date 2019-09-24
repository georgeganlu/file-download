<template>
    <div>
        <!-- 要形成结点 -->
        <node
           :treeData="treeData"
         ></node>
    </div>
</template>

<script>
export default {
    name: 'Tree',
    data() {
        return {

        }
    },
    props:{
        treeData:{
            required: true,
        }
    },
    components:{
        node: require("./node").default
    }
}
</script>
