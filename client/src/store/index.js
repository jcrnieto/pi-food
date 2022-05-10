import { createStore, applyMiddleware } from "redux"; //applyMiddleware basicamente dice que aplique el middleware thunk
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //me permite trabajar con funciones asincronicas
import rootReducer from "../reducer";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
