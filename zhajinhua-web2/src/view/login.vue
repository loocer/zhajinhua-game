<template>
  <div class="hello">
    
    <!-- <p>{{ msg }}</p> -->
    <div>
      <form class="bs-example bs-example-form" role="form">
        <div class="row">
          <div class="col-lg-12">
            <div class="input-group input-group-lg">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">
                  Go!
                </button>
              </span>
              <input type="text" v-model="name" class="form-control">
            </div><!-- /input-group -->
            <br>
            <div class="input-group input-group-lg">
              <span class="input-group-btn">
                <button class="btn btn-default" type="button">
                  Go!
                </button>
              </span>
              <input type="text" v-model="password" class="form-control">
            </div><!-- /input-group -->
          </div><!-- /.col-lg-6 --><br>
        </div><!-- /.row -->
      </form>
      <p>
      <button type="button" class="btn btn-primary btn-lg" @click="login">登录</button>
    </p>
    </div>
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'login',
  data () {
    return {
      msg: '哟嗬喂扎金花',
      name: '1',
      password: '1qaz'
    }
  },
  methods: {
    login (flag) {
      let temp = this
      let user = {
        name: temp.name,
        password: temp.password
      }
      axios.post('/api/login', user)
      .then(function (response) {
        console.log(response)
        window.localStorage.userId = response.data.data.user.id
        temp.$router.push('home')
      })
      .catch(function (error) {
        console.log(error)
      })
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
