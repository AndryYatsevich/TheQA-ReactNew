import {combineReducers} from 'redux';
import common from './common/reducer';
import settings from './components/settings/reducer'

export default combineReducers({
    common,
    settings
});