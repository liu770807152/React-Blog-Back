'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async test() {
    const { ctx } = this;
    const result = await this.app.mysql.get('article', {});
    console.log(result);
    ctx.body = result;
  }

  async getArticleList() {
    const sql =
      'SELECT article.id as id, ' +
      'article.title as title, ' +
      'article.introduction as introduction, ' +
      'article.viewCount as viewCount, ' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.typeId = type.id';
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }
}

module.exports = HomeController;
