var ZhajinhuaPlayer=require('./player');

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
class roomPlayers{
	constructor({id,peopleNum}){
		this.id = id
		this.peopleNum = peopleNum
		this.stepType = acType.ON_COME
		this.status = true
		this.raiseMoney = 1
		this.totalRaiseMoney = 0
		this.fangzhu = null
		this.fireId = null
		this.doingObj = {name:3}
		this.sendObj = null
		this.playIngs = []
		this.players = []
		this.pkObj = {}
	}
	receiveMsg(msgObj){
 		if(msgObj.acType === acType.ON_START){
 			if(this.peopleNum===this.players.length){
 				this.sendObj = {acType:acType.ON_START,allow:true}
 			}else{
 				this.sendObj = {acType:acType.ON_START,allow:false}
 			}
 		}
 		if(msgObj.acType === acType.SHOW_VALUE){
 			this.sendObj = {acType:acType.SHOW_VALUE}
 		}
 		if(msgObj.acType === acType.GAME_PASS){
 			this.sendObj = {acType:acType.GAME_PASS}
 		}
 		if(msgObj.acType === acType.RAISE){
 			this.sendObj = {acType:acType.RAISE,amount:msgObj.amount}
 		}
 		if(msgObj.acType === acType.RAISE){
 			this.sendObj = {acType:acType.RAISE,amount:msgObj.amount}
 		}
	}

