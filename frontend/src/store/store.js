
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import ReduxThunk from 'redux-thunk'
import { appReducer } from './reducers/app.reducer.js'
import { boardReducer } from './reducers/board.reducer.js';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    appModule: appReducer,
    boardModule: boardReducer,
})

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk))) //Passing the reducer




