import { combineReducers } from "redux";
import users from "./users-reducer";
//import repos from "./repositories-reducer";

/* const rootReducer = () =>
  combineReducers({
    users
    //   repos
  }); */

const rootReducer = users;

export default rootReducer;
