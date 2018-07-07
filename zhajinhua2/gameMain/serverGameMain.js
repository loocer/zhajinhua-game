const stepType = {
	ON_READY : 'ON_READY',
	OK_READY : 'OK_READY',
	DEAL_PLAYING : 'DEAL_PLAYING',
	PK_PLAYERS: 'PK_PLAYERS'
}
const peopleNumType = {
	TYPE_TWO : 'TYPE_TWO',
	TYPE_THREE : 'TYPE_THREE',
	TYPE_FUOR : 'TYPE_FUOR',
	TYPE_FIVE : 'TYPE_FIVE',
	TYPE_SIX : 'TYPE_SIX',
	TYPE_SEVEN : 'TYPE_SEVEN',
	TYPE_EIGHT : 'TYPE_EIGHT'
}
const AllPosations = {
	TYPE_TWO:[{x:0,y:0,z:0},{x:0,y:0,z:0}],
	TYPE_THREE:[{x:0,y:0,z:0},{x:0,y:0,z:0}],
	TYPE_FUOR:[{x:0,y:0,z:0},{x:0,y:0,z:0}],
	TYPE_FIVE:[{x:0,y:0,z:0},{x:0,y:0,z:0}],
	TYPE_SIX:[{x:0,y:0,z:0},{x:0,y:0,z:0}],
	TYPE_SEVEN:[{x:0,y:0,z:0},{x:0,y:0,z:0}],
	TYPE_EIGHT:[{x:0,y:0,z:0},{x:0,y:0,z:0}],
}
class ZhajinhuaPlayer{
	constructor(id){
		this.id = id
		this.posation = {x:0,y:0,z:0}
		this.isAction:true,//it is protagonist
		this.gameStatus:true,//is disabled
		this.raiseStatus:true,//true is going,false is not going
		this.pokerValue:[],
		this.raiseMoney:200,
	}
	setPosation(P){
		this.posation = P
	}
	getPosation(){
		return this.posation
	}
	setPokerValue(val){
		this.pokerValue = val
	}
}
class ZhajinhuaServer{
	constructor(id,peopleNum){
		this.id = id
		this.peopleNum = peopleNum
		this.stepType:stepType.ON_READY
		this.status = true
		this.totalRaiseMoney = 0
		this.fireId: null
		this.players = []
	}
	_getAcPlayer(acObj){
		for(let p in this.player){
			if(this.player[p].id = acObj.id){
				return this.player[p]
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
module.exports=ZhajinhuaServer