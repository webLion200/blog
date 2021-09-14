'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/', controller.home.index);
  router.get('/test', controller.home.test);
  router.get('/user', controller.user.index);
  router.get('/getId/:id', controller.user.getId)

  router.post('/register', controller.user.register)
  router.post('/login', controller.user.login)

  router.get('/notes/getCatalogs', jwt, controller.notes.getCatalogs)
  router.post('/notes/addCatalog', jwt, controller.notes.addCatalog)
  router.get('/notes/getNotes', jwt, controller.notes.getNotes)
  router.post('/notes/addNote', jwt, controller.notes.addNote)

};
