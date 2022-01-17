'use strict';

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
}

module.exports = MainController;
