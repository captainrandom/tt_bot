javascript:(function () {
  const container = document.body
  if (document.getElementById('ttapi')) {
    return container.removeChild(document.getElementById('ttapi'))
  }
  const obj = document.createElement('div')
  obj.id = 'ttapi'
  obj.style.position = 'absolute'
  obj.style.top = '20px'
  obj.style.left = '20px'
  obj.style.width = '500px'
  obj.style.height = '100px'
  obj.style.padding = '10px'
  obj.style.zIndex = 20000
  obj.style.backgroundColor = '#fff'
  obj.style.fontSize = '13px'
  const auth = document.createElement('div')
  auth.innerHTML = "var AUTH = '" + turntable.user.auth + "';"
  const userid = document.createElement('div')
  userid.innerHTML = "var USERID = '" + turntable.user.id + "';"
  for (const i in turntable) {
    if (turntable[i].roomId) {
      var rid = turntable[i].roomId
      break
    }
  }
  const roomid = document.createElement('div')
  roomid.innerHTML = "var ROOMID = '" + rid + "';"
  obj.appendChild(auth)
  obj.appendChild(userid)
  obj.appendChild(roomid)
  container.appendChild(obj)
})()
