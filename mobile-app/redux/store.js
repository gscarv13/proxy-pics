import { configureStore } from '@reduxjs/toolkit'

import assigneeReducer from './features/assignee'
import orderReducer from './features/order'

export const store = configureStore({
  reducer: {
    assignee: assigneeReducer,
    order: orderReducer
  },
})
