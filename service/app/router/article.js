module.exports = app => {
  const { router, controller, jwt } = app;
  
  router.get('/article/getCatalogs', jwt, controller.article.getCatalogs)
  router.post('/article/addCatalog', jwt, controller.article.addCatalog)
  router.get('/delete/catalogs/:cataId', jwt, controller.article.delCatalog)

  router.get('/article/getArticles/:cataId', jwt, controller.article.getArticles)
  router.post('/article/addArticle', jwt, controller.article.addArticle)
  router.get('/delete/article/:articleId', jwt, controller.article.delArticle)
  router.post('/update/article', jwt, controller.article.updateArticle)
}