var demoData = require('./tools/demoData')
var userControl={};
var rooms=require('../gameMain/rooms');
var RoomPlayers = require('../gameMain/roomPlayers');
var ZhajinhuaPlayer=require('../gameMain/player');
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
var filter = require('./tools/filter')
userControl.getUserInfo=function(app){
  app.get('/create-room',filter.authorize,function(req,res){
    let results = {}
    console.log(req.query.roomNo)
    let roomNo = req.query.roomNo
    let peopleNum = req.query.peopleNum
   	/*--------判断房卡是否有效--------*/
   	// console.log(req)
    var status = false
    for(var n in demoData.rooms){
      if(demoData.rooms[n].id == roomNo){
        status = true
      }
    }
    if(status){
      for(let i in rooms){
        if(rooms[i].id == roomNo){
          status = false
        }
      }
      if(!status){
        results.status = 2
        results.msg = '房间号已被创建！'
        res.status(403),
        res.json(results)
      }
      if(status){
        let roomPlayers = new RoomPlayers({id:roomNo, peopleNum:peopleNum})
        rooms.push(roomPlayers)
        roomPlayers.totalRaiseMoney = roomPlayers.raiseMoney * roomPlayers.peopleNum

        results.status = 1
        //------------------------------------//
        let user = null
        for(var u in  demoData.users){
          if(demoData.users[u].id === req.session.user_id){
            user = demoData.users[u]
          }
        }
        //------------------------------------//
        console.log(req.session.user_id)
        var player = new ZhajinhuaPlayer(user)
        player.isMain = true
        player.state = acType.ON_READY
        roomPlayers.doingObj = player
        roomPlayers.players.push(player)
        roomPlayers.playIngs.push(player)
        roomPlayers.fangzhu = player
        // console.log(roomPlayers)
        results.data = {roomNo:roomNo,peopleNum:peopleNum,userId:req.session.user_id}
        results.msg = '房间创建成功！'
        res.status(200),
        res.json(results)
      }
    }else{
      results.status = 0
      results.msg = '没有这个房间（房号不对）！'
      res.status(200),
      res.json(results)
    }
  })
}
userControl.addPlaytoRoom=function(app){
  app.get('/into-room',filter.authorize,function(req,res){
    let results = {}
    console.log(req.query.roomNo)
    let roomNo = req.query.roomNo
    /*--------判断房卡是否有效--------*/
    // console.log(req)
    let status = false
    // for(var n in demoData.rooms){
    //   if(demoData.rooms[n].id == roomNo){
    //     status = true
    //   }
    // }
    let room = null
    for(let i in rooms){
        if(rooms[i].id == roomNo){
          status = true
          room= rooms[i]
        }
      }
    if(status){
      if(room.players.length < room.peopleNum){
        //-----------------------------------//
        let user = null
        for(var u in  demoData.users){
          if(demoData.users[u].id === req.session.user_id){
            user = demoData.users[u]
          }
        }
        //------------------------------------//
        var player = new ZhajinhuaPlayer(user)
        player.isMain = false
        room.players.push(player)
        results.status = 1
        results.data = {roomNo:roomNo,peopleNum:room.peopleNum}
        results.msg = '欢迎进入！'
        res.status(200),
        res.json(results)
      }else{
        results.status = 0
        results.msg = '进入失败！'
        res.status(200),
        res.json(results)
      }
    }
      
  })
}
userControl.login=function(app){
  app.post('/login',function(req,res){
    let results = {}
    var user = req.body
    var users = demoData.users
    let statusCode = null
    for(var u in users){
      if(users[u].name === user.name){
        if(users[u].password === user.password){
          user.id = users[u].id
          statusCode = 1
        }else{
          statusCode = 0
        }
      }
    }
    if(statusCode ===1){
      req.session.user_id = user.id
      results.status = 1
      results.msg = '创建成功！'
      results.data = {user:user}
      res.status(200)
    }else if(statusCode ===0){
      req.session.user_id = user.id
      res.status(401),
      results.status = 0
      results.msg = '密码错误！'
    }else{
      res.status(401),
      results.status = 2
      results.msg = '无此用户！'
    }
    res.json(results)
  })
}
userControl.getValue=function(app){
  app.post('/get-value',function(req,res){
    let results = {}
    let roomNo = req.query.roomNo
    let userId = req.session.user_id
    let roomPlayers = null
    let value = []
    for(let i in rooms){
      if(rooms[i].id == roomNo){
        roomPlayers = rooms[i]
      }
    }
    for(let t in roomPlayers.players){
      if(userId == roomPlayers.players[t].id){
        value = roomPlayers.players[t].pokerValue
      }
    }
    results.msg = '获取成功！'
    results.data = {value:value}
    res.status(200)
    res.json(results)
  })
}
userControl.allUser=function(app){
  app.post('/all-user',function(req,res){
    var pams = req.body
    console.log(pams)
    let results = {}
    let userArray = []
    for(let i=0;i<10;i++){
      let obj = {}
      obj.name = 'ergouzi' + i
      obj.id = i
      userArray.push(obj)
    }
    results.data = userArray
    res.status(200)
    res.json(results)
  })
}
// userControl.getTset=function(app){
//  app.get('/get-test',function(req,res){
//  	userDao.test().then(function(value){
//       res.status(200),
// 	  res.json(value)
//  	});
//   })
// }
// userControl.register = function (app) {
//   app.get('/add-user',function(req,res){
//   	let user = req.query
//   	userDao.register().then(function(value){
//       res.status(200),
//       res.json(userLang.REGISTSUCCESS)
//   	})
//   	console.log(req.query)
//     // userDao.addUser().then(function(value){
//     //   res.status(200),
//     //   res.json()
//     // })
//   })
// }
module.exports=userControl