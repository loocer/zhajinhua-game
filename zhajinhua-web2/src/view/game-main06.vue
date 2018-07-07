<template>
  <div class="game-main">
    <div id="Stats-output">
    </div>
    <div id="buttons">
        <span >翻牌</span>
        <span></span>
        <span></span>
        <span></span>
    </div>
    <!-- Div which will hold the Output -->
    <div id="WebGL-output">
    </div>
  </div>
</template>

<script>
// import * as THREE from "three";
import * as datas from '../assets/tools'
import * as tObject from '../assets/gameObject'
import * as io from 'socket.io-client'
// import * as TWEEN from "tween";
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      gamerNum: 4,
      showLooker:[],
      showMesh:[],
      gsocket:null,
      gameObj: null,
      peopleNumType:[
        'TYPE_TWO',
        'TYPE_THREE',
        'TYPE_FUOR',
        'TYPE_FIVE',
        'TYPE_SIX',
        'TYPE_SEVEN',
        'TYPE_EIGHT'
      ]
    }
  },
  computed: {
    roomBaseInfo() {
      return this.$store.state.roomBaseInfo
    }
  },
  methods: {
    receiveSo (msg) {
        console.log(msg)
    },
    sendSo (msg) {
        var temp = this
        var roomInfo = this.roomBaseInfo
        this.gsocket.emit(roomInfo.roomNo, {msg: msg});
    }
  },
  mounted () {
    var temp = this
    var roomInfo = this.roomBaseInfo
    this.gsocket = io('http://localhost:3000')
    this.gsocket.on(roomInfo.roomNo, function(msg){
      temp.receiveSo(msg)
    })

    var parameter = {}
    for(let i in this.peopleNumType){
        if(i === roomInfo.peopleNum - 1){
            parameter.type = this.peopleNumType[i]
            break;
        }
    }
    parameter.roomNo = roomInfo.roomNo
    parameter.type = 'TYPE_FUOR'
    parameter.renderElement = document.getElementById("WebGL-output")
    console.log(tObject)
    console.log(tObject.foot)
    var df= tObject.foot
    temp.gameObj = new df(parameter) 
    temp.gameObj.init()
  }
}
</script>
<style scoped>
body {
  margin: 0;
  overflow: hidden;
}
#buttons{
  position: fixed;
  left: 200px;
}
.game-main{
    position: absolute;
    top:0;
}
</style>
