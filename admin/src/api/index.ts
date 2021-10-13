import { Get, Post } from "../utils/request";

interface ILoginParams {
  userName: String;
  password: String
}

interface IGetArticlesParams {
  cata_id: string
}

interface IAddCatalogParams {
  cataName: string
}

interface IAddArticleParams {
  articleName: string;
  catalogId: string;
  content: string;
}

interface IUpdateArticleParams {
  articleName: string;
  content: string;
  articleId: string
}


export const loginApi = (params: ILoginParams) => {
  return Post('/login', params)
}

export const getCatalogsApi = () => {
  return Get('/notes/getCatalogs')
}

export const addCatalogApi = (params: IAddCatalogParams) => {
  return Post('/notes/addCatalog', params)
}

export const deleteCatalogApi = (cataId: string) => {
  return Get(`/delete/catalogs/${cataId}`)
}

export const getArticlesApi = (params: IGetArticlesParams) => {
  return Get('/notes/getNotes', params)
}

export const addArticleApi = (params: IAddArticleParams) => {
  return Post('/notes/addNote', params)
}

export const deleteArticleApi = (articleId: string) => {
  return Get(`/delete/notes/${articleId}`)
}

export const updateArticleApi = (params: IUpdateArticleParams) => {
  return Post('/update/note', params)
}


