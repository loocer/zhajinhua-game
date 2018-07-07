<template>
  <div class="hello">
    <header-layer></header-layer>
    <!-- <p>{{ msg }}</p> -->
    <div class="container">
        <div class="row" >
            <div class="col-sm-6 col-xs-6" >
                
                <button type="button" class="btn btn-default"><router-link to="create-room">创建房间</router-link></button>
            </div>
            <div class="col-sm-6 col-xs-6" >
                
                <button type="button" class="btn btn-default"><router-link to="come-room">加入房间</router-link></button>
            </div>
        </div>
    </div>
    
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'home',
  components: {
    'header-layer': Header
  },
  data () {
    return {
      msg: '哟嗬喂扎金花'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
