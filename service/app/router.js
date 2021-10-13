'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, jwt } = app;
  router.get('/getId/:id', controller.user.getId)

  router.post('/register', controller.user.register)
  router.post('/login', controller.user.login)

  router.get('/notes/getCatalogs', jwt, controller.notes.getCatalogs)
  router.post('/notes/addCatalog', jwt, controller.notes.addCatalog)
  router.get('/delete/catalogs/:cata_id', jwt, controller.notes.delCatalog)

  router.get('/notes/getNotes', jwt, controller.notes.getNotes)
  router.post('/notes/addNote', jwt, controller.notes.addNote)
  router.get('/delete/notes/:note_id', jwt, controller.notes.delNote)
};