	setPokersValue(){
		this.doingObj = this.players[0]
		function getRandomArrayElements(arr, count) {
		    var shuffled = arr.slice(0), i = arr.length, min = i - count, temp, index;
		    while (i-- > min) {
		        index = Math.floor((i + 1) * Math.random());
		        temp = shuffled[index];
		        shuffled[index] = shuffled[i];
		        shuffled[i] = temp;
		    }
		    return shuffled.slice(min);
		}
		var items = [];
		for(let num = 1;num<53;num++){
			items.push(num)
		}
		for(let p in this.players){
			this.players[p].state = acType.ON_START
			this.players[p].pokerValue = getRandomArrayElements(items, 3)
		}

	}
	showValue(playerId){
		for(let p in this.players){
			if(this.players[p].id ==playerId){
				this.players[p].isShow = true
				this.players[p].state = acType.SHOW_VALUE
			}
		}
	}
	onReady(msgObj){
		for(let p in this.players){
			if(this.players[p].id ==msgObj.playerId){
				this.players[p].isShow = true
				this.players[p].state = acType.ON_READY
				this.playIngs.push(this.players[p])
			}
		}
	}
	onRaise(msgObj){
		this._getNextDoingObj(msgObj)
		for(let p = 0;p< this.players.length; p++){
			console.log(this.players[p].id + '-----------' + msgObj.playerId)
			if(this.players[p].id ==msgObj.playerId){
				this.players[p].state = acType.ON_RAISE
				this.players[p].raiseMoney = this.raiseMoney
				this.players[p].raiseTotalMoney += this.raiseMoney
				this.totalRaiseMoney += this.raiseMoney
				if(p == this.players.length-1){
					// this.doingObj = 
				}
			}
		}
	}
	addRaise(msgObj){
		this._getNextDoingObj(msgObj)
		for(let p in this.players){
			if(this.players[p].id ==msgObj.playerId){
				this.players[p].state = acType.ADD_RAISE
				this.raiseMoney = msgObj.raiseMoney
				this.players[p].raiseMoney = msgObj.raiseMoney
				this.totalRaiseMoney += msgObj.raiseMoney
			}
		}
	}
	// onRaise(msgObj){
	// 	for(let p in this.players){
	// 		if(this.players[p].id ==msgObj.playId){
	// 			this.players[p].status = playerStatus.RAISE
	// 			this.raiseMoney = msgObj.raiseMoney
	// 			this.players[p].raiseMoney = msgObj.raiseMoney
	// 			this.totalRaiseMoney += msgObj.raiseMoney
	// 		}
	// 	}
	// }
	onPass(msgObj){
		for(let p in this.players){
			if(this.players[p].id ==msgObj.playerId){
				this.players[p].state = acType.GAME_PASS
			}
		}
	}
	onPk(msgObj){
		let oPlayer = this._getPlayerById(msgObj.onePlayerId)
		let tPlayer = this._getPlayerById(msgObj.twoPlayerId)
		console.log(444444444445555555555)
		console.log(oPlayer)
		console.log(tPlayer)
		let o={},t={}
		o.player = oPlayer
		t.player = tPlayer
		o.ValueType = this._getPokerValueType(oPlayer.pokerValue)
		t.ValueType = this._getPokerValueType(tPlayer.pokerValue)
		if(o.ValueType>t.ValueType){
			this._setPkObj(o.player,t.player)
		}else if(o.ValueType<t.ValueType){
			this._setPkObj(t.player,o.player)
		}else{
			this._setPkObj(t.player,o.player)
		}
		this._getNextDoingObj(msgObj)
	}
	_setPkObj(o,p){
		this.pkObj.winObj = o
		this.pkObj.pasObj = p
		p.state = acType.GAME_PASS
	}
	_getPokerValueType(valueArray){
		let numArray = [Math.ceil(valueArray[0]/4),Math.ceil(valueArray[1]/4),Math.ceil(valueArray[2]/4)]
		let totalValue = numArray[0] + numArray[1] + numArray[2]
		if(numArray[0]===numArray[1]&&numArray[1]===numArray[2]){
			return 1
		}
		if(valueArray[0]%4 ==valueArray[1]%4&&valueArray[1]%4 ==valueArray[2]%4){
			if(Math.abs(numArray[0]- Math.ceil(numArray/3))<3&&Math.abs(numArray[0]- numArray[1])<3){
				return 2
			}else{
				return 3
			}
		}
		if(Math.abs(numArray[0]- Math.ceil(totalValue/3))<3&&Math.abs(numArray[0]- numArray[1])<3){
			return 4
		}
		if(Math.ceil(valueArray[0]/4) ==Math.ceil(valueArray[1]/4)||Math.ceil(valueArray[0]/4) ==Math.ceil(valueArray[2]/4)||
			Math.ceil(valueArray[1]/4) ==Math.ceil(valueArray[2]/4)){
			return 5
		}else{
			return 6
		}
	}
	_getNextDoingObj(msgObj){
		for(let p in this.playIngs){
			if(this.playIngs[p].id ==msgObj.playerId){
				console.log(this.playIngs.length - 1)
			console.log(p)
			console.log(this.playIngs.length - 1==p)
			console.log(this.playIngs[0])
				if(this.playIngs.length - 1 == p){
					this.doingObj = this.playIngs[0]
				}else{
					console.log('-----------------')
					console.log(p+1)
					console.log(this.playIngs)
					console.log(this.playIngs[p+1])
					this.doingObj = this.playIngs[~~p+1]
				}
			}
		}
	}
	_getPlayerById(id){
		for(let p in this.players){
			if(this.players[p].id == id){
				return this.players[p]
			}
		}
	}
	_pkPlayers(o1,o2){

	}
	_checkStatus(){
		var count = 0
		for(let p in this.player){
			if(this.player[p].gameStatus = true){
				count++
			}
		}
		this.status = count > 1 ? true:false
	}
	addPlayer(id){
		var player = new ZhajinhuaPlayer(id)
		this.players.push(player)
	}
	initPlayerDate(){
		function setDatas(posations){
			for(let p in posations){
				this.player[p].setPosation(posations.p)
			}
		}
		switch (this.players.length) {
		  case 2:
		    setDatas(AllPosations.TYPE_TWO)
		   	break;
		  case 3:
		  	setDatas(AllPosations.TYPE_THREE)
		    break;
		  case 4:
		    setDatas(AllPosations.TYPE_FUOR)
		    break;
		  case 5:
		  	setDatas(AllPosations.TYPE_FIVE)
		    break;
		  case 6:
		  	setDatas(AllPosations.TYPE_SIX)
		    break;
		  case 7:
		    setDatas(AllPosations.TYPE_SEVEN)
		    break;
		  case 8:
		    setDatas(AllPosations.TYPE_EIGHT)
		    break;
		}
	}
	getDeal(){
		var values = getValues()
		for(let p in this.player){
			for(let v in values){
				this.player[p].setPokerValue(values[v])
			}
		}
	}
	playAnction(acObj){
		this.stepType = acObj.stepTypeValue
		this.fireId = acObj.fireId
		if(acObj.stepTypeValue === stepType.ON_READY){
			this.addPlayer(acObj.id)
		}
		if(acObj.stepTypeValue === stepType.OK_READY){
			this.initPlayerDate()
			this.getDeal()
		}
		if(acObj.stepTypeValue === stepType.DEAL_PLAYING){
			var acPlayer = this._getAcPlayer(acObj)
			acPlayer.raiseStatus = acObj.raiseStatus
			acPlayer.raiseMoney = acObj.raiseMoney
			acObj.raiseStatus && (this.totalRaiseMoney+= acObj.raiseMoney)
		}
		if(acObj.stepTypeValue === stepType.PK_PLAYERS){
			acObj.raiseStatus && (this.totalRaiseMoney+= acObj.raiseMoney)
			this._pkPlayers(acObj.o1,acObj.o2)
			this._checkStatus()
		}
	}
}
module.exports=roomPlayers