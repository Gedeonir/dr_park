import { createStore, combineReducers,applyMiddleware } from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import countReducer from './reducers/countReducer';
import ReduxThunk from 'redux-thunk';
import { getAllParkingsReducer } from './reducers/getAllParkingsReducer';
import { getOneParkingReducer } from './reducers/getOneParkingReducer';
import { getParkingSlotsReducer } from './reducers/getParkingSlotsReducer';

const rootReducer = combineReducers({ 
    count: countReducer,
    getAllParkingsReducer,
    getOneParkingReducer,
    getParkingSlotsReducer 
}
);
const store = createStore(rootReducer,composeWithDevTools(applyMiddleware(ReduxThunk)));
export default store;