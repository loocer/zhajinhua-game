import * as tools from './tools'
import anime from 'animejs'
export default class GameObject{
	constructor(obj){
		this.id = Date.parse( new Date())
		this._gameType = obj.type
		this._allPosations = []
		this.raiseMoney = 200
        this.myselfValue = null
        this.players = []
	}
    setAllPosations(){
        var temp = this
        this._allPosations = tools.AllPosations[temp._gameType]
    }
	init(){
		this.setAllPosations()
	}
}