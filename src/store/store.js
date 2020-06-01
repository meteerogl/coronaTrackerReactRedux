import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducers from './reducers/index';


export default function configureStore() {
    return createStore(
        rootReducers,
        applyMiddleware(thunk)
    );
}