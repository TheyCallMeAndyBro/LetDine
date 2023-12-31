const ws = require('ws')
const { Group, Order, User } = require('../../models')


module.exports = {
  webSocket: server => {
    const wss = new ws.Server({ server })  // 在express 應用程式上執行 且 執行websocket protocol
    wss.on('connection', function connection(ws) {
      console.log('websocket伺服器連線成功')

      ws.once('message', function initialMessage(data) {
        const msg = JSON.parse(data)
        UserData(msg.userId)
          .then(({ userData, userorder, usergroup }) => {
            ws.user = {
              userId: userData.id,
              userName: userData.name,
              groupId: userorder.map(data => data.groupId), //加入團的id
              leaderGroup: usergroup.map(data => data.id) //leader開的團的id
            }
          })
      })
      ws.on('error', console.error)

      ws.on('message', function message(data) {
        if (ws.user) {
          const msg = JSON.parse(data)

          return getGroupName(msg.groupId)
            .then(groupname => {
              msg.userName = ws.user.userName
              msg.groupName = groupname

              wss.clients.forEach(client => {
                if (msg.groupId === '0') {
                  client.send(JSON.stringify(msg))
                }
                else if (client.user.leaderGroup.includes(Number(msg.groupId)) || client.user.groupId.includes(Number(msg.groupId))) {
                  client.send(JSON.stringify(msg))
                }
              })
            })
        }
      })
    })
  }
}

function UserData(UserId) {
  return Promise.all([
    User.findByPk(UserId, {
      raw: true,
    }),
    Order.findAll({
      where: { userId: UserId },
      raw: true
    }),
    Group.findAll({
      where: { userId: UserId, done: false },
      raw: true
    })
  ])
    .then(([userData, userorder, usergroup]) => {
      userorder = userorder || null
      usergroup = usergroup || null
      return { userData, userorder, usergroup }
    })
}

function getGroupName(groupId) {
  return Group.findByPk(groupId, { raw: true })
    .then(groupname => {
      if (groupname === null) return '所有人'
      return groupname.name
    })
}
