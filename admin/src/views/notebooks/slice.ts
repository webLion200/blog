import { createSlice } from '@reduxjs/toolkit'
import { getCatalogsApi, getArticlesApi, addCatalogApi, deleteCatalogApi, addArticleApi, deleteArticleApi, updateArticleApi, moveArticleApi } from '../../api'
import { AppThunk } from './store'
import { message } from 'antd';
interface IAddArticleParams {
  articleName: string;
  content: string;
}

const initialState = {
  cataList: [] as CatalogType[],
  articleList: [],
  currCataInfo: {} as CatalogType,
  currArticleInfo: {
    content: ''
  } as ArticleType
}


export const notebookSlice = createSlice({
  name: 'notebook',
  initialState,
  reducers: {
    changeCurrCataInfo(state, action) {
      state.currCataInfo = action.payload
    },
    changeCataList(state, action) {
      state.cataList = action.payload
    },
    changeArticleList(state, action) {
      state.articleList = action.payload
    },
    changeCurrArticleInfo(state, action) {
      state.currArticleInfo = {...state.currArticleInfo, ...action.payload}
    },
  }
})

const initCataList = (): AppThunk => async (dispatch) => {
  const cataRes = await getCatalogsApi()
  const res = cataRes.res as Array<CatalogType> || []
  await dispatch(actions.changeCataList(res))
  const cataId = res[0]?.['cataId']
  await dispatch(actions.changeCurrCataInfo(res[0]))
  await dispatch(effects.fetchArticle(cataId))
}

const fetchCataList = (): AppThunk => async (dispatch) => {
  const {res} = await getCatalogsApi()
  await dispatch(actions.changeCataList(res))
}

const addCatalog = (cataName: string): AppThunk => async (dispatch) => {
  await addCatalogApi({cataName})
  setTimeout(() => {
    dispatch(fetchCataList())
  }, 500);
}

const deleteCatalog = (): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const currCataInfo = state.notebook.currCataInfo
  await deleteCatalogApi(currCataInfo['cataId'])
  setTimeout(() => {
    dispatch(initCataList())
  }, 500);
}

const changeCurrCataInfo = (cataId: string): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const cataList = state.notebook.cataList
  const currCataInfo = state.notebook.currCataInfo
  if(cataId == currCataInfo.cataId) return 
  dispatch(actions.changeCurrCataInfo(cataList.filter(cata => cata.cataId == cataId)))
  dispatch(fetchArticle(cataId))
}

const fetchArticle = (cataId?: string): AppThunk => async (dispatch, getState) => {
  if(!cataId) return
  const articleRes = await getArticlesApi(cataId)
  const res = articleRes.res as Array<ArticleType> || []
  dispatch(actions.changeArticleList(res))
  dispatch(actions.changeCurrArticleInfo(res[0]))
}

const addArticle = ({articleName, content}: IAddArticleParams): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const currCataInfo = state.notebook.currCataInfo
  await addArticleApi({articleName, cataId: currCataInfo['cataId'], content})
  setTimeout(() => {
    dispatch(fetchArticle(currCataInfo['cataId']))
  }, 1000);
}

const deleteArticle = (): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const currCataInfo = state.notebook.currCataInfo
  const currArticleInfo = state.notebook.currArticleInfo
  await deleteArticleApi(currArticleInfo['articleId'])
  setTimeout(() => {
    dispatch(fetchArticle(currCataInfo['cataId']))
  }, 1000);
}

const updateArticle = (): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const currCataInfo = state.notebook.currCataInfo
  const currArticleInfo = state.notebook.currArticleInfo
  await updateArticleApi({articleName: currArticleInfo.articleName, content: currArticleInfo.content, articleId: currArticleInfo.articleId})
  message.success('保存成功!');
  setTimeout(() => {
    dispatch(fetchArticle(currCataInfo['cataId']))
  }, 1000);
}

const moveArticle = (cataId:string): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const currArticleInfo = state.notebook.currArticleInfo
  const currCataInfo = state.notebook.currCataInfo
  
  await moveArticleApi({ cataId, articleId: currArticleInfo.articleId })
  message.success('转移成功!');
  setTimeout(() => {
    dispatch(fetchArticle(currCataInfo['cataId']))
  }, 1000);
}

export const effects = {
  initCataList,
  fetchCataList,
  addCatalog,
  deleteCatalog,
  changeCurrCataInfo,
  fetchArticle,
  addArticle,
  deleteArticle,
  updateArticle,
  moveArticle
}

export const actions = notebookSlice.actions

export default notebookSlice.reducer