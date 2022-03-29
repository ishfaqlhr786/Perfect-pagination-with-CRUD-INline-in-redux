import { combineReducers } from "redux";
//import GetProductReducer from "./GetProductReducer";
import ListReducer from "./ListReducer";
//import CreateProductReducer from './CreateProductReducer'
//import DeleteReducer  from './DeleteReducer'
//import PokemonMultipleReducer from "./PokemonMultipleReducer";
const rootReducer = combineReducers({
  List: ListReducer,
//   Product:GetProductReducer,
//   CreateProduct:CreateProductReducer,
//   DeleteProduct:DeleteReducer
  
});
export default rootReducer;
