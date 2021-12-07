module.exports = (app) => {
  const { router, controller } = app;
  router.get('/api/test', controller.default.home.test);
  router.get('/api/articleList', controller.default.home.getArticleList);
  router.get('/api/article/:id', controller.default.home.getArticleById);
  router.get('/api/videoList', controller.default.home.getVideoList);
  router.get('/api/video/:id', controller.default.home.getVideoById);
  router.get('/api/catalogList', controller.default.home.getCatalogList);
};
