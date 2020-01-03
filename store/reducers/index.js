import { combineReducers } from "redux";
import usersReducer from "./users-reducer";
import reposReducer from "./repositories-reducer";

export default combineReducers({
  usersReducer,
  reposReducer
});

//const rootReducer = repos;

//export default rootReducer;
