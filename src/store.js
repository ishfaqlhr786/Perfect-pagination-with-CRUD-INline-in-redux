import { createStore } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Reducers/rootReducer";

const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;
