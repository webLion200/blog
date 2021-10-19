'use strict';

const Controller = require('egg').Controller;

class ArticleController extends Controller {
  async addCatalog() {
    const { ctx } = this;
    const results = ctx.service.articles.addCatalog()
    ctx.body = results
  }

  async getCatalogs() {
    const { ctx, app } = this;
    const results = await ctx.service.articles.getCatalogs()
    ctx.body = results;
  }

  async delCatalog() {
    const { ctx, app } = this
    const results = await ctx.service.articles.delCatalog()
    ctx.body = results;
  }

  async addArticle() {
    const { ctx } = this;
    const results = await ctx.service.articles.addArticle()
    ctx.body = results
  }

  async getArticles() {
    const { ctx, app } = this;
    const results = await ctx.service.articles.getArticles()
    ctx.body = results;
  }

  async delArticle() {
    const { ctx, app } = this;
    const results = await ctx.service.articles.delArticle()
    ctx.body = results
  }

  async updateArticle() {
    const { ctx, app } = this;
    const results = await ctx.service.articles.updateArticle()
    ctx.body = results
  }
}

module.exports = ArticleController;