/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1638775498542_5043';

  // add your middleware config here
  config.middleware = [];

  config.mysql = {
    // database configuration
    client: {
      // host
      host: 'localhost',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: '123456',
      // database
      database: 'blog'
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false
  };

  config.security = {
    csrf: {
      enable: false
    },
    domainWhiteList: ['*']
  };
  config.cors = {
    origin: 'http://localhost:3000',
    credentials: true,
    allowMethods: 'GET,POST,PUT,DELETE,HEAD'
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig
  };
};
