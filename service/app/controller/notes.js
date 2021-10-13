'use strict';

const Controller = require('egg').Controller;

class NotesController extends Controller {
  async addCatalog() {
    const { ctx } = this;
    const results = ctx.service.notes.addCatalog()
    ctx.body = results
  }

  async getCatalogs() {
    const { ctx, app } = this;
    const results = await ctx.service.notes.getCatalogs()
    ctx.body = results;
  }

  async delCatalog() {
    const { ctx, app } = this
    const results = await ctx.service.notes.delCatalog()
    ctx.body = results;
  }

  async addNote() {
    const { ctx } = this;
    const results = await ctx.service.notes.addNote()
    ctx.body = results
  }

  async getNotes() {
    const { ctx, app } = this;
    const results = await ctx.service.notes.getNotes()
    ctx.body = results;
  }

  async delNote() {
    const { ctx, app } = this;
    const results = await ctx.service.notes.delNote()
    ctx.body = results
  }

  async updateNote() {
    const { ctx, app } = this;
    const results = await ctx.service.notes.updateNote()
    ctx.body = results
  }
}

module.exports = NotesController;