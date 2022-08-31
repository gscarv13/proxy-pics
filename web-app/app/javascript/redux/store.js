import { configureStore } from '@reduxjs/toolkit'

import requesterReducer from './features/requester'
import orderReducer from './features/order'

export const store = configureStore({
  reducer: {
    requester: requesterReducer,
    order: orderReducer
  },
})
