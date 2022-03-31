

import "./App.css";
import { Switch, Route, NavLink, Redirect ,Link} from "react-router-dom";
import {List} from "./List";
//import Product from "./containers/Product";
//import {CreateProduct} from './containers/CreateProduct'
//import Post from './containers/Post'
//import Pokemon from "./containers/Pokemon";
function App() {
  return (
    <div className="App">
      <ul style={{display:"flex",listStyleType:"none"}}>
        <li>
          <Link to="list/?limit=10&&offset=0">List</Link>
        </li>
      </ul>
     
      <Switch>
      
        <Route path={"/list"} component={List} />
       
          
        
      
        <Redirect to={"/"} />
      </Switch>
    </div>
  );
}

export default App;



