'use strict';

const dayjs = require('dayjs');
const Controller = require('egg').Controller;

class MainController extends Controller {
  async test() {
    this.ctx.body = 'hi, egg';
  }
  async checkLogin() {
    const { username, password } = this.ctx.request.body;
    const query = `SELECT userName FROM admin_user WHERE userName='${username}' AND password='${password}';`;
    const res = await this.app.mysql.query(query);
    if (res.length) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { status: 'login success', openId };
    } else {
      this.ctx.body = { status: 'login failure' };
    }
  }
  async addArticle() {
    const article = this.ctx.request.body;
    if (article) {
      const result = await this.app.mysql.insert('article', article);
      const insertSuccess = result.affectedRows === 1;
      const insertId = result.insertId;
      this.ctx.body = {
        succeeded: insertSuccess,
        insertId
      };
    } else {
      this.ctx.body = {
        succeeded: false
      };
    }
  }
  async getArticleById() {
    const { id } = this.ctx.params;
    if (id) {
      const query =
        'SELECT article.id as id, ' +
        'article.title as title, ' +
        'article.introduction as introduction, ' +
        'article.addTime as addTime, ' +
        'article.content as content, ' +
        'catalog.id as catalogId ' +
        'FROM article LEFT JOIN catalog ON article.catalogId = catalog.id ' +
        `WHERE article.id = ${id}`;
      const res = await this.app.mysql.query(query);
      this.ctx.body = { data: res };
    } else {
      this.ctx.body = { error: 'ID is required!' };
    }
  }
  async updateArticleById() {
    const article = this.ctx.request.body;
    if (article) {
      const result = await this.app.mysql.update('article', article);
      const updateSuccess = result.affectedRows === 1;
      this.ctx.body = {
        succeeded: updateSuccess
      };
    } else {
      this.ctx.body = {
        succeeded: false
      };
    }
  }
  async deleteArticleById() {
    const { id } = this.ctx.params;
    if (id) {
      const res = await this.app.mysql.delete('article', { id: id });
      this.ctx.body = res;
    } else {
      this.ctx.body = { error: 'ID is required!' };
    }
  }
  async getArticleList() {
    let query =
      'SELECT article.id as id,' +
      'article.title as title,' +
      'CONCAT(SUBSTRING(article.introduction,1,100), "...") as introduction, ' +
      'article.addTime as time, ' +
      'catalog.name as catalog ' +
      'FROM article LEFT JOIN catalog ON article.catalogId = catalog.Id ' +
      'ORDER BY article.id DESC ';
    const list = await this.app.mysql.query(query);
    list.forEach((cur) => {
      cur.time = dayjs(cur.time).format('YYYY-MM-DD HH:mm:ss');
    });
    this.ctx.body = { list };
  }
}

module.exports = MainController;
