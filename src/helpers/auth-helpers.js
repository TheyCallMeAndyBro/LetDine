module.exports = {
  getUser: req => {
    return req.user || null 
},
  ensureAuthenticated: req => { 
    return req.isAuthenticated()  // 用session檢查是否有登入資料 回傳為boolean
  }
}