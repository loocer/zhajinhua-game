<template>
  <div class="game-main">
    <div class="main-panel" id="basicTimeline">
      <template v-for="(chip, index) in chips">
        <div class="chip" v-bind:id="chip.id">
          {{chip.value}}
          <!-- <div >
            <div class="square el">gtfeghtrhtr</div>
          </div> -->
        </div>
      </template>
      <template v-for="(index, p) in poker">
        <div class="line" >
          <template v-if="p%players.length !=0">
            <div  class="poker-panel  .el" v-bind:class="'value_' + p "></div>
          </template>
          <template v-if="p%players.length ==0">
            <div v-if="isShow"  v-bind:style="{backgroundImage: 'url(/static/value/' +pokerBg[p/players.length]+ '.jpg)'}" class="poker-panel  .el" v-bind:class="['my-self-' + (p/players.length),'value_' + p ]">
            </div>
            <div v-if="!isShow" class="poker-panel  .el" v-bind:class="['my-self-' + (p/players.length),'value_' + p ]">
            </div>
          </template>
        </div>
      </template>
      <template v-for="(index, p) in players">
        <div class="p-div" v-bind:class="'player-' + (p+1)">
          <span v-if="index.state == 0" class="label label-default genzhu">
            <span class="glyphicon glyphicon-remove-sign"></span>未准备
          </span>
          <span v-if="index.state == 2||index.state == 1" class="label label-primary genzhu">
            <span class="glyphicon glyphicon-upload"></span>已准备
          </span>
          <span v-if="index.state == 3" class="label label-success genzhu">
            <span class="glyphicon glyphicon-plus-sign"></span>看牌
          </span>
          <span v-if="index.state == 4" class="label label-warning genzhu">
            <span class="glyphicon glyphicon-refresh"></span>投注
          </span>
          <span v-if="index.state == 5" class="label label-danger genzhu">
            <span class="glyphicon glyphicon-refresh"></span>加注
          </span>
          <span v-if="index.state == 6" class="label label-default genzhu">
            <span class="glyphicon glyphicon-remove-sign"></span>比牌
          </span>
          <span v-if="index.state == 7" class="label label-default genzhu">
            <span class="glyphicon glyphicon-remove-sign"></span>pass
          </span>
          <a href=""><span>{{index.name}}</span></a>
          <img class="avadar" v-bind:src="index.avadar">
          <a href=""><span class="glyphicon glyphicon-credit-card"></span><span class="account">{{index.account}}</span></a>
        </div>
      </template>
    </div>
    <!-- <div class="buttons-1">
        <span @click="fapai">翻牌</span>
        <span @click="resice(0)">1投注</span>
        <span @click="resice(1)">1投注</span>
        <span @click="resice(2)">1投注</span>
        <span @click="resice(3)">1投注</span>
        <span @click="showValue('gjyu')">任意查看</span>
        <span @click="hideValue('gjyu')">任意影藏</span>
        <span @click="checkValue()">查看</span>
        <span @click="changeState({class:'a3',state:'ONGOING'})">改变状态</span>
        <span @click="compare('gjyu')">对比</span>
        <span @click="compare2('gjyu')">对比</span>
        <span @click="initPuker">初始化牌</span>
        <span></span>
    </div> -->
    <!-- <div class="buttons-2">
        <span @click="fapai('gt')">fapai</span>
        <span @click="hideValue('gt')"></span>
        <span @click="checkValue()">看牌</span>
        <span @click="changeState({class:'gjyu',state:'ONGOING'})">改变状态</span>
        <span @click="pass('gt')">pass</span>
        <span @click="compare2('gjyu')">对比</span>
        <span @click="initPuker">初始化牌</span>
        <span @click="sendSo('地球人你好，我是太阳之子，我叫tom！')">发送一个消息</span>
        <span></span>
    </div>
    <div class="buttons-3">
        <span @click="rtfhgt()">准备</span>
        <span @click="checkValue()">看牌</span>
        <span @click="touzhu()">投注</span>
        <span @click="pk()">PK</span>
    </div> -->
    <div class="btn-group btn-group-sm left-controll">
      <button v-if="!isFangzhu" type="button"  :disabled="state=='ON_COME'?null:'disabled'" class="btn btn-default" @click="toReady()">准备</button>
      <button v-if="isFangzhu" type="button" :disabled="isFangzhu&&mvState==1?null:'disabled'" class="btn btn-default" @click="fapai()">发牌</button>
      <button type="button" class="btn btn-default" :disabled="isDoing&&mvState==3?null:'disabled'" @click="touzhu()">加注</button>
      <button type="button" class="btn btn-default" :disabled="!isShow&&mvState==3?null:'disabled'" @click="checkValue()">看牌</button>
    </div>
    <div class="btn-group btn-group-sm right-controll">
      <button type="button" class="btn btn-default" :disabled="isDoing&&mvState==3?null:'disabled'" @click="touzhu()">投注</button>
      <button type="button" class="btn btn-default" :disabled="isDoing&&mvState==3?null:'disabled'" @click="pk()">pk</button>
      <button type="button" class="btn btn-default" :disabled="mvState==3?null:'disabled'" @click="pass()">pass</button>
    </div>
    <yd-popup v-model="show" position="bottom" height="200px">
      <div class="panel panel-default">
        <div class="panel-heading">
          请选择将要与您比牌的玩家
        </div>
        <div class="panel-body">
            <template v-for="(index, p) in players">
              <button v-if="index.id!=userId" type="button" class="btn btn-info pk-label" @click="pkDo(index.id)"><img class="pk-label-avadar img-circle" v-bind:src="index.avadar">{{index.name}}</button>
            </template>
        </div>
      </div>
    </yd-popup>
  </div>
