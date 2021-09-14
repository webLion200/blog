const Service = require('egg').Service

class NotesService extends Service {
  async addCatalog() {
    const { ctx, app } = this
    const { cateName } = ctx.request.body
    const userId = ctx.state.user.user_id
    app.mysql.insert('category', {
      cate_name: cateName,
      user_id: userId
    })
  }

  async addNote() {
    const { ctx, app } = this
    const { articleName, categoryId, content } = ctx.request.body
    const userId = ctx.state.user.user_id

    app.mysql.insert('article', {
      article_name: articleName,
      category_id: categoryId,
      content,
      user_id: userId
    })
  }

  async getCatalogs() {
    const { ctx, app } = this
    const { userId } = ctx.query
    const results = await app.mysql.get('category', {
      user_id: userId
    })

    return results
  }

  async getNotes() {
    const { ctx, app } = this
    const { categoryId } = ctx.query
    const results = await app.mysql.select('article', {
      where: {category_id: categoryId},
      limit: 10,
    })

    return results
  }
}

module.exports = NotesService