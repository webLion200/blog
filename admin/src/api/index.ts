import { Get, Post } from "../utils/request";

interface ILoginParams {
  userName: String;
  password: String
}

interface IGetArticlesParams {
  cataId: string
}

interface IAddCatalogParams {
  cataName: string
}

interface IAddArticleParams {
  articleName: string;
  cataId: string;
  content: string;
}

interface IUpdateArticleParams {
  articleName: string;
  content: string;
  articleId: string
}

interface IMoveArticleParams {
  cataId: string;
  articleId: string
}


export const loginApi = (params: ILoginParams) => {
  return Post('/login', params)
}

export const getCatalogsApi = () => {
  return Get('/article/getCatalogs')
}

export const addCatalogApi = (params: IAddCatalogParams) => {
  return Post('/article/addCatalog', params)
}

export const deleteCatalogApi = (cataId: string) => {
  return Get(`/delete/catalogs/${cataId}`)
}

export const getArticlesApi = (cataId: string) => {
  return Get(`/article/getArticles/${cataId}`)
}

export const addArticleApi = (params: IAddArticleParams) => {
  return Post('/article/addArticle', params)
}

export const deleteArticleApi = (articleId: string) => {
  return Get(`/delete/article/${articleId}`)
}

export const updateArticleApi = (params: IUpdateArticleParams) => {
  return Post('/update/article', params)
}

export const moveArticleApi = (params: IMoveArticleParams) => {
  return Post('/move/article', params)
}
