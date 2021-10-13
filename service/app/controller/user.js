const Controller = require('egg').Controller

class UserController extends Controller {

  async getId() {
    const { ctx } = this
    const { id } = ctx.params
    ctx.body = id
  }

  async register() {
    const {ctx, app} = this
    const results = await ctx.service.user.register()
    this.ctx.body = results
  }

  async login() {
    const { ctx, app } = this
    const { jwt, config } = app

    const results = await ctx.service.user.login()

    const token = jwt.sign({ user_id: results.data.user_id }, config.jwt.secret);

    this.ctx.body = {
      data: token,
      status: 200
    }
  }
}

module.exports = UserController