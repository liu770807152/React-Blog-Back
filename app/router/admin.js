module.exports = (app) => {
  const { router, controller } = app;
  const auth = app.middleware.auth();
  router.get('/admin/test', controller.admin.main.test);
  router.post('/admin/checkLogin', auth, controller.admin.main.checkLogin);
  router.post('/admin/addArticle', auth, controller.admin.main.addArticle);
  router.post(
    '/admin/updateArticle',
    auth,
    controller.admin.main.updateArticle
  );
};
