<template>
  <div>
      <div v-for="(item, index) in data" :key='index'>
        <span>{{item.id}}</span>
        <span @click="toggle(item, index)">{{item.name}}</span>
        <span>{{item.type}}</span>
        <span>{{item.leader_name}}</span>
        <span>{{item.target_amount}}</span>
        <span>{{item.status}}</span>
        <span>
          <span>编辑</span>
          <span>添加</span>
        </span>
        <tree-menu v-show="scope[index]"  :data="item.childrenList"></tree-menu>
      </div>
  </div>
</template>

<script>
export default {
  name: 'treeMenu',
  props: {
    data: Array
  },
  data () {
    return {
      folderIconList: [],
      loadingIconList: [],
      scope: {}
    }
  },
  created () {

  },
  methods: {
    toggle (item, index) {
      this.$set(this.scope, index, !this.scope[index])
    }
  }
}
</script>

<style scoped>
.tree-menu {
  list-style: none;
}
.tree-menu li {
  line-height: 2;
}
.tree-menu li span {
  cursor: default;
}
.icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  background-repeat: no-repeat;
  vertical-align: -2px;
}
.icon.folder {
  background-image: url(/src/assets/folder.png);
}
.icon.folder-open {
  background-image: url(/src/assets/folder-open.png);
}
.icon.file-text {
  background-image: url(/src/assets/file-text.png);
}
.icon.loading {
  background-image: url(/src/assets/loading.gif);
  background-size: 15px;
}

</style>
