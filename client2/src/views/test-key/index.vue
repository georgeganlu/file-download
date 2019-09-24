<template>
    <div>
        <el-button @click="changeSwitch">点击切换</el-button>
        <hr>
        <div v-if="show">
            <input  class="test-input"  v-model="test1">
        </div>

        <div v-else>
            <input  class="test-input" v-model="test2">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            test1:'',
            test2:'',
            show: true,
        }
    },
    methods:{
        changeSwitch() {
            this.show = !this.show;
        }
    }
}
</script>

<style lang="stylus">

</style>