import {configureStore} from  "@reduxjs/toolkit";
import authReducer from './authSlice';
// import jobReducer from "./jobSlice";
import jobSlice from "./jobSlice";

//import {authSlice} from "./authSlice";
const store = configureStore({
    reducer:{
 auth : authReducer ,
 job: jobSlice,
    },
});

export default store;

