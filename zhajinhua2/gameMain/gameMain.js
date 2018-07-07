const peopleNumType = {
	TYPE_ONE : 'TYPE_ONE',
	TYPE_TWO : 'TYPE_TWO',
	TYPE_THREE : 'TYPE_THREE',
	TYPE_FUOR : 'TYPE_FUOR',
	TYPE_FIVE : 'TYPE_FIVE',
	TYPE_SIX : 'TYPE_SIX',
	TYPE_SEVEN : 'TYPE_SEVEN',
	TYPE_EIGHT : 'TYPE_EIGHT'
}
const stepType = {
	ON_READY : 'ON_READY',
	DEAL_STATUS : 'DEAL_STATUS',
	DEAL_PLAYING : 'DEAL_PLAYING',
}
function getGameObjectOne () {
	var ob1 = {
		id:'onewqr',
		posation : {
			x:0,
			y:0,
			z:0
		}
	}
	var ob2 = {
		id : 'onqrge',
		posation : {
			x:0,
			y:0,
			z:0
		}
	}
	return [ob1,ob2]
}
class Multiplayer {
	deal(expression) {
		var gameObject = {}
		switch (expression) {
		  case peopleNumType.TYPE_ONE:
		    gameObject.obj = getGameObjectOne()
		   	break;
		  case value2:
		  	gameObject.obj = getGameObjectTwo()
		    break;
		  case valueN:
		    gameObject.obj = getGameObjectThree()
		    break;
		  default:
		    gameObject.obj = getGameObjectFour()
		    break;
		}
		return gameObject
	}
	
}
//----------get post------------
var foo = {
	stepType:stepType.ON_READY,
	players:[
		{
			id:'onewqr',
			reStatus:true,
			posation : {
				x:0,
				y:0,
				z:0
			},
			value:[12,11]
		},
		{
			id:'onqrge',
			reStatus:false,
			posation : {
				x:0,
				y:0,
				z:0
			},
			value:[12,11]
		}
	]
}
var fooObj = {
	stepType:stepType.DEAL_STATUS,
	players:[
		{
			id:'onewqr',
			dealStatus:true,
			gameStatus:true,
			posation : {
				x:0,
				y:0,
				z:0
			},
			value:[12,11]
		},
		{
			id:'onqrge',
			dealStatus:false,
			gameStatus:false,
			posation : {
				x:0,
				y:0,
				z:0
			},
			value:[12,11]
		}
	]
}
var fooObj2 = {
	stepType:stepType.DEAL_PLAYING,
	players:[
		{
			id:'onewqr',
			isDoing:true,
			gameStatus:true,
			raiseStatus:true,
			raiseMoney:200,
			posation : {
				x:0,
				y:0,
				z:0
			},
			value:[12,11]
		},
		{
			id:'onqrge',
			gameStatus:false,
			isDoing:true,
			posation : {
				x:0,
				y:0,
				z:0
			},
			value:[12,11]
		}
	]
}
function drawPlayGrand(){

}
function drawAcPlayGrand(){

}
var gamePushMsg = {
	pushOnReady:function(){
		return {
			stepType: stepType.ON_READY
		}
	}
	pushOnRaise:function(data){
		return {
			stepType: stepType.DEAL_PLAYING,
			raiseStatus:true,
			raiseMoney: moneyNum
		}
	}
	pushOnGiveUp:function{
		return {
			stepType: stepType.DEAL_PLAYING,
			raiseStatus:false
		}	
	}
 	pullGetPoker(){
		
	}
}
class Zhajinhua{
	constructor(){
		this.id = '4324'
		this.players = null
	}
	init(){

	}
	deal(){

	}
	draw(){
		drawPlayGrand()
		drawAcPlayGrand() 
	}
	receiveMsg(obj){
		var objs = obj.players
		for (let i in objs) {
			if (objs[i].id === this.id){
				this.players = objs.slice(i,objs.length).concat(objs.slice[0,i])
			}
		}
		this.draw()
	}
	sendMsg(type,data){
		var sendObj = {id: this.id}
		switch (type) {
		  case stepType.ON_READY:
		    Object.assign(sendObj,gamePushMsg.pushOnReady())
		   	break;
		  case stepType.DEAL_STATUS:
		  	Object.assign(sendObj,gamePushMsg.pushOnRaise(data))
		    break;
		  case stepType.DEAL_PLAYING:
		 	Object.assign(sendObj,gamePushMsg.pushOnGiveUp())
		    break;
		  default:
		    break;
		}
	}
	destroy(){

	}
}