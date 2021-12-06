module.exports = (app) => {
  const { router, controller } = app;
  router.get('/default/test', controller.default.home.test);
  router.get('/default/articleList', controller.default.home.getArticleList);
};
