import {configureStore} from '@reduxjs/toolkit';
import {deezerApi} from './services/deezerCore';

import playerReducer from './features/playerSlice';

export const store = configureStore({
  reducer: {
    [deezerApi.reducerPath]: deezerApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(deezerApi.middleware),

});
