module.exports = (app) => {
  const { router, controller } = app;
  const auth = app.middleware.auth();
  router.get('/admin/test', controller.admin.main.test);
  router.post('/admin/checkLogin', auth, controller.admin.main.checkLogin);
  //router.get('/admin/article/:id', controller.admin.main.getArticleById);
  //router.get('/admin/catalogList', controller.admin.main.getCatalogList);
};
