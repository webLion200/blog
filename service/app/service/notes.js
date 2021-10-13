const Service = require('egg').Service

class NotesService extends Service {
  async addCatalog() {
    const { ctx, app } = this
    const { cataName } = ctx.request.body
    const userId = ctx.state.user.user_id
    app.mysql.insert('catalog', {
      cata_name: cataName,
      user_id: userId
    })
  }

  async getCatalogs() {
    const { ctx, app } = this
    const userId = ctx.state.user.user_id
    const results = await app.mysql.select('catalog', {
      where: {user_id: userId}
    })

    return {
      data: results,
      status: 200
    }
  }

  async delCatalog() {
    const { ctx, app } = this
    const { cata_id } = ctx.params
    const userId = ctx.state.user.user_id
    const results = await app.mysql.delete('catalog', {
      cata_id: Number(cata_id),
      user_id: userId
    })

    const {affectedRows} = results
    if(affectedRows >= 1) {
      return {
        data: results, 
        status: 200
      }
    } else {
      return {
        data: '删除失败',
        status: 404
      }
    }
  }

  async addNote() {
    const { ctx, app } = this
    const { articleName, catalogId, content } = ctx.request.body
    const userId = ctx.state.user.user_id

    app.mysql.insert('article', {
      article_name: articleName,
      catalog_id: catalogId,
      content,
      user_id: userId
    })
  }

  async getNotes() {
    const { ctx, app } = this
    const { cata_id } = ctx.query
    const results = await app.mysql.select('article', {
      where: {cata_id},
      limit: 10,
    })

    return {
      data: results,
      status: 200
    }
  }

  async delNote() {
    const { ctx, app } = this
    const { articleId } = ctx.params
    const userId = ctx.state.user.user_id

    const results = await app.mysql.delete('article', {
      article_id: articleId,
      user_id: userId
    })
    const {affectedRows} = results
    if(affectedRows >= 1) {
      return {
        data: results, 
        status: 200
      }
    } else {
      return {
        data: '删除失败',
        status: 404
      }
    }
    
  }

  async updateNote() {
    const { ctx, app } = this
    const { articleName, articleId, content } = ctx.request.body
    const userId = ctx.state.user.user_id

    const row = {
      article_name: articleName,
      content: content
    };
    const options = {
      where: {
        article_id: articleId,
        user_id: userId
      }
    };


    const results = app.mysql.update('article', row, options)
    const {affectedRows} = results
    if(affectedRows >= 1) {
      return {
        data: results, 
        status: 200
      }
    } else {
      return {
        data: '删除失败',
        status: 404
      }
    }
  }
}

module.exports = NotesService