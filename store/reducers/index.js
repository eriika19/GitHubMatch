import { combineReducers } from "redux";
import usersReducer from "./users-reducer";
import usersListReducer from "./users-list-reducer";
import reposReducer from "./repositories-reducer";
import reposListReducer from "./repositories-list-reducer";

export default combineReducers({
  usersReducer,
  usersListReducer,
  reposReducer,
  reposListReducer
});
