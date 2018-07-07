<template>
  <div class="header">
    <header>
    <div class="black" @click="back"><span class="glyphicon glyphicon-chevron-left"></span></div>
    <div class="user"><img src="../assets/logo.png"><span>weishao-----</span></div>
    <div class="bid"></div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'header',
  data () {
    return {
      msg: '哟嗬喂扎金花'
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header{
  padding:0 10px;
  position: fixed;
  top:0;
  header{
    width:100%;
    height:50px;
    .black{
      width:50px;
      height:50px;
      float:left;
      img{
        width:50px;
        height:50px;
      }
      span{
        font-size:40px;
      }
    }
    .user{
      margin:0 20px;
      min-width:200px;
      max-width:300px;
      float:left;
      img{
        width:50px;
        height:50px;
        float:left;
      }
      span{
        float:left;
        line-height:50px;
      }
    }
  }
}
</style>
