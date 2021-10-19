const Service = require('egg').Service

class ArticlesService extends Service {
  async addCatalog() {
    const { ctx } = this
    const { cataName } = ctx.request.body
    const Model = ctx.model
    const userId = ctx.state.user.userId
    await Model.Catalogs.findCreateFind({
      where: {
        cataName,
        userId
      }
    })
    // return {
    //   data: results,
    //   status: 200
    // }
  }

  async getCatalogs() {
    const { ctx } = this
    const userId = ctx.state.user.userId
    const Model = ctx.model
    const result =  await Model.Catalogs.findAndCountAll({
      where: {userId}
    })
    return {
      data: result.rows,
      status: 200
    }
  }

  async delCatalog() {
    const { ctx, app } = this
    const Model = ctx.model
    const { cataId } = ctx.params
    const userId = ctx.state.user.userId
    const articles = await Model.Articles.findAndCountAll({
      where: {cataId}
    })
    if(articles.count > 0) {
      this.ctx.throw(404, '该目录下有文章');
    }
    const result = await Model.Catalogs.findOne({
      where: {
        cataId: Number(cataId),
        userId
      }
    })
    
    if(!result) {
      this.ctx.throw(404, '目录不存在');
    }
    return result.destroy()
  }

  async addArticle() {
    const { ctx, app } = this
    const Model = ctx.model
    const { articleName, cataId, content } = ctx.request.body
    const userId = ctx.state.user.userId
    const result = await Model.Articles.create({
      content,
      articleName,
      cataId,
      userId
    })
    return {
      data: result,
      status: 200
    }
  }

  async getArticles() {
    const { ctx, app } = this
    const Model = ctx.model
    const { cataId } = ctx.params
    const result = await Model.Articles.findAndCountAll({
      where: {cataId}
    })

    return {
      data: result.rows,
      status: 200
    }
  }

  async delArticle() {
    const { ctx, app } = this
    const Model = ctx.model
    const { articleId } = ctx.params
    const userId = ctx.state.user.userId

    const result = await Model.Articles.findOne({
      where: {
        articleId,
      userId
      }
    })

    if(!result) {
      this.ctx.throw(404, '文章不存在');
    }
    return result.destroy()    
  }

  async updateArticle() {
    const { ctx, app } = this
    const Model = ctx.model
    const { articleName, articleId, content } = ctx.request.body
    const userId = ctx.state.user.userId

    const result = await Model.Articles.update({
      articleName,
      content
    }, {
      where: {
        articleId,
        userId
      }
    })

    return {
      data: result.rows,
      status: 200
    }

  }
}

module.exports = ArticlesService