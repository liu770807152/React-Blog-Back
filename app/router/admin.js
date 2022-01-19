module.exports = (app) => {
  const { router, controller } = app;
  const auth = app.middleware.auth();
  router.get('/admin/test', controller.admin.main.test);
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  router.post('/admin/article', auth, controller.admin.main.addArticle);
  router.get('/admin/article/:id', auth, controller.admin.main.getArticleById);
  router.post(
    '/admin/article/:id',
    auth,
    controller.admin.main.updateArticleById
  );
  router.delete(
    '/admin/article/:id',
    auth,
    controller.admin.main.deleteArticleById
  );
  router.get('/admin/articleList', auth, controller.admin.main.getArticleList);
};
