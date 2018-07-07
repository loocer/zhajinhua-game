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
class player{
	constructor(user){
		this.id = user.id
		this.user = user
		this.isMain = false
		this.isEnable = false
		this.state = acType.ON_COME
		this.posation = {x:0,y:0,z:0}
		this.isAction = true,//it is protagonist
		this.gameStatus = true,//is disabled
		this.raiseStatus = true,//true is going,false is not going
		this.pokerValue = [],
		this.raiseMoney = 200,
		this.raiseTotalMoney = 200
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
module.exports=player