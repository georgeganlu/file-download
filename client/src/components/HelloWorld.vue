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
         <a  href="http://172.19.23.127:3009/track_17.xls" download="filename">a标签下载</a>
       </div>
       <br>
       <div>
         <span>通过xhr请求下载文件</span>
         <button @click="downloadFile">xhr进行文件下载</button>
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
       let url = `http://172.19.23.127:3009/downloadSingle?dir=''&name=track_17`;
       window.location.href=url;
    },
    downloadFile() { 
      // 请求和响应头分别分开，这里设置返回的数据类型。responseType在axios API中。
      this.$http.get('/download', {responseType: 'blob'}).then(res => {
        var a = document.createElement('a');
        let url = URL.createObjectURL(res.data);
        a.href = url;
        a.download = 'track17.xls';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);   
      });
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
