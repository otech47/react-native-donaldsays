import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import environment from './environment';
import routes from './routes';

// export default environment;
export default combineReducers({
    environment,
    routes
});