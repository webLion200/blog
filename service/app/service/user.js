const Service = require('egg').Service

class UserService extends Service {

  async register() {
    const { ctx, app } = this
    const {userName, telPhone, password} = ctx.request.body
    if(!userName || !telPhone || !password) {
      return {
        status: 400,
        message: '参数缺失'
      }
    }

    // let sql = `INSERT INTO users(userName, telPhone, password) VALUES(${userName}, ${telPhone}, ${password})`
    const results = await this.app.mysql.insert('users', {
      user_name: userName, 
      tel_phone: telPhone, 
      password
    })
    return {
      data: results,
      status: 200
    }
  }

  async login() {
    const { ctx, app } = this
    const {userName, password} = ctx.request.body
    const results = await app.mysql.get('users', {
      user_name: userName, 
      password
    })
    if(!results) {
      return {
        message: '登录名或密码错误',
        status: 404
      }
    }
    return {
      data: results,
      status: 200
    }
  }
}
module.exports = UserService