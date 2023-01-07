import { createStore, combineReducers,applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import countReducer from './redux/reducers/countReducer';
import ReduxThunk from 'redux-thunk';
const rootReducer = combineReducers(
{ count: countReducer }
);
const store = () => {
return createStore(rootReducer,composeWithDevTools(applyMiddleware(ReduxThunk)));
}
export default store;