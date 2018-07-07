// var gameObj=require('./serverGameMain');
var RoomPlayers = require('./roomPlayers');
var rooms=require('./rooms');
var frontRoomPlayers = {}
const acType = {
	ON_COME : 'ON_COME',
	ON_READY : 'ON_READY',
	ON_START : 'ON_START',
	SHOW_VALUE : 'SHOW_VALUE',
	GAME_PASS : 'GAME_PASS',
	GAME_PK : 'GAME_PK',
	ON_RAISE: 'ON_RAISE',
	ADD_RAISE: 'ADD_RAISE'
}
function main(msg){
	console.log(msg)
	for(let i in rooms){
		if(rooms[i].id == msg.roomId){
			let sendObj = null
			if(msg.acType === acType.ON_COME){
 				for(let p in rooms[i].players){
 					rooms[i].players[p].isEnable = true
 				}
 				frontRoomPlayers.acType = acType.ON_COME
	 			frontRoomPlayers.playerId = msg.playerId
 				sendObj = {acType:acType.ON_COME,roomPlayers:rooms[i],backObj:frontRoomPlayers}
		 	}
			if(msg.acType === acType.ON_READY){
 				for(let p in rooms[i].players){
 					rooms[i].players[p].isEnable = true
 				}
 				rooms[i].onReady(msg)
 				frontRoomPlayers.acType = acType.ON_READY
	 			frontRoomPlayers.playerId = msg.playerId
 				sendObj = {acType:acType.ON_READY,roomPlayers:rooms[i],backObj:frontRoomPlayers}
		 	}
			if(msg.acType === acType.ON_START){
				frontRoomPlayers.acType = acType.ON_START
	 			frontRoomPlayers.playerId = msg.playerId
	 			if(rooms[i].players.length==rooms[i].playIngs.length){
	 				rooms[i].setPokersValue()
	 				sendObj = {acType:acType.ON_START,allow:true,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 			}else{
	 				
	 				sendObj = {acType:acType.ON_START,allow:false,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 			}
		 	}
		 	if(msg.acType === acType.ON_RAISE){
	 			frontRoomPlayers.acType = acType.ON_RAISE
	 			frontRoomPlayers.playerId = msg.playerId
	 			frontRoomPlayers.raiseMoney = rooms[i].raiseMoney
	 			rooms[i].onRaise(msg)
	 			sendObj = {acType:acType.ON_RAISE,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 		}
	 		if(msg.acType === acType.ADDRAISE){
	 			frontRoomPlayers.acType = acType.ADDRAISE
	 			frontRoomPlayers.playerId = msg.playerId
	 			frontRoomPlayers.raiseMoney = msg.raiseMoney
	 			rooms[i].onRaise(msg)
	 			sendObj = {acType:acType.ADDRAISE,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 		}
	 		if(msg.acType === acType.SHOW_VALUE){
	 			rooms[i].showValue(msg.playerId)
	 			frontRoomPlayers.acType = acType.SHOW_VALUE
	 			frontRoomPlayers.playerId = msg.playerId
	 			sendObj = {acType:acType.SHOW_VALUE,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 		}
	 		if(msg.acType === acType.GAME_PK){
	 			frontRoomPlayers.acType = acType.GAME_PK
	 			frontRoomPlayers.playerId = msg.playerId
	 			frontRoomPlayers.raiseMoney = msg.raiseMoney
	 			rooms[i].onPk(msg)
	 			sendObj = {acType:acType.RAISE,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 		}
	 		if(msg.acType === acType.GAME_PASS){
	 			frontRoomPlayers.acType = acType.GAME_PASS
	 			frontRoomPlayers.playerId = msg.playerId
	 			rooms[i].onPass(msg)
	 			sendObj = {acType:acType.GAME_PASS,roomPlayers:rooms[i],backObj:frontRoomPlayers}
	 		}
	 		console.log(rooms[i])
	 		return sendObj
		}
	}
}
module.exports=main