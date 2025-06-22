import {combineReducers, configureStore} from  "@reduxjs/toolkit";
import authReducer from './authSlice';
 import jobReducer from "./jobSlice";
import jobSlice from "./jobSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import  companyReducer  from "./companySlice";


const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  job: jobSlice,
  jobs: jobReducer,
  // company: companySlice,
  company: companyReducer,
//   application: applicationSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


//import {authSlice} from "./authSlice";
const store = configureStore({

    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },

    }),
//     reducer:{

         
//  auth : authReducer ,
//  job: jobSlice,
//     },
});

export default store;

