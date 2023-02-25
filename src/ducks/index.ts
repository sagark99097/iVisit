import { combineReducers } from 'redux';
import reducer from './duck';

export default combineReducers({
    store: reducer,
});