</template>

<script>
import * as tools from '../assets/tools'
import GameObject from '../assets/gameObject'
import anime from 'animejs'
import * as io from 'socket.io-client'
import axios from 'axios'
export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      players:[
      // {
      //   avadar:'/static/1avatar.jpg',
      //   name: 'gh他忽然天黑',
      //   state: '1',
      //   account: 23
      // },
      // {
      //   avadar:'/static/2avatar.jpg',
      //   name: '道夫',
      //   state: '1',
      //   account: 56436
      // },
      // {
      //   avadar:'/static/3avatar.jpg',
      //   name: '骇人听闻后让他误会',
      //   state: '2',
      //   account: 6543
      // },
      // {
      //   avadar:'/static/4avatar.jpg',
      //   name: '超后让他后让他误会人挺好夫',
      //   state: '3',
      //   account: -5423
      // },
      // {
      //   avadar:'/static/5avatar.jpg',
      //   name: '超合同工大阿道夫',
      //   state: '1',
      //   account: -23
      // },
      // {
      //   avadar:'/static/6avatar.jpg',
      //   name: '后让他源文件',
      //   state: '4',
      //   account: -5623
      // }
      ],
      gamerNum: 4,
      showLooker:[],
      showMesh:[],
      chips:[],
      myselfObj:null,
      show:false,
      poker:[],
      onMove:false,
      isFangzhu:false,
      isMySend:false,
      state:null,
      mvState:null,
      myState:null,
      isDoing:false,
      isShow:false,
      startP:null,
      endP:[
        {x:50,y:200,z:0,rt:-0.2},
        {x:0,y:200,z:0,rt:-0.2},
        {x:-50,y:200,z:0,rt:-0.2}
      ],
      pokerValue:[1,1,1],
      pokerBg:[],
      gsocket:null,
      gameObject: null,
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
    // return {
    //     roomNo:23,
    //     peopleNum:2
    //   }
    },
    userId(){
      return window.localStorage.userId
    }
  },
  methods: {
    receiveSo (msg) {
      let id = this.userId
      let temp = this
      let datas = msg.roomPlayers.players
      let gameObjd = this.gameObject
      let gameAllObj = this.gameObject._allPosations
      let dataArray = []
      
      this.isFangzhu = msg.roomPlayers.fangzhu.id ==id?true:false
      this.isMySend = msg.backObj.playerId == id?true:false
      this.isDoing = msg.roomPlayers.doingObj.id == id?true:false 
      for(let g in gameAllObj){
        dataArray.push(false)
      }
      for(let d in datas){
        dataArray[d] = datas[d]
      }

      if(dataArray[0].id == id){
        this.state = dataArray[0].state
        this.myselfObj = dataArray[0]
        datas = dataArray 
      }else{
        for(let l in dataArray){
          if(dataArray[l].id === id){
            this.myselfObj = dataArray[l]
            this.state = dataArray[l].state
            datas = dataArray.slice(l,dataArray.length).concat(dataArray.slice(0,l))
          }
        }
      }
      this.players =[]
      this.gameObject.players =[]
      for(let n in datas){
        if(datas[n]){
          let setState = this.changeState(datas[n].state)
          this.gameObject.players.push({
            id:datas[n].id,
            avadar:datas[n].user.avatarUrl,
            name: datas[n].user.name,
            state: setState,
            account: datas[n].user.account
          })
        }
      }
      this.poker = []
      this.players = this.gameObject.players
      let acType = tools.acType
      if(msg.acType === acType.ON_READY){
        console.log(444444)
      }

      if(msg.acType === acType.ON_START){
        if(msg.allow){
          axios.post('/api/get-value?roomNo=' + msg.roomPlayers.id).then(function (response) {
            console.log(response)
            temp.gameObject.selfValue = response.data.data.value
            temp.pokerValue = response.data.data.value 
            temp.setPokerBg()
            temp.createPanel()
          }).catch(function (error) {
            console.log(error)
          })
          // rooms[i].setPokersValue()
          // sendObj = {acType:acType.ON_START,allow:true,roomPlayers:rooms[i]}
        }else{
          if(msg.backObj.playerId == id){
             alert('人员还没到齐，不能发牌！')
          }
        }
      }
      if(msg.acType === acType.SHOW_VALUE&&this.isMySend){
        this.isShow =true
        var basicTimeline = anime.timeline();
        let tempsP = this.startP
        let tempeP = this.endP
        for(let i=0 ;i<3;i++){
          basicTimeline.add({
            targets: '.my-self-' + i,
            translateX: [tempsP.pokerPosition.x, tempeP[i].x], // Translate X from 100 to 200
            translateY: [tempsP.pokerPosition.y, tempeP[i].y], // Translate X from 100 to 200
            rotate: [tempeP[i].rt*i+ 'turn','0turn' ], // Rotate from 180deg to 360deg
            // scale: ['*=2', 1], // Scale from 2 times the original value to 1,
            backgroundColor: ['rgb(0,0,0)', '#FFF'], // Will transition the background color from red to white
            duration: 100
          })
        }
      }
      // if(msg.acType === acType.GAME_PK){
      //   frontRoomPlayers.acType = acType.GAME_PK
      //   frontRoomPlayers.playerId = msg.playerId
      //   frontRoomPlayers.raiseMoney = msg.raiseMoney
      //   rooms[i].onRaise(msg)
      //   sendObj = {acType:acType.RAISE,roomPlayers:rooms[i],backObj:frontRoomPlayers}
      // }
      if(msg.acType === acType.ON_RAISE){
        let playerId = msg.backObj.playerId
        let raiseMoney = msg.backObj.raiseMoney
        let elementId = tools.randomString(6)+Date.now()
        let position = null
        for(let g in this.players){
          if(datas[g].id == playerId){
            position = gameAllObj[g].pointPosition
          }
        }
        let obj = {
          value:raiseMoney,
          id: elementId,
          position: position
        }
        this.chips.push(obj)
        
        // anime({
        //   targets: '#'+elementId,
        //   translateX: 250,
        //   rotate: 540
        // });
      }
      // if(msg.acType === acType.GAME_PASS){
      //   frontRoomPlayers.acType = acType.GAME_PASS
      //   frontRoomPlayers.playerId = msg.playerId
      //   rooms[i].onPass(msg)
      //   sendObj = {acType:acType.GAME_PASS,roomPlayers:rooms[i],backObj:frontRoomPlayers}
      // }
    },
    setPokerBg(){
      let values = this.pokerValue
      for(let v in values){
       let fileName = Math.ceil(values[v]/4)
       let picName = values[v]%4==0?4:values[v]%4
       this.pokerBg.push(picName + '/' + fileName)
      }
    },
    changeOnMove(){
      if(this.isDoing&&state!='ON_COME'&&state!='GAME_PASS'&&state=='ON_READY'){

      }
    },
    sendSo (msg) {
      var temp = this
      var roomInfo = this.roomBaseInfo
      this.gsocket.emit(roomInfo.roomNo, msg);
    },
    createPanel(){
      var temp;
      var data = []
      var size = this.gameObject._allPosations.length
      for(let i = 0;i<3;i++){
          data = data.concat(this.gameObject._allPosations)
      }
      this.startP = data[0]
      var basicTimeline = anime.timeline();
      for (let d = 0;d<data.length;d++){
        basicTimeline.add({
              targets: '.value_' + d,
              translateX: [0, data[d].pokerPosition.x], // Translate X from 100 to 200
              translateY: [0, data[d].pokerPosition.y], // Translate X from 100 to 200
              rotate: ['0turn', (data[d].pokerPosition.rt*d) + 'turn'], // Rotate from 180deg to 360deg
              // scale: ['*=2', 1], // Scale from 2 times the original value to 1,
              backgroundColor: ['rgb(255,0,0)', '#FFF'], // Will transition the background color from red to white
              duration: 500
        })
      }
    },
    fapai () {
      var temp = this
      var roomInfo = this.roomBaseInfo
      let tt = {acType: 'ON_START',roomId: roomInfo.roomNo,playerId:temp.userId}
      this.sendSo(tt)
    },
    initPuker(){
      this.gameObject.initPuker()
    },
    
    changeState(state){
      if(state == tools.acType.ON_COME){
          return 0
      }
      if(state == tools.acType.ON_READY){
          return 1
      }
      if(state == tools.acType.ON_START){
          return 2
      }
      if(state == tools.acType.SHOW_VALUE){
          return 3
      }
      if(state == tools.acType.ON_RAISE){
          return 4
      }
      if(state == tools.acType.ADD_RAISE){
          return 5
      }
      if(state == tools.acType.GAME_PK){
          return 6
      }
      if(state == tools.acType.GAME_PASS){
          return 7
      }
    },
    toReady(){
      if(this.myselfObj.state == tools.acType.ON_READY){
        return
      }
      var temp = this
      var roomInfo = this.roomBaseInfo
      let tt = {acType: 'ON_READY',roomId: roomInfo.roomNo,playerId:temp.userId}
      this.sendSo(tt)
    },
    rtfhgt(){
      var temp = this
      var roomInfo = this.roomBaseInfo
      let tt = {acType: 'ON_START',roomId: roomInfo.roomNo,playerId:temp.userId}
      this.sendSo(tt)
    },
    checkValue(){
      if(this.isShow){
        return
      }
      var temp = this
      var roomInfo = this.roomBaseInfo
      let tt = {acType: 'SHOW_VALUE',roomId: roomInfo.roomNo,playerId:temp.userId}
      this.sendSo(tt)
    },
    pk(){
      this.show = true
    },
    pkDo(id){
      this.show =false
      var temp = this
      var roomInfo = this.roomBaseInfo
      let onePlayerId = temp.userId
      let twoPlayerId = id
      let tt = {acType: 'GAME_PK',roomId: roomInfo.roomNo,playerId:temp.userId,onePlayerId:onePlayerId,twoPlayerId:twoPlayerId}
      this.sendSo(tt)
      console.log(id)
    },
    touzhu (i) {
      var temp = this
      var roomInfo = this.roomBaseInfo
      let tt = {acType: 'ON_RAISE',roomId: roomInfo.roomNo,playerId:temp.userId}
      this.sendSo(tt)
    },
    compare(className){
      this.gameObject.compareTemp1(className)
    },
    compare2(className){
      this.gameObject.compareTemp2(className)
    },
    showValue(className){
      this.gameObject.showValue(className)
    },
    hideValue(className){
      this.gameObject.hideValue(className)
    },
    pass(){
      var temp = this
      var roomInfo = this.roomBaseInfo
      let tt = {acType: 'GAME_PASS',roomId: roomInfo.roomNo,playerId:temp.userId}
      this.sendSo(tt)
    },
    initSocket(socketAddress){
      var temp = this
      var roomInfo = this.roomBaseInfo
      this.gsocket = io(socketAddress)
      window.sto = this.gsocket
      this.gsocket.on(roomInfo.roomNo, function(msg){
        temp.receiveSo(msg)
      })

      var parameter = {}
      for(let i in this.peopleNumType){
          if(i == roomInfo.peopleNum - 1){
              parameter.type = this.peopleNumType[i - 1]
              break;
          }
      }
      parameter.roomNo = roomInfo.roomNo
      temp.gameObject = new GameObject(parameter) 
      temp.gameObject.init()
      let ff = {acType: 'ON_COME',roomId: roomInfo.roomNo,playerId:temp.userId}
      this.sendSo(ff)
    }
  },
  watch:{
    players(value){
      console.log(value)
      for(let i in this.players){
        for(let o = 0; o < 3;o++){
          let obj = {value:o*i+i}
          this.poker.push(obj)
        }
      }
    },
    state(val){
      if(val ==tools.acType.ON_COME||val ==tools.acType.ON_READY){
        this.mvState = 1
      }else if(val ==tools.acType.GAME_PASS){
        this.mvState = 2
      }else{
        this.mvState = 3
      }
    },
    chips(values){
      let value = values[values.length - 1]
      function numTools(Min,Max){
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
      }     
      window.setTimeout(() => {
        let gretgr = anime.timeline();
        console.log(value.position.x2)
          gretgr.add({
              targets: '#' + value.id,
              translateX: [value.position.x1, value.position.x2 + numTools(-20,20)], // Translate X from 100 to 200
              translateY: [value.position.y1, value.position.y2 + numTools(-20,20)], // Translate X from 100 to 200
              rotate: ['1turn','1turn' ], // Rotate from 180deg to 360deg
              // scale: ['*=2', 1], // Scale from 2 times the original value to 1,
              backgroundColor: ['rgb(255,0,0)', '#FFF'], // Will transition the background color from red to white
              duration: 2000
          })
      },10)
      
    }
  },
  mounted () {
    axios.get('/api/get-socketAddress').then( (response) => {
      this.initSocket(response.data.data)
    }).catch(function (error) {
      console.log(error)
    })
    
  }
}
</script>
<style scoped>
#app{
  margin-top: 0px; 
}
.poker-panel{
  position: absolute;
  left: calc(50% - 1.5em);
  top: calc(50% - 2em);
  width: 3em;
  height: 4.5em;
  background: url(/static/assets/6.jpg) no-repeat;
  background-size:100% 100%;
}
.buttons-1{
  position: fixed;
  left: 200px;
}
.buttons-2{
  position: fixed;
  top:30px;
  left: 200px;
}
.buttons-3{
  position: fixed;
  top:50px;
  left: 200px;
  color:red;
  font-size: 30px;
}
.game-main{
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: absolute;
  background: url(/static/assets/textures/ground.png) no-repeat;
  background-size:100% 100%;
  top:0;
}
.main-panel{
  position: absolute;
  width: 100%;
  height:100%;
  background: rgba(0, 0, 0, .5);
}
.p-div{
  width: 5em;
  height: 7.5em;
  /*background-color: red;*/
  position: fixed;
  text-align: left;
}
.p-div .avadar{
  width: 4em;
  height: 3em;
}
.p-div a{
  font-size: 0.8em;
  color: white;
  width: 160px;
  display:block;
  overflow: hidden; 
  text-overflow:ellipsis; 
  white-space: nowrap;
}
.p-div a .account{
  margin-left: 20px;
  line-height: 20px;
}
.glyphicon-credit-card{
  line-height: 20px;
}
.player-1{
  left: calc(50% - 1em);
  top: calc(100% - 6em);
}
.p-div .genzhu{
  width: 5em;
  height:2em;
  top:1em;
  right: 10em;
  font-size: 0.5em;
  position: absolute;
}
.player-2 .genzhu{
  left: 0em;
  top:-2em;
  position: absolute;
}
.player-3 .genzhu{
  left: 0px;
  top:-2em;
  position: absolute;
}
.player-5 .genzhu{
  left: 0px;
  top:-2em;
  position: absolute;
}
.player-6 .genzhu{
  left: 0px;
  top:-2em;
  position: absolute;
}
.player-2{
  left: calc(100% - 5em);
  top: calc(70% - 2em);
}
.player-3{
  left: calc(100% - 5em);
  top: calc(45% - 2em);
}
.player-4{
  top: calc(10% + 2em);
  left: calc(50% - 2em);
}
.player-5{
  left: 1em;
  top: calc(45% - 2em);
}
.player-6{
  left: 1em;
  top: calc(70% - 2em);
}
.chip{
  width: 1em;
  height:1em;
  top:-1em;
  left:-1em;
  border-radius: 50px;
  background-color: rgba(52,52,52,0);
  font-size: 2em;
  color: green;
  line-height: 1em;
  position: absolute;
}
.pk-label-avadar{
  width: 2em;
  height:2em;
  margin-right: 1em;
}
.pk-label{
  margin: 1em;
  /*height: 4em;*/
  font-size: 1em;
}
.left-controll{
 position: absolute;
 bottom: 1em;
 left: 1em;
}
.right-controll{
 position: absolute;
 bottom: 1em;
 right:1em;
}
</style>
