import { createStore, applyMiddleware } from 'redux';
import reducer from "./reducer";
import thunk from 'redux-thunk';
import logger from "redux-logger";

export default function configureStore(initialState) {
  const store = createStore(reducer, initialState, applyMiddleware(/*logger,*/ thunk));
  return store;
}