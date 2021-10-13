import { combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import notebook from './slice'

const rootReducer = combineReducers({
  notebook
})

export type AppState = ReturnType<typeof rootReducer>
export type AppThunk<T = void> = ThunkAction<Promise<T>, AppState, unknown, Action<string>>
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export default configureStore({
  reducer: rootReducer
})