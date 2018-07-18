<template>
  <div>
     <!-- <vue-ckeditor type="classic"  v-model="value1" :editors="editors1"
       :config='config'  @input="changeFun"></vue-ckeditor> -->
       <div>
         这里是用来点击下载的
       </div>
       <hr>
       <div>
         <!-- <a  :href="href" download="load">点击下载</a> -->
         <button @click="download">点击下载</button>
       </div>
       <hr>
       <div>
         <a  href="http://192.168.12.51:3005/asdf.xlsx" download="filename">a标签下载</a>
       </div>
  </div>
</template>
<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      href:'',
      load:''
    }
  },
  methods:{
    download () {
       let url = `http://192.168.12.51:3005/downloadSingle?dir=''&name=asdf`;
       window.location.href=url;
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
