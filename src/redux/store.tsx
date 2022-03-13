import {combineReducers, createStore} from 'redux'
import {reducerAuth} from "./reducers/auth/reducerAuth";
import {reducerUi} from "./reducers/ui/reducerUi";

import {Reducers, StateApp} from "./Types";

const reducersCollection: Reducers = {
    auth: reducerAuth,
    ui: reducerUi
}
export const loadState = () => {
    const serializedState = sessionStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
};

export const saveState = (state: StateApp | undefined | {}) => sessionStorage.setItem('state', JSON.stringify(state));


export const initialStateApp: StateApp = {ui: {logs: [], sidebar: {show: false}}, auth: undefined}

export const reducers = combineReducers(reducersCollection)

const prevState = loadState()
// @ts-ignore
export const store = createStore(reducers, prevState ? prevState : initialStateApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
store.subscribe(() => {
    saveState(store.getState());
});
