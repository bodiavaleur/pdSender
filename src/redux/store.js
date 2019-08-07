import { createStore, combineReducers } from "redux";
import pdReducer from "./pdReducer";
import uiReducer from "./ui/uiReducer";

export const store = createStore(combineReducers({ pdReducer, uiReducer }));
