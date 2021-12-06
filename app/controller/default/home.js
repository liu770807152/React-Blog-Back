'use strict';

const dayjs = require('dayjs');

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
      'article.addTime as time, ' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.typeId = type.id';
    const results = await this.app.mysql.query(sql);
    results.forEach((cur, index) => {
      cur.time = dayjs(cur.time).format('ddd, MMM D, YYYY');
    });
    this.ctx.body = { result: results };
  }
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql =
      'SELECT article.id as id, ' +
      'article.title as title, ' +
      'article.viewCount as viewCount, ' +
      'article.addTime as time, ' +
      'article.articleContent as content, ' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.typeId = type.id ' +
      `WHERE article.id = ${id}`;
    const results = await this.app.mysql.query(sql);
    results.forEach((cur, index) => {
      cur.time = dayjs(cur.time).format('ddd, MMM D, YYYY');
    });
    this.ctx.body = { result: results };
  }
}

module.exports = HomeController;
