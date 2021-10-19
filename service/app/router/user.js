module.exports = app => {
  const { router, controller } = app;
  router.get('/getId/:id', controller.user.getId)
  router.post('/register', controller.user.register)
  router.post('/login', controller.user.login)
}