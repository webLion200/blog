const Service = require('egg').Service

class UserService extends Service {
  async user() {
    return {
      title: '111',
      content: 's撒的撒大苏打'
    }
  }
}
module.exports = UserService