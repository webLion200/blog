import { createSlice } from '@reduxjs/toolkit'
import { getCatalogsApi, getArticlesApi, addCatalogApi, deleteCatalogApi, addArticleApi, deleteArticleApi } from '../../api'
import { AppThunk } from './store'

const initialState = {
  cataList: [],
  articleList: [],
  currCataInfo: {} as CatalogType
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
    }
  }
})

const initCataList = (): AppThunk => async (dispatch) => {
  const cataRes = await getCatalogsApi()
  const res = cataRes.res as Array<CatalogType> || []
  await dispatch(actions.changeCataList(res))
  const cata_id = res[0]?.['cata_id']
  dispatch(actions.changeCurrCataInfo(res[0]))
  dispatch(effects.fetchArticle(cata_id))
}

const fetchCataList = (): AppThunk => async (dispatch) => {
  const {res} = await getCatalogsApi()
  await dispatch(actions.changeCataList(res))
}

const fetchArticle = (cata_id?: string): AppThunk => async (dispatch, getState) => {
  const state = getState()
  if(!cata_id) return
  const id = cata_id ?? state.notebook.cataList[0]['cata_id']
  await getArticlesApi({
    cata_id: id
  })
}

const addCatalog = (cataName: string): AppThunk => async (dispatch) => {
  await addCatalogApi({cataName})
  setTimeout(() => {
    dispatch(fetchCataList())
  }, 1000);
}

const deleteCatalog = (): AppThunk => async (dispatch, getState) => {
  const state = getState()
  const currCataInfo = state.notebook.currCataInfo
  await deleteCatalogApi(currCataInfo['cata_id'])
  setTimeout(() => {
    dispatch(initCataList())
  }, 1000);
}


export const effects = {
  initCataList,
  fetchCataList,
  fetchArticle,
  addCatalog,
  deleteCatalog
}

export const actions = notebookSlice.actions

export default notebookSlice.reducer