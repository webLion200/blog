const Controller = require('egg').Controller

class UserController extends Controller {
  async index() {
    const { ctx } = this
    const { username } = ctx.query
    ctx.body = username
  }

  async getId() {
    const { ctx } = this
    const { id } = ctx.params
    ctx.body = id
  }

  async add() {
    const { ctx } = this
    const { title, content } = ctx.request.body

    ctx.body = {
      title,
      content
    }
  }

  async getUserInfo() {
    const { ctx } = this
    const { title, content } = await ctx.service.user.user()

    ctx.body = {
      title,
      content
    }
  }

  async register() {
    const {ctx, app} = this
    const results = await ctx.service.user.register()
    this.ctx.body = results
  }

  async login() {
    const { ctx } = this

    const results = await ctx.service.user.login()
    this.ctx.body = results
  }
}

module.exports = UserController