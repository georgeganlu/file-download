<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld  :testObj='testObj'  :test2='test2'/>
    <br>
    <el-button @click='handle'>测试test2</el-button>
    <br>
    <hr>
    <input type="file" ref="input">
    <el-button @click="upload">上传</el-button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data() {
    return {
      testObj: 'asdfasdf',
      test2: {
        value: 'test2 - value'
      }
    }
  },
  methods: {
    upload() {
        let file = this.$refs.input.files[0];
        let formData = new FormData();
        formData.append("name", file.name);
        formData.append("file", file);
        let url = "http://172.19.23.127:3000/fileUpload";
        this.axios.post(url, formData, {
            headers:{
                "content-type":"multipart/form-data"
            }
        }).then(res => {
            console.log(res);
        });
    },
    handle () {
      console.log(this.test2)
    }
  }
}
</script>
