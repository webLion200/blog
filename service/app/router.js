'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/test', controller.home.test);
  router.get('/user', controller.user.index);
  router.get('/getId/:id', controller.user.getId)
  router.post('/add', controller.user.add);
  router.get('/getUserInfo', controller.user.getUserInfo)
  router.post('/register', controller.user.register)
  router.post('/login', controller.user.login)
};
