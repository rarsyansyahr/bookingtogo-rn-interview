import { configureStore } from '@reduxjs/toolkit'
import OrderSlice from "./slices/OrderSlice"

export const store = configureStore({
    reducer: {
        order: OrderSlice
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
