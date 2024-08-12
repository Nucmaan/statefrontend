import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './User/UserSlice.js';
import PropertyListReducer from './PropertyList/PropertySlice.js';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import { persistStore } from 'redux-persist';


const rootReducer = combineReducers({
    user: userReducer,  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reduc
    propertyList: PropertyListReducer,  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  // Add other reducers here if needed.  //
  })

const persitConfig = {
  key: 'root',
  storage,
  version: 1
};

const persistedReducer = persistReducer(persitConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
    
  }),

});

export const persistor = persistStore(store); 