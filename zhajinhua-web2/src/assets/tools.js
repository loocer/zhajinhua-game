export const stateColor={
    OVER : 'OVER',
    ONGOING : "ONGOING",
    NORMAL : "NORMAL",
    NONE: 'NONE'
};
export const acType = {
  ON_COME : 'ON_COME',
  ON_READY : 'ON_READY',
  ON_START : 'ON_START',
  SHOW_VALUE : 'SHOW_VALUE',
  GAME_PASS : 'GAME_PASS',
  GAME_PK : 'GAME_PK',
  ON_RAISE: 'ON_RAISE',
  ADD_RAISE: 'ADD_RAISE'
};
const pwidth=()=>{
   return document.body.clientWidth
}
const pheight=()=>{
   return document.body.clientHeight
}
export const AllPosations = {
    TYPE_TWO:[
      {
          class:'a1',state:stateColor.NONE,nickName:'tom',account:-4,
          statePosition:{x:100,y:0.1,z:10},
          pointPosition:{x1:pwidth()/2,y1:800,z1:0,x2:pwidth()/2,y2:400,z2:0},
          pokerPosition:{x:0,y:200,z:0,rt:-0.2},
          avatarPosition:{x:100,y:0.1,z:-20,rz:-0.5},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a2',state:stateColor.NONE,nickName:'HTYHEYTH',account:23,
          statePosition:{x:10,y:0.1,z:-40},
          pointPosition:{x1:380,y1:500,rt1:-0.6,x2:235,y2:400,rt2:-0.6},
          pokerPosition:{x:70,y:120,rt:-0.6},
          avatarPosition:{x:30,y:0.1,z:-70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        }
    ],
    TYPE_THREE:[
        {
          class:'a1',state:stateColor.NONE,nickName:'tom',account:-4,
          statePosition:{x:100,y:0.1,z:10},
          pointPosition:{x1:250,y1:800,z1:0,x2:235,y2:400,z2:0},
          pokerPosition:{x:0,y:200,z:0,rt:-0.2},
          avatarPosition:{x:100,y:0.1,z:-20,rz:-0.5},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a2',state:stateColor.NONE,nickName:'HTYHEYTH',account:23,
          statePosition:{x:10,y:0.1,z:-40},
          pointPosition:{x1:380,y1:500,rt1:-0.6,x2:235,y2:400,rt2:-0.6},
          pokerPosition:{x:70,y:120,rt:-0.6},
          avatarPosition:{x:30,y:0.1,z:-70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a3',state:stateColor.NONE,nickName:'王二个',account:12,
          statePosition:{x:-20,y:0.1,z:-40,},
          pointPosition:{x1:800,y1:800,z1:0,x2:550,y2:1000,z2:0},
          pokerPosition:{x:70,y:-20,rt:-0.6},
          avatarPosition:{x:-50,y:0.1,z:-70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        }
    ],
    TYPE_FUOR:[
        {
          class:'a1',state:stateColor.NONE,nickName:'tom',account:-4,
          statePosition:{x:100,y:0.1,z:10},
          pointPosition:{x1:500,y1:1600,z1:0,x2:550,y2:1000,z2:0},
          pokerPosition:{x:0,y:200,z:0,rt:-0.2},
          avatarPosition:{x:100,y:0.1,z:-20,rz:-0.5},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a2',state:stateColor.NONE,nickName:'HTYHEYTH',account:23,
          statePosition:{x:10,y:0.1,z:-40},
          pointPosition:{x1:800,y1:1300,rt1:-0.6,x2:550,y2:1000,rt2:-0.6},
          pokerPosition:{x:70,y:120,rt:-0.6},
          avatarPosition:{x:30,y:0.1,z:-70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a3',state:stateColor.NONE,nickName:'王二个',account:12,
          statePosition:{x:-20,y:0.1,z:-40,},
          pointPosition:{x1:800,y1:800,z1:0,x2:550,y2:1000,z2:0},
          pokerPosition:{x:70,y:-20,rt:-0.6},
          avatarPosition:{x:-50,y:0.1,z:-70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a4',state:stateColor.NONE,nickName:'王二个',account:-52,
          statePosition:{x:10,y:0.1,z:40},
          pointPosition:{x1:500,y1:200,z1:0,x2:550,y2:1000,z2:0},
          pokerPosition:{x:0,y:-120,rt:-0.6},
          avatarPosition:{x:30,y:0.1,z:70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        }
    ],
    TYPE_FIVE:[
        {
          class:'a1',state:stateColor.NONE,nickName:'tom',account:-4,
          statePosition:{x:100,y:0.1,z:10},
          pointPosition:{x1:500,y1:1600,z1:0,x2:550,y2:1000,z2:0},
          pokerPosition:{x:0,y:200,z:0,rt:-0.2},
          avatarPosition:{x:100,y:0.1,z:-20,rz:-0.5},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a2',state:stateColor.NONE,nickName:'HTYHEYTH',account:23,
          statePosition:{x:10,y:0.1,z:-40},
          pointPosition:{x1:800,y1:1300,rt1:-0.6,x2:550,y2:1000,rt2:-0.6},
          pokerPosition:{x:70,y:120,rt:-0.6},
          avatarPosition:{x:30,y:0.1,z:-70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a3',state:stateColor.NONE,nickName:'王二个',account:12,
          statePosition:{x:-20,y:0.1,z:-40,},
          pointPosition:{x1:800,y1:800,z1:0,x2:550,y2:1000,z2:0},
          pokerPosition:{x:70,y:-20,rt:-0.6},
          avatarPosition:{x:-50,y:0.1,z:-70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a4',state:stateColor.NONE,nickName:'王二个',account:-52,
          statePosition:{x:10,y:0.1,z:40},
          pointPosition:{x1:500,y1:200,z1:0,x2:550,y2:1000,z2:0},
          pokerPosition:{x:0,y:-120,rt:-0.6},
          avatarPosition:{x:30,y:0.1,z:70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        }
    ],
    TYPE_SIX:[
        {
          class:'a1',state:stateColor.NONE,nickName:'tom',account:-4,
          statePosition:{x:100,y:0.1,z:10},
          pointPosition:{x1:220,y1:800,z1:0,x2:220,y2:430,z2:0},
          pokerPosition:{x:0,y:200,z:0,rt:-0.2},
          avatarPosition:{x:100,y:0.1,z:-20,rz:-0.5},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a2',state:stateColor.NONE,nickName:'HTYHEYTH',account:23,
          statePosition:{x:10,y:0.1,z:-40},
          pointPosition:{x1:400,y1:550,rt1:-0.6,x2:220,y2:430,rt2:-0.6},
          pokerPosition:{x:70,y:120,rt:-0.6},
          avatarPosition:{x:30,y:0.1,z:-70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a3',state:stateColor.NONE,nickName:'王二个',account:12,
          statePosition:{x:-20,y:0.1,z:-40,},
          pointPosition:{x1:400,y1:250,z1:0,x2:220,y2:430,z2:0},
          pokerPosition:{x:70,y:-20,rt:-0.6},
          avatarPosition:{x:-50,y:0.1,z:-70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a4',state:stateColor.NONE,nickName:'王二个',account:-52,
          statePosition:{x:10,y:0.1,z:40},
          pointPosition:{x1:220,y1:0,z1:0,x2:220,y2:430,z2:0},
          pokerPosition:{x:0,y:-120,rt:-0.6},
          avatarPosition:{x:30,y:0.1,z:70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a5',state:stateColor.NONE,nickName:'王二个',account:-24,
          statePosition:{x:-20,y:0.1,z:40},
          pointPosition:{x1:0,y1:250,z1:0,x2:220,y2:430,z2:0},
          pokerPosition:{x:-70,y:-20,rt:-0.6},
          avatarPosition:{x:-50,y:0.1,z:70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        },
        {
          class:'a6',state:stateColor.NONE,nickName:'王二个',account:-52,
          statePosition:{x:10,y:0.1,z:40},
          pointPosition:{x1:0,y1:550,z1:0,x2:220,y2:430,z2:0},
          pokerPosition:{x:-70,y:120,rt:-0.6},
          avatarPosition:{x:30,y:0.1,z:70},
          namePosition:{x:100,y:0.1,z:0},
          acconutPosition:{x:100,y:0.1,z:0}
        }
    ]
};

export const getStateColor = (state) => {
  let color = 'green'
  switch (state) {
      case stateColor.OVER:
        color = '#807f7f'
        break;
      case stateColor.ONGOING:
        color = '#ff0000'
        break;
      case stateColor.NORMAL:
        color = '#00ff0a'
        break;
    }
    return color
}
export const peopleNumType = {
    TYPE_ONE : 'TYPE_ONE',
    TYPE_TWO : 'TYPE_TWO',
    TYPE_THREE : 'TYPE_THREE',
    TYPE_FUOR : 'TYPE_FUOR',
    TYPE_FIVE : 'TYPE_FIVE',
    TYPE_SIX : 'TYPE_SIX',
    TYPE_SEVEN : 'TYPE_SEVEN',
    TYPE_EIGHT : 'TYPE_EIGHT'
};
export const getSessionKey = (key, defaultValue) => {
  const item = window.sessionStorage.getItem(key);
  if (item == undefined && defaultValue != undefined) {
    return defaultValue
  }
  return item;
}

export const getBaseUrl = (url) => {
  var reg = /^((\w+):\/\/([^\/:]*)(?::(\d+))?)(.*)/;
  reg.exec(url);
  return RegExp.$1;
}

export const keyMirror = (obj) => {
  let key
  let mirrored = {}
  if (obj && typeof obj === 'object') {
    for (key in obj) {
      if ({}.hasOwnProperty.call(obj, key)) {
        mirrored[ key ] = key
      }
    }
  }
  return mirrored
}
export const randomString = (len) => {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (let i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
}

